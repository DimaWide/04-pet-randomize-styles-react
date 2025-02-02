
import React, { useState, useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Импортируем контекст

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Получаем функцию login из контекста

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // Отправка данных на сервер для логина
      const response = await axios.post('http://dev.todo/api/login', values);
      message.success('Login successful');

      console.log(response)
      
      // Логиним пользователя с полученным токеном и данными
    const { user } = response.data; // Предполагаем, что сервер возвращает токен и данные пользователя
    login({ user }); // Сохраняем данные в контексте и токен

      // Перенаправление на главную страницу после успешного логина
      navigate('/'); // Перенаправление на страницу после логина
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        message.error(`Login failed: ${error.response.data.error}`);
      } else {
        message.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
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
        Login
      </Button>
    </Form>
  );
};

export default Login;



// import React, { useState } from 'react';
// import { Button, Form, Input, message } from 'antd';
// import { useNavigate } from 'react-router-dom'; // Для перенаправления
// import axios from 'axios';

// const Login = ({ setToken }) => {
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate(); // Хук для перенаправления

//     const onFinish = async (values) => {
//         setLoading(true);

//         try {
//             // Отправка данных на сервер для логина
//             const response = await axios.post('http://dev.todo/api/login', values);
//             const { token } = response.data;

//             // Сохраняем токен в localStorage
//             localStorage.setItem('token', token);
//             setToken(token);

//             // Успешный вход, перенаправляем на главную страницу или страницу задач
//             message.success('Login successful');
//             navigate('/tasks'); // Перенаправление на страницу задач после успешного логина
//         } catch (error) {
//             console.log(error)
//             message.error('Login failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Form
//             name="login"
//             onFinish={onFinish}
//             layout="vertical"
//             style={{ maxWidth: 400, margin: 'auto' }}
//         >
//             <Form.Item
//                 name="email"
//                 label="email"
//                 rules={[{ required: true, message: 'Please input your email!' }]}
//             >
//                 <Input />
//             </Form.Item>

//             <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[{ required: true, message: 'Please input your password!' }]}
//             >
//                 <Input.Password />
//             </Form.Item>

//             <Button type="primary" htmlType="submit" loading={loading} block>
//                 Login
//             </Button>
//         </Form>
//     );
// };

// export default Login;
