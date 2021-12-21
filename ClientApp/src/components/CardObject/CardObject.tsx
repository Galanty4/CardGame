import React from 'react';
import { Id } from '../../store/generics/generics';

import './CardObject.less'

export interface CardObjectProps {
  id: Id;
  spellPower: number;
  imgSrc: string;
}

const CardObject: React.FC<CardObjectProps> = (props) => {
  const { id, spellPower, imgSrc } = props;

  return (
    <div className="card-object">
      <div className="card-object__spellpower-container">
        <div className="card-object__spellpower">
          <b>
            {spellPower}
          </b>
        </div>
      </div>
      <div className="card-object__image-container">
        <div style={{ backgroundImage: `url(${imgSrc})` }} className="card-object__image-bg" >
        </div>
      </div>
    </div>
  )
}

export default CardObject;