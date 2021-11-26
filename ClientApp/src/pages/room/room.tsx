import { Col, Row, Input} from 'antd';

import React, { useState } from 'react';

import './room.less';

const Room: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <Row className="room">
      <Col span={18}>

      </Col>
      <Col span={6} className="room__chat-container">
        <Row className="room__chat">
          <Row className="room__opponent-message-container">
            <div className="room__opponent-message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, laborum! Architecto officiis repudiandae et eveniet expedita nobis temporibus, at ratione, veritatis harum nisi distinctio reiciendis animi id vel, quae error.
              <div className="room__nickname">Opponent</div>
            </div>
          </Row>
          <Row className="room__user-message-container">
            <div className="room__user-message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nobis, ea molestias similique ipsa, repudiandae dicta et eaque, ad repellat cumque. Voluptas modi doloribus dolorum fugit laborum facilis cumque aperiam?
              <div className="room__nickname">User</div>
            </div>
          </Row>
        </Row>
        <Row className="room__chat-input-container">
          <Input.TextArea onChange={(e) => setText(e.target.value)} className="room__chat-input" />
        </Row>
      </Col>
    </Row>
  )
}

export default Room;