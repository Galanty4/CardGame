import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../dragndrop/itemtypes';
import { attackCard } from '../../signalR/invokers';
import { Id } from '../../store/generics/generics';

import './CardObject.less'

export interface CardObjectProps {
  id: Id;
  spellPower: number;
  imgSrc: string;
  draggable?: boolean;
  droppable?: boolean;
}

const CardObject: React.FC<CardObjectProps> = (props) => {
  const { id, spellPower, imgSrc, draggable, droppable } = props;

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD_OBJECT,
      canDrag: !!draggable,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      })
    }),
    []
  )

  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.CARD_OBJECT,
    canDrop: () => !!droppable,
    collect: monitor => ({
          hovered: monitor.isOver(),
          canDrop: monitor.canDrop(),
          isOverCurrent: monitor.isOver({ shallow: true })
    }),
    drop: (item: {id: Id}) => {
      attackCard(item.id, id)
    }
  });


  return dragRef(drop((
    <div className="card-object" style={{opacity}}>
      <div className="card-object__spellpower-container">
        <div className="card-object__spellpower">
          <b>
            {spellPower}
          </b>
        </div>
      </div>
      <div className="card-object__image-container">
        <div style={{ backgroundImage: `url(${imgSrc})`, borderColor: isOverCurrent ? 'red' : '#f1f2f6' }} className="card-object__image-bg" >
        </div>
      </div>
    </div>
  )))
}

export default CardObject;