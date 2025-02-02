import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    axios
      .get('http://dev.todo/api/authentication', { withCredentials: true }) // withCredentials для отправки cookies
      .then((response) => {
    console.log(response)
    return
        if (response.data.userId) {
          setUser(response.data.user); // Устанавливаем пользователя
        } else {
          //logout(); // Если аутентификация не удалась
        }
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  const login = (userData) => {
    // Токен сохраняется на сервере в HttpOnly cookie, клиент не взаимодействует с ним напрямую
    setUser(userData); // Устанавливаем данные пользователя
  };

  const logout = () => {
    // В этом случае мы вызываем API для удаления токена на сервере
    // axios
    //   .post('http://dev.todo/api/logout', {}, { withCredentials: true })
    //   .then(() => {
    //     setUser(null); // Убираем пользователя из состояния
    //   })
    //   .catch((error) => console.error('Ошибка при выходе:', error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
