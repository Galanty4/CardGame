import { Col, Row, Input, Button} from 'antd';

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage } from '../../signalR/invokers';
import { RootState } from '../../store';

import './room.less';

const Room: React.FC = () => {
  const [text, setText] = useState('');
  const user = useSelector((state: RootState) => state.userReducer);

  const onSend = () => {
    sendMessage(text);
    setText('');
  }

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

  return (
    <Row className="room">
      <Col span={18}>

      </Col>
      <Col span={6} className="room__chat-container">
        <Row className="room__chat">
          {user.session.messages.map((el, index) => (
            <Row key={index} className={el.user === user.session.name ? "room__user-message-container" : "room__opponent-message-container"}>
              <div className={el.user === user.session.name ? "room__user-message" :"room__opponent-message"}>
                 {el.message}
                <div className="room__nickname">{el.user}</div>
              </div>
            </Row>
          ))}
        </Row>
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