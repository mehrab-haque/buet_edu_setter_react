import React,{useState,createRef,useRef,useCallback,useEffect,forwardRef, useImperativeHandle} from 'react'
import Konva, {Group} from 'konva'

const MatchStciks=forwardRef((props,ref1)=>{

    const containerRef=useRef()
    var data=props.data

    var panX=null,panY=null,scale=null,divSize=null,position=null


    useImperativeHandle(ref1, () => ({

        getData(){

            return data

        },
        isValid(){
            return true
        }

    }));

    useEffect(()=>{
        loadUI()
        window.addEventListener('resize',loadUI);
    },[])

    const loadUI=()=>{
        if(containerRef.current!=null) {
            var width = containerRef.current.offsetWidth
            var height = width

            const stage = new Konva.Stage({
                container: props.containerId,
                width: width,
                height: height
            });
            const layer = new Konva.Layer();
            stage.add(layer);

            if (divSize == null) divSize = width / (Math.max(maxX() - minX(), maxY() - minY()) + 1)


            if (panX == null) {
                var diffX = maxX() - minX()
                var diffY = maxY() - minY()
                if (diffX > diffY) {
                    panX = -((minX() - 0.5) * divSize)
                    panY = -((minY() - 0.5 - (diffX - diffY) / 2) * divSize)
                } else {
                    panY = -((minY() - 0.5) * divSize)
                    panX = -((minX() - 0.5 - (diffY - diffX) / 2) * divSize)
                }
            }

            var bgGroup = new Konva.Group({
                draggable: true,
                x: panX,
                y: panY
            })
            layer.add(bgGroup)


            bgGroup.on('dragend', function () {
                panX = bgGroup.x()
                panY = bgGroup.y()
            })


            //console.log((Math.max(maxX()-minX(),maxY()-minY())+1))


            var bgRect = new Konva.Rect({
                width: data.divCount * divSize,
                height: data.divCount * divSize,
                fill: data.bgColor
            })
            bgGroup.add(bgRect)
            for (var i = 0; i <= data.divCount; i++) {
                var lineH = new Konva.Line({
                    points: [0, i * divSize, data.divCount * divSize, i * divSize],
                    stroke: data.lineColor,
                    strokeWidth: 1,
                    opacity: data.lineOpacity
                })
                var lineV = new Konva.Line({
                    points: [i * divSize, 0, i * divSize, data.divCount * divSize],
                    stroke: data.lineColor,
                    strokeWidth: 1,
                    opacity: data.lineOpacity
                })
                bgGroup.add(lineH)
                bgGroup.add(lineV)
            }


            data.elements.map((element, index) => {
                if (element.type === 'matchstick') {
                    var line = new Konva.Line({
                        points: [element.x1 * divSize, element.y1 * divSize, element.x2 * divSize, element.y2 * divSize],
                        strokeWidth: 16,
                        stroke: '#D3A863',
                        lineCap: 'round'
                    })
                    var head = new Konva.Circle({
                        x: element.x1 * divSize,
                        y: element.y1 * divSize,
                        radius: 12,
                        fill: '#D14B57'
                    });

                    var anchor1 = new Konva.Circle({
                        x: element.x1 * divSize,
                        y: element.y1 * divSize,
                        radius: 16,
                        fill: 'transparent',
                    });

                    var anchor2 = new Konva.Circle({
                        x: element.x2 * divSize,
                        y: element.y2 * divSize,
                        radius: 16,
                        fill: 'transparent',
                    });

                    if (!element.isLocked) {
                        line.setAttrs({
                            draggable: true
                        })
                        anchor1.setAttrs({
                            draggable: true
                        })
                        anchor2.setAttrs({
                            draggable: true
                        })
                    }

                    line.on('mouseover', function () {
                        document.body.style.cursor = 'pointer';

                    });
                    line.on('mouseout', function () {
                        document.body.style.cursor = 'default';
                    });
                    anchor1.on('mouseover', function () {
                        document.body.style.cursor = 'pointer';

                    });
                    anchor1.on('mouseout', function () {
                        document.body.style.cursor = 'default';
                    });
                    anchor2.on('mouseover', function () {
                        document.body.style.cursor = 'pointer';

                    });
                    anchor2.on('mouseout', function () {
                        document.body.style.cursor = 'default';
                    });

                    anchor1.on('dragmove', function () {
                        line.setAttrs({
                            points: [anchor1.x(), anchor1.y(), line.points()[2], line.points()[3]]
                        })
                        head.setAttrs({
                            x: anchor1.x(),
                            y: anchor1.y()
                        })
                    })

                    anchor2.on('dragmove', function () {
                        line.setAttrs({
                            points: [line.points()[0], line.points()[1], anchor2.x(), anchor2.y()]
                        })
                    })

                    line.on('dragmove', function () {
                        anchor1.setAttrs({
                            x: line.points()[0] + line.x(),
                            y: line.points()[1] + line.y()
                        })
                        head.setAttrs({
                            x: line.points()[0] + line.x(),
                            y: line.points()[1] + line.y()
                        })
                        anchor2.setAttrs({
                            x: line.points()[2] + line.x(),
                            y: line.points()[3] + line.y()
                        })

                    })

                    anchor1.on('dragend', function () {
                        var remX = (anchor1.x()) % divSize;
                        var coordX = anchor1.x() - remX;
                        var remY = (anchor1.y()) % divSize;
                        var coordY = anchor1.y() - remY;
                        if (remX > divSize / 2) coordX += divSize;
                        if (remY > divSize / 2) coordY += divSize;
                        var x = (coordX) / divSize;
                        if (x - parseInt(x) < 0.5) x = parseInt(x)
                        else x = parseInt(x) + 1
                        var y = (coordY) / divSize;
                        if (y - parseInt(y) < 0.5) y = parseInt(y)
                        else y = parseInt(y) + 1
                        data.elements[index].x1 = x;
                        data.elements[index].y1 = y;

                        loadUI()
                    })

                    anchor2.on('dragend', function () {
                        var remX = (anchor2.x()) % divSize;
                        var coordX = anchor2.x() - remX;
                        var remY = (anchor2.y()) % divSize;
                        var coordY = anchor2.y() - remY;
                        if (remX > divSize / 2) coordX += divSize;
                        if (remY > divSize / 2) coordY += divSize;
                        var x = (coordX) / divSize;
                        if (x - parseInt(x) < 0.5) x = parseInt(x)
                        else x = parseInt(x) + 1
                        var y = (coordY) / divSize;
                        if (y - parseInt(y) < 0.5) y = parseInt(y)
                        else y = parseInt(y) + 1
                        data.elements[index].x2 = x;
                        data.elements[index].y2 = y;

                        loadUI()
                    })

                    line.on('dragend', function () {

                        line.setAttrs({
                            points: [line.points()[0] + line.x(), line.points()[1] + line.y(), line.points()[2] + line.x(), line.points()[3] + line.y()]
                        })
                        line.setAttrs({
                            x: 0,
                            y: 0
                        })

                        var remX = (line.points()[0]) % divSize;
                        var coordX = line.points()[0] - remX;
                        var remY = (line.points()[1]) % divSize;
                        var coordY = line.points()[1] - remY;
                        if (remX > divSize / 2) coordX += divSize;
                        if (remY > divSize / 2) coordY += divSize;
                        var x = (coordX) / divSize;
                        if (x - parseInt(x) < 0.5) x = parseInt(x)
                        else x = parseInt(x) + 1
                        var y = (coordY) / divSize;
                        if (y - parseInt(y) < 0.5) y = parseInt(y)
                        else y = parseInt(y) + 1
                        data.elements[index].x1 = x;
                        data.elements[index].y1 = y;

                        remX = (line.points()[2]) % divSize;
                        coordX = line.points()[2] - remX;
                        remY = (line.points()[3]) % divSize;
                        coordY = line.points()[3] - remY;
                        if (remX > divSize / 2) coordX += divSize;
                        if (remY > divSize / 2) coordY += divSize;
                        x = (coordX) / divSize;
                        if (x - parseInt(x) < 0.5) x = parseInt(x)
                        else x = parseInt(x) + 1
                        y = (coordY) / divSize;
                        if (y - parseInt(y) < 0.5) y = parseInt(y)
                        else y = parseInt(y) + 1
                        data.elements[index].x2 = x;
                        data.elements[index].y2 = y;
                        loadUI()
                    });

                    bgGroup.add(line)
                    bgGroup.add(head)
                    bgGroup.add(anchor1)
                    bgGroup.add(anchor2)
                }
            })

            if (position != null) {
                stage.position(position)
            }

            if (scale != null) {
                stage.scale({x: scale, y: scale});
            }


            var scaleBy = 1.02;
            stage.on('wheel', (e) => {
                e.evt.preventDefault();
                var oldScale = stage.scaleX();

                var pointer = stage.getPointerPosition();

                var mousePointTo = {
                    x: (pointer.x - stage.x()) / oldScale,
                    y: (pointer.y - stage.y()) / oldScale,
                };

                var newScale =
                    e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

                stage.scale({x: newScale, y: newScale});

                scale = newScale

                var newPos = {
                    x: pointer.x - mousePointTo.x * newScale,
                    y: pointer.y - mousePointTo.y * newScale,
                };
                position = newPos
                stage.position(newPos);
                stage.batchDraw();
            });

            layer.draw()
        }
    }

    var minX=()=>{
        var result
        data.elements.map((element,ind)=>{
            if(element.type==='matchstick'){
                if(ind==0)
                    result=element.x1<element.x2?element.x1:element.x2
                else{
                    if(Math.min(element.x1,element.x2)<result)
                        result=Math.min(element.x1,element.x2)
                }
            }
        })
        return result
    }

    var minY=()=>{
        var result
        data.elements.map((element,ind)=>{
            if(element.type==='matchstick'){
                if(ind==0)
                    result=element.y1<element.y2?element.y1:element.y2
                else{
                    if(Math.min(element.y1,element.y2)<result)
                        result=Math.min(element.y1,element.y2)
                }
            }
        })
        return result
    }

    var maxX=()=>{
        var result
        data.elements.map((element,ind)=>{
            if(element.type==='matchstick'){
                if(ind==0)
                    result=element.x1>element.x2?element.x1:element.x2
                else{
                    if(Math.max(element.x1,element.x2)>result)
                        result=Math.max(element.x1,element.x2)
                }
            }
        })
        return result
    }

    var maxY=()=>{
        var result
        data.elements.map((element,ind)=>{
            if(element.type==='matchstick'){
                if(ind==0)
                    result=element.y1>element.y2?element.y1:element.y2
                else{
                    if(Math.max(element.y1,element.y2)>result)
                        result=Math.max(element.y1,element.y2)
                }
            }
        })
        return result
    }

    return(
        <div ref={containerRef} id={props.containerId}/>
    )

})

export default MatchStciks


