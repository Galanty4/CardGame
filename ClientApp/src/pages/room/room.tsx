import { Col, Row, Input, Button } from 'antd';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../../components/Card/GameCard';
import CardObject from '../../components/CardObject/CardObject';
import { ItemTypes } from '../../dragndrop/itemtypes';
import { changeTurn, sendMessage } from '../../signalR/invokers';
import { RootState } from '../../store';
import { Id } from '../../store/generics/generics';
import { makeMove } from '../../store/room/actions';
import { Turn } from '../../store/room/types';

import './room.less';

const Room: React.FC = () => {
  const [text, setText] = useState('');
  const user = useSelector((state: RootState) => state.userReducer);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const {enemyState, playerState, turn, playerTurnIndex} = useSelector((state: RootState) => state.room);
  const ref = useRef<HTMLDivElement>(null);
  const onSend = () => {
    sendMessage(text);
    setText('');
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [scrollRef])

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
    drop: (item: {id: Id}) => {
      const cardIndex = playerState.cardsInHand.findIndex((el) => el.id === item.id);

      if (cardIndex !== -1) {
        const cardCopy = {...playerState.cardsInHand[cardIndex]};
        const activeCards = [...playerState.activeCards];
        activeCards.push(cardCopy)
        const cardsInHand = playerState.cardsInHand.filter((el) => el.id !== item.id);
        dispatch(makeMove({activeCards, cardsInHand, player: 'player'}))
      }
    }
  });

  const onEndTurn = () => {
    const changedTurn = playerTurnIndex === 0 ? 1 : 0;
    changeTurn(changedTurn);
  }

  drop(ref)
  return (
    <Row className="room">
      <Col className='room__board' span={18}>
        <Row className="room__enemy">
          <Row className='room__deck-area room__deck-area--top'>
            {enemyState.cardsInHand.map((el) => (
              <div className='room__card' key={el.id}>
                <GameCard defaultFlipped showBack id={el.id} w="200px" h="270px" imgSrc={el.imgSrc} description={<span dangerouslySetInnerHTML={{__html: el.description}} />} spellPower={el.spellpower} />
              </div>
            ))}
          </Row>
        <Row className="room__gaming-area ">
          {enemyState.activeCards.map((el) => (
            <div className='room__card-object' key={el.id}>
              <CardObject id={el.id} spellPower={el.spellpower} imgSrc={el.imgSrc}/>
            </div>
          ))}
        </Row>
        </Row>
        <Button className='room__turn-btn' onClick={onEndTurn} type={turn === Turn.PLAYER_TURN ? 'primary' : 'default'}>{turn === Turn.PLAYER_TURN ? "Zakończ turę" : "Tura przeciwnika trwa"}</Button>
        <Row className='room__player'>
          <Row className="room__gaming-area" ref={ref} style={{backgroundColor: isOverCurrent ? '#757575' : '#424242'}}>
          {playerState.activeCards.map((el) => (
            <div className='room__card-object' key={el.id}>
              <CardObject id={el.id} spellPower={el.spellpower} imgSrc={el.imgSrc}/>
            </div>
          ))}
          </Row>
          <Row className='room__deck-area room__deck-area--bottom'>
          {playerState.cardsInHand.map((el) => (
              <div className='room__card room__card--player' key={el.id}>
                <GameCard draggable id={el.id} w="200px"  h="270px" imgSrc={el.imgSrc} description={<span dangerouslySetInnerHTML={{__html: el.description}} />} spellPower={el.spellpower} />
              </div>
            ))}
          </Row>
        </Row>
      </Col>
      <Col span={6} className="room__chat-container">
          <div className="room__chat">
            {user.session.messages.map((el, index) => (
              <Row key={index} className={el.user === user.session.name ? "room__user-message-container" : "room__opponent-message-container"}>
                <div className={el.user === user.session.name ? "room__user-message" :"room__opponent-message"}>
                  {el.message}
                  <div className="room__nickname">{el.user}</div>
                </div>
              </Row>
            ))}
            <div ref={scrollRef} style={{ float:"left", clear: "both" }}></div>
          </div>
        <Row className="room__chat-input-container">
          <Input.TextArea value={text} onChange={(e) => setText(e.target.value)} className="room__chat-input" />
          <Col span={24} className="room__chat-btn ">
            <Button onClick={onSend} type="primary">Wyślij</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Room;