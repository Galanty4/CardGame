import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../signalR/invokers";
import { updateSession } from "../../store/user/actions";

import './main.less'

interface FormValues {
  name: string;
  room: string;
}

interface IMain {
  initialRoom?: string
}

const Main: React.FC<IMain> = ({ initialRoom }: IMain) => {
  const btnClickSound = new Audio("/sfx/btn_click.mp3");
  const [form] = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (values: FormValues) => {
    joinRoom(values.name, values.room).then(() => {
      dispatch(updateSession(values));
      navigate(`/room?roomId=${values.room}`);
    })
  }

  return (
    <div className="login">
      <div className="login__modal">
        <div className="login__title">
          <h2>Logowanie</h2>
          <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={onSubmit}>
            <Form.Item label="Nazwa gracza" name="name">
              <Input required />
            </Form.Item>
            <Form.Item label="Nazwa pokoju" name="room" initialValue={initialRoom}>
              <Input required />
            </Form.Item>
            <Form.Item className="login__btn">
              <Button type="primary" htmlType="submit" onClick={() => btnClickSound.play()}>Dołącz</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Main;