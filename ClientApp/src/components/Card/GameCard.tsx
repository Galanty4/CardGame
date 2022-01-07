import React, { ReactElement, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../dragndrop/itemtypes';
import ReactCardFlip from 'react-card-flip';

import './GameCard.less';

export interface IGameCard {
  w: number | string;
  h: number | string;
  imgSrc: string;
  name?: string | React.ReactElement | ReactElement[],
  description?: string | React.ReactElement | ReactElement[],
  spellPower?: number;
  cost?: number;
  health?: number;
  id: number | string;
  draggable?: boolean;
  flippable?: boolean;
  defaultFlipped?: boolean;
  canPlayerFlip?: boolean;
  showBack?: boolean;
}
const GameCard: React.FC<IGameCard> = (props) => {
  const { w, h, imgSrc, name, description, spellPower = 0, cost = 0, health = 0, id, draggable, flippable, defaultFlipped, canPlayerFlip, showBack } = props;

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
        <div className="game-card__name-container">
            <div className="game-card__name">
              <b>
                {name}
              </b>
            </div>
          </div>
          <div className="game-card__spellpower-container">
            <div className="game-card__spellpower">
              <b>
                {spellPower}
              </b>
            </div>
          </div>
          <div className="game-card__cost-container">
            <div className="game-card__cost">
              <b>
                {cost}
              </b>
            </div>
          </div>
          <div className="game-card__health-container">
            <div className="game-card__health">
              <b>
                {health}
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
      <>
        {!showBack ? (
        <div ref={dragRef} className="game-card game-card--front" style={{ width: w, height: h, opacity }}>
          <div className="game-card__name-container">
            <div className="game-card__name">
              <b>
                {name}
              </b>
            </div>
          </div>
          <div className="game-card__spellpower-container">
            <div className="game-card__spellpower">
              <b>
                {spellPower}
              </b>
            </div>
          </div>
          <div className="game-card__cost-container">
            <div className="game-card__cost">
              <b>
                {cost}
              </b>
            </div>
          </div>
          <div className="game-card__health-container">
            <div className="game-card__health">
              <b>
                {health}
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
        ): (
        <div className="game-card game-card--back" style={{ width: w, height: h }}>
          <div className="game-card__back-circle"></div>
            <div className="game-card__back-row">
              <div className="game-card__back-col"></div>
              <div className="game-card__back-col"></div>
              <div className="game-card__back-col"></div>
              <div className="game-card__back-col"></div>
            </div>
        </div>
        )}
      </>
    )}
    </>
  );
}

export default GameCard;
