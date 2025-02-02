import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Хук для перенаправления

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // Отправка данных на сервер для регистрации
      await axios.post('http://dev.todo/api/register', values);
      message.success('Registration successful');
      
      // Перенаправление на страницу логина после успешной регистрации
      navigate('/login'); // Перенаправление на страницу логина
    } catch (error) {
      // Обработка ошибок
      if (error.response && error.response.data && error.response.data.error) {
        message.error(`Registration failed: ${error.response.data.error}`);
      } else {
        message.error('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="register"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: 'auto' }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        Register
      </Button>
    </Form>
  );
};

export default Register;
