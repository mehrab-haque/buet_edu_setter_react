import React from 'react';
import { useDrag } from 'react-dnd';
var style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    float: 'left',
};
export const Box = ({ name, type, isDropped }) => {
    const [{ opacity }, drag] = useDrag({
        item: { name, type },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });
    if(!isDropped)style['cursor']='move'
    if(!isDropped)
    return (<div ref={drag} style={{ ...style, opacity }}>
        {isDropped ? <s>{name}</s> : name}
    </div>);
    else
        return (<div style={{ ...style, opacity }}>
            {isDropped ? <s>{name}</s> : name}
        </div>);
};
