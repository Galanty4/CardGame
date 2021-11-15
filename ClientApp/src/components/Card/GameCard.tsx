import React, { ReactElement, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import './GameCard.less';

export interface IGameCard {
  w: number | string;
  h: number | string;
  imgSrc: string;
  description?: string | React.ReactElement | ReactElement[],
  spellPower?: string | number;
}
const GameCard: React.FC<IGameCard> = (props) => {
  const { w, h, imgSrc, description, spellPower = 0 } = props;
  const [flipped, setIsFlipped] = useState<boolean>(false);

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
      <div onClick={() => setIsFlipped(true)} className="game-card game-card--front" style={{ width: w, height: h }}>
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

      <div onClick={() => setIsFlipped(false)} className="game-card game-card--back" style={{ width: w, height: h }}>
        <div className="game-card__back-circle"></div>
        <div className="game-card__back-row">
          <div className="game-card__back-col"></div>
          <div className="game-card__back-col"></div>
          <div className="game-card__back-col"></div>
          <div className="game-card__back-col"></div>
        </div>
      </div>

    </ReactCardFlip>
  );
}

export default GameCard;
