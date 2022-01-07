import { Col, Row, Input, Button } from 'antd';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../../components/Card/GameCard';
import CardObject from '../../components/CardObject/CardObject';
import { ItemTypes } from '../../dragndrop/itemtypes';
import { activateCard, changeTurn, sendMessage } from '../../signalR/invokers';
import { RootState } from '../../store';
import { Id } from '../../store/generics/generics';
import { makeMove } from '../../store/room/actions';
import { Turn } from '../../store/room/types';

import './room.less';

const Room: React.FC = () => {
  const [enableMusic, setEnableMusic] = useState(true);
  const [text, setText] = useState('');
  const user = useSelector((state: RootState) => state.userReducer);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { enemyState, playerState, turn, playerTurnIndex } = useSelector((state: RootState) => state.room);
  const ref = useRef<HTMLDivElement>(null);
  const btnClickSound = new Audio("/sfx/btn_click.mp3");
  const messageSound = new Audio("/sfx/message.mp3");
  const endTurnSound = new Audio("/sfx/end_turn.mp3");
  const cardPickSound = new Audio("/sfx/card_pick.mp3");
  const cardPlaceSound = new Audio("/sfx/card_place.mp3");
  const cardEnterSound = new Audio("/sfx/card_enter.mp3");
  const backgroundSound = new Audio("/sfx/background.mp3");

  const onSend = () => {
    sendMessage(text);
    messageSound.play();
    setText('');
  }

  useEffect(() => {
    if (enableMusic) {
      backgroundSound.loop = true;
      backgroundSound.play();
    }
    return () => {
      backgroundSound.pause();
    }
  }, [enableMusic]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [scrollRef]);

  const onEnterClick = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }
    sendMessage(text);
    setText('');
  }, [text])

  useEffect(() => {
    document.addEventListener('keydown', onEnterClick);
    return () => {
      document.removeEventListener('keydown', onEnterClick);
    }
  }, [text, onEnterClick])

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [user.session.messages])

  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => turn === Turn.PLAYER_TURN,
    collect: monitor => ({
      hovered: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    drop: (item: { id: Id }) => {
      cardEnterSound.play();
      activateCard(item.id)
    }
  });

  const onEndTurn = () => {
    const changedTurn = playerTurnIndex === 0 ? 1 : 0;
    endTurnSound.play();
    changeTurn(changedTurn);
  }

  drop(ref);

  return (
    <Row className="room">
      <Col className='room__board' span={18}>
        <Row className="room__enemy">
          <Row className='room__deck-area room__deck-area--top'>
            {enemyState.cardsInHand.map((el) => (
              <div className='room__card' key={el.id}>
                <GameCard defaultFlipped showBack id={el.id} w="200px" h="270px" imgSrc={el.imgSrc} description={<span dangerouslySetInnerHTML={{ __html: el.description }} />} spellPower={el.spellpower} />
              </div>
            ))}
          </Row>
          <Row className="room__gaming-area ">
            {enemyState.activeCards.map((el) => (
              <div className='room__card-object' key={el.id}>
                <CardObject droppable id={el.id} spellPower={el.spellpower} imgSrc={el.imgSrc} />
              </div>
            ))}
          </Row>
        </Row>
        {turn === Turn.NO_TURN ? (
          <Button className='room__turn-btn_disabled' onClick={() => btnClickSound.play()} type='primary'>Oczekiwanie na dołączenie przeciwnika</Button>

        ) : (
          <Button className='room__turn-btn' onClick={onEndTurn} type={turn === Turn.PLAYER_TURN ? 'primary' : 'default'}>{turn === Turn.PLAYER_TURN ? "Zakończ turę" : "Tura przeciwnika trwa"}</Button>
        )}
        <Row className='room__player'>
          <Row className="room__gaming-area" ref={ref} style={{ backgroundColor: isOverCurrent ? '#757575' : '#424242' }}>
            {playerState.activeCards.map((el) => (
              <div className='room__card-object' key={el.id}>
                <CardObject draggable={turn === Turn.PLAYER_TURN} id={el.id} spellPower={el.spellpower} imgSrc={el.imgSrc} />
              </div>
            ))}
          </Row>
          <Row className='room__deck-area room__deck-area--bottom'>
            {playerState.cardsInHand.map((el) => (
              <div className='room__card room__card--player' key={el.id} onDragStart={() => cardPickSound.play()} onDragEnd={() => cardPlaceSound.play()}>
                <GameCard draggable id={el.id} w="200px" h="270px" imgSrc={el.imgSrc} description={<span dangerouslySetInnerHTML={{ __html: el.description }} />} spellPower={el.spellpower} />
              </div>
            ))}
          </Row>
        </Row>
      </Col>
      <Col span={6} className="room__chat-container">
        <div className="room__chat">
          {user.session.messages.map((el, index) => (
            <Row key={index} className={el.user === user.session.name ? "room__user-message-container" : "room__opponent-message-container"}>
              <div className={el.user === user.session.name ? "room__user-message" : "room__opponent-message"}>
                {el.message}
                <div className="room__nickname">{el.user}</div>
              </div>
            </Row>
          ))}
          <div ref={scrollRef} style={{ float: "left", clear: "both" }}></div>
        </div>
        <Row className="room__chat-input-container">
          <Input.TextArea value={text} onChange={(e) => setText(e.target.value)} className="room__chat-input" />
          <Col span={24} className="room__chat-btn ">
            <Button onClick={onSend} type="primary">Wyślij</Button>
          </Col>
          <Col span={12}>
            <Button onClick={() => { setEnableMusic(!enableMusic); btnClickSound.play() }} type="primary" className='text-right btn btn-sm'>{enableMusic ? "Wyłącz muzykę" : "Włącz muzykę"}</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Room;