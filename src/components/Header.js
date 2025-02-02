import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'; // Иконки для открытия и закрытия меню
import { AuthContext } from './AuthContext';

const AppHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для управления открытием/закрытием меню
    const { user, logout } = useContext(AuthContext); // Получаем user и logout из контекста
    const navigate = useNavigate(); // Хук для программной навигации

    // Функция для переключения состояния меню
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Функция для выхода из системы
    const handleLogout = () => {
        logout(); // Вызываем функцию logout из контекста
        navigate('/login'); // Перенаправляем на страницу логина после выхода
    };

    return (
        <header className="bg-gray-900 text-white p-4 w-full top-0 left-0 z-50">
            <div className="flex justify-between items-center">
                {/* Логотип */}
                <div className="text-2xl font-bold">
                    <h2>MyApp</h2>
                </div>

                {/* Кнопка меню для мобильных устройств */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white p-2 rounded focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <CloseOutlined style={{ fontSize: '24px' }} />
                        ) : (
                            <MenuOutlined style={{ fontSize: '24px' }} />
                        )}
                    </button>
                </div>

                {/* Кнопки для логина, регистрации и логаута на больших экранах */}
                <div className="hidden lg:flex gap-4 items-center">
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="text-white border border-white px-4 py-2 rounded"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white">{user.email}</span> {/* Email пользователя */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Мобильное меню */}
            <div
                className={`${isMenuOpen ? 'block' : 'hidden'
                    } lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300`}
                onClick={() => setIsMenuOpen(false)} // Закрыть меню при клике на фон
            >
                <div
                    className="bg-gray-800 w-3/4 h-full p-4 rounded-lg transition-transform transform"
                    style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
                >
                    <div className="flex justify-end mb-4">
                        <button onClick={toggleMenu} className="text-white p-2">
                            <CloseOutlined style={{ fontSize: '24px' }} />
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <Link
                            to="/"
                            className="text-white py-2 text-xl"
                            onClick={() => setIsMenuOpen(false)} // Закрыть меню после клика
                        >
                            Home
                        </Link>
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white py-2 text-xl"
                                    onClick={() => setIsMenuOpen(false)} // Закрыть меню после клика
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-white py-2 text-xl"
                                    onClick={() => setIsMenuOpen(false)} // Закрыть меню после клика
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="text-white py-2 text-xl"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
