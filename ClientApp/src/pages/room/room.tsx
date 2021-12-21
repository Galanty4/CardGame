import { Col, Row, Input, Button } from 'antd';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../../components/Card/GameCard';
import { sendMessage } from '../../signalR/invokers';
import { RootState } from '../../store';

import './room.less';

const Room: React.FC = () => {
  const [text, setText] = useState('');
  const user = useSelector((state: RootState) => state.userReducer);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {enemyState, playerState} = useSelector((state: RootState) => state.room);

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

  return (
    <Row className="room">
      <Col span={18}>
        <Row className="room__enemy">
          <Row className='room__deck-area room__deck-area--top'>
            {enemyState.cardsInHand.map((el) => (
              <div className='room__card' key={el.id}>
                <GameCard w="200px" h="max-content" imgSrc={el.imgSrc} description={<span dangerouslySetInnerHTML={{__html: el.description}} />} spellPower={el.spellpower} />
              </div>
            ))}
          </Row>
        <Row className="room__gaming-area "></Row>
        </Row>
        <Row className='room__player'>
          <Row className="room__gaming-area"></Row>
          <Row className='room__deck-area room__deck-area--bottom'>
          {playerState.cardsInHand.map((el) => (
              <div className='room__card' key={el.id}>
                <GameCard w="200px" h="max-content" imgSrc={el.imgSrc} description={<span dangerouslySetInnerHTML={{__html: el.description}} />} spellPower={el.spellpower} />
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