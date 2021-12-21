import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";

import './main.less'


const Main: React.FC = () => {
  const [form] = useForm();
  
  return (
    <div className="login">
      <div className="login__modal">
        <div className="login__title">
          <h2>Logowanie</h2>
          <Form form={form} labelCol={{span: 24}} wrapperCol={{span: 24}}>
            <Form.Item label="Nazwa gracza">
              <Input/>
            </Form.Item>
            <Form.Item label="Nazwa pokoju">
              <Input />
            </Form.Item>
            <Form.Item className="login__btn">
              <Button type="primary" htmlType="submit">Dołącz</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Main;