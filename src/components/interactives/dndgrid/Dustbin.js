import React from 'react';
import { useDrop } from 'react-dnd';
const style = {
    height: '6rem',
    width: '6rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    border: '1px dashed gray'
};

const itemStyle = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '10px',
    marginBottom: '10px',

};

export const Dustbin = ({ accept, items, onDrop,name }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    let backgroundColor = 'white';
    if (isActive) {
        backgroundColor = '#00bb0088';
    }
    else if (canDrop) {
        backgroundColor = 'skyblue';
    }
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>

            {name}

          <div style={{
              marginTop:'10px',
              display:'flex',
              flexWrap:'wrap'
          }}>
            {
              items.map(item=>{
                  return(
                      <div style={itemStyle}>
                          {item}
                      </div>
                  )
              })
          }
          </div>
        </div>);
};
