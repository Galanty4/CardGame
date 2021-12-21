import React, { ReactElement, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../dragndrop/itemtypes';
import ReactCardFlip from 'react-card-flip';

import './GameCard.less';

export interface IGameCard {
  w: number | string;
  h: number | string;
  imgSrc: string;
  description?: string | React.ReactElement | ReactElement[],
  spellPower?: number;
  id: number | string;
  draggable?: boolean;
  flippable?: boolean;
  defaultFlipped?: boolean;
  canPlayerFlip?: boolean;
}
const GameCard: React.FC<IGameCard> = (props) => {
  const { w, h, imgSrc, description, spellPower = 0, id, draggable, flippable, defaultFlipped, canPlayerFlip } = props;

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      canDrag: draggable,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      })
    }),
    []
  )
  const [flipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    setIsFlipped(!!defaultFlipped);
  }, [defaultFlipped])

  const setFlip = (flip: boolean) => {
    if (canPlayerFlip) {
      setIsFlipped(flip)
    }
  }

  return (
    <> {flippable ? (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
        <div ref={dragRef} onClick={() => setFlip(true)} className="game-card game-card--front" style={{ width: w, height: h, opacity }}>
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

        <div onClick={() => setFlip(true)} className="game-card game-card--back" style={{ width: w, height: h }}>
          <div className="game-card__back-circle"></div>
          <div className="game-card__back-row">
            <div className="game-card__back-col"></div>
            <div className="game-card__back-col"></div>
            <div className="game-card__back-col"></div>
            <div className="game-card__back-col"></div>
          </div>
        </div>
    </ReactCardFlip>
    ) : (
      <div ref={dragRef} onClick={() => setIsFlipped(true)} className="game-card game-card--front" style={{ width: w, height: h, opacity }}>
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
    )}
    </>
  );
}

export default GameCard;
