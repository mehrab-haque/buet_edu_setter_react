import React,{useState,createRef,useRef,useCallback,useEffect,forwardRef, useImperativeHandle} from 'react'
import update from 'immutability-helper';
import { Card } from './rearranging/Card';
const style = {
    width: 400,
};



const Rearranging=forwardRef((props,ref1)=>{




    const [data,setData]=useState(props.data)



    //console.log(props.data)


    useImperativeHandle(ref1, () => ({

        getData(){
            return {
                items:cards.map(card => card.text)
            }

        },
        isValid(){
            return true
        }

    }));

    var cardsTmp=[]
    props.data.items.map((string,index)=>{
        cardsTmp.push({
            id:index+1,
            text:string
        })
    })


    const [cards, setCards] = useState(cardsTmp);


    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards]);
    const renderCard = (card, index) => {
        return (<Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>);
    };
    return (<>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
    </>);



})

export default Rearranging


