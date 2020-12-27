import React,{useState,createRef,useRef,useCallback,useEffect,forwardRef, useImperativeHandle} from 'react'
import { NativeTypes } from 'react-dnd-html5-backend';
import { Dustbin } from './grouping/Dustbin';
import { Box } from './grouping/Box';
import update from 'immutability-helper';



const Grouping=forwardRef((props,ref1)=>{




    var dropSetTmp=[]
    const [data,setData]=useState(props.data)

    const ref=useRef()

    if('schema' in props.data){
        dropSetTmp=props.data.schema
    }



    //console.log(props.data)


    useImperativeHandle(ref1, () => ({

        getData(){
            return {
                containers:props.data.containers,
                items:props.data.items,
                schema:dropSet,
                dropped:droppedBoxNames
            }

        },
        isValid(){
            return true
        }

    }));

    var tmpDustbins=[],tmpBoxes=[]
    props.data.containers.map(container=>{
        tmpDustbins.push({
            name:container,
            accepts:props.data.items,
            items:[]
        })
        if(!('schema' in props.data))dropSetTmp.push([])
    })
    props.data.items.map(item=>{
        tmpBoxes.push({
            name:item,
            type:item
        })
    })


    const [dustbins, setDustbins] = useState(tmpDustbins);
    const [boxes] = useState(tmpBoxes);
    const[dropSet,setDropSet]=useState(dropSetTmp)
    const [droppedBoxNames, setDroppedBoxNames] = useState('dropped' in props.data?props.data.dropped:[]);
    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }
    const handleDrop = useCallback((index, item) => {
        const { name } = item;
        setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
        if(name){
            var tmp=dropSet
            tmp[index].push(name)
            setDropSet(tmp)
            //dropSetTmp[index].push(name)
        }
        setDustbins(update(dustbins, {
            [index]: {
                items: {
                    $set: dropSetTmp[index],
                },
            },
        }));
    }, [droppedBoxNames, dustbins]);
    return (
        <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
            {dustbins.map(({ accepts, items,name }, index) => (<Dustbin accept={accepts} name={name} items={dropSet[index]} onDrop={(item) => handleDrop(index, item)} key={index}/>))}
        </div>

        <div style={{ overflow: 'hidden', clear: 'both' }}>
            {boxes.map(({ name, type }, index) => (<Box name={name} type={type} isDropped={isDropped(name)} key={index}/>))}
        </div>
    </div>
    );
})

export default Grouping


