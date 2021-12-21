import React, { ReactElement } from 'react';

import './GameCard.less';

export interface IGameCard {
  w: number | string;
  h: number | string;
  imgSrc: string;
  description?: string | React.ReactElement | ReactElement[],
  spellPower?: number;
}
const GameCard: React.FC<IGameCard> = (props) => {
  const { w, h, imgSrc, description, spellPower = 0 } = props;

  return (
    <div className="game-card" style={{ width: w, height: h }}>
      <div className="game-card__spellpower-container">
        <div className="game-card__spellpower">
          <b>
            {spellPower}
          </b>
        </div>
      </div>
      <div className="game-card__image-container">
        <div style={{ backgroundImage: `url(${imgSrc})` }} className="game-card__image-bg" >
        </div>
      </div>
      <div className="game-card__description">
        <div className="game-card__description-text">
          {description}
        </div>
      </div>
    </div>
  );
}

export default GameCard;
