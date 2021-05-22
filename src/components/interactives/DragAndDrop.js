import React,{useState,createRef,useRef,useEffect,forwardRef, useImperativeHandle} from 'react'
import { Stage, Layer, Rect, Transformer ,Image} from 'react-konva'
import useImage from 'use-image';
import './dragAndDrop.css'

const zoomRatio=1.08

class URLImage extends React.Component {
    state = {
        image: null
    };
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });

        if(!this.props.locked)

        this.imageNode.to({
            scaleX: 1,
            scaleY: 1,
            duration: 1,
            borderSize: 5,
            rotation:this.props.rotation,
            strokeWidth:0,
            x:this.props.x,
            y:this.props.y,
            borderColor: 'red',
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };

    dragStart = () => {
        // to() is a method of `Konva.Node` instances
        if(!this.props.locked)
        this.imageNode.to({
            scaleX: zoomRatio,
            scaleY: zoomRatio,
            duration: 0.2,
            strokeWidth:4, // border width
            stroke:"lime" // border color
        });
    };

    dragEnd = () => {
        // to() is a method of `Konva.Node` instances
        this.imageNode.to({
            scaleX: 1,
            scaleY: 1,
            duration: 0.2,
            borderSize: 5,
            strokeWidth:0,
            borderColor: 'red',
        });

        this.props.updateX(this.props.ind,this.imageNode.x())
        this.props.updateY(this.props.ind,this.imageNode.y())
    };

    render() {
        if(this.props.locked){
            return (
                <Image
                    draggable
                    x={this.props.x}
                    y={this.props.y}
                    image={this.state.image}
                    width={this.props.width}
                    height={this.props.height}
                    ref={node => {
                        this.imageNode = node;
                    }}
                    rotation={this.props.rotation}
                    onDragEnd={this.dragEnd}
                    onDragStart={this.dragStart}
                />
            );
        }else{
            return (
                <Image
                    x={0}
                    y={0}
                    draggable
                    image={this.state.image}
                    width={this.props.width}
                    height={this.props.height}
                    ref={node => {
                        this.imageNode = node;
                    }}
                    scaleX={1.2}
                    scaleY= {1.2}
                    strokeWidth={4} // border width
                    stroke="lime" // border color
                    rotation={0}
                    onDragEnd={this.dragEnd}
                    onDragStart={this.dragStart}
                />
            );
        }

    }
}

const DragAndDrop=forwardRef((props,ref1)=>{

    console.log(props.data)

    const [data,setData]=useState(props.data)

    const parentRef=useRef()

    const [width,setWidth]=useState(500)

    const ref=useRef()

    //console.log(props.data)

    useEffect(()=>{
        console.log('hi')
        updateWidth()
        window.addEventListener("resize", updateWidth);
    },[])

    useEffect(()=>{
        console.log('draganddrop')
        console.log(props.data)
    },[props.data])

    const updateWidth=()=>{
        if(parentRef.current && parentRef.current.offsetWidth)setWidth(parentRef.current.offsetWidth)
    }

    const updateX=(ind,x)=>{
        var arr=data;
        arr[ind][5]=x*100/width;
    }

    const updateY=(ind,y)=>{
        var arr=data;
        arr[ind][6]=y*100/width;
    }

    /*useEffect(() => {
        console.log('data')
        console.log(props.data)
    },[]);*/

    useImperativeHandle(ref1, () => ({

        getData(){
            return data

        },
        isValid(){
            return true
        }

    }));


              return(
                  <div
                      className='dragAndDropContainer'
                  ref={parentRef}>
        <Stage
             width={width}
             height={width}

        >
        <Layer>
            {
                data.map((image,ind)=>{
                    return(
                        <URLImage
                            locked={image[4]}
                            ind={ind}
                            updateX={updateX}
                            updateY={updateY}
                            src={image[0]}
                            width={width*image[1]/100}
                            height={width*image[2]/100}
                            rotation={image[3]}
                            x={width*image[5]/100}
                            y={width*image[6]/100}
                        />
                    )
                })
            }


        </Layer>
</Stage>
                  </div>
    )
})

export default DragAndDrop
