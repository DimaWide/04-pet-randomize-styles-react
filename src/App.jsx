import React, { useState } from 'react';
import { Button, Input, List, Slider, Space } from 'antd';
import 'antd/dist/reset.css';
import FontChanger from './components/FontChanger';
import './App.css';

// Функция для генерации случайных чисел в заданном диапазоне
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для генерации случайного пастельного цвета в формате HSL
const getRandomPastelColor = (hueRange, saturationRange, lightnessRange) => {
    const h = getRandomInRange(hueRange[0], hueRange[1]);
    const s = getRandomInRange(saturationRange[0], saturationRange[1]);
    const l = getRandomInRange(lightnessRange[0], lightnessRange[1]);
    return `hsl(${h}, ${s}%, ${l}%)`;
};

const App = () => {
    // Состояние для диапазонов Hue, Saturation и Lightness
    const [hueRange, setHueRange] = useState([190, 200]);
    const [saturationRange, setSaturationRange] = useState([20, 55]);
    const [lightnessRange, setLightnessRange] = useState([20, 70]);

    // Состояние для задач
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    const [currentStyle, setCurrentStyle] = useState({
        backgroundColor: getRandomPastelColor(hueRange, saturationRange, lightnessRange),
        buttonColor: getRandomPastelColor(hueRange, saturationRange, lightnessRange),
        backgroundColor2: getRandomPastelColor(hueRange, saturationRange, lightnessRange),
    });

    // Функция для обновления стилей при клике
    const handleStyleChange = () => {
        setCurrentStyle({
            backgroundColor: getRandomPastelColor(hueRange, saturationRange, lightnessRange),
            backgroundColor2: getRandomPastelColor(hueRange, saturationRange, lightnessRange),
            buttonColor: getRandomPastelColor(hueRange, saturationRange, lightnessRange),
        });
    };

    // Генерация стилей для <style> тега
    const style = `
        .todo-app {
            background-color: ${currentStyle.backgroundColor};
            font-family: Arial, sans-serif;
            font-size: 18px;
         padding: 30px 30px;
            max-width: 600px;
            margin: auto;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .todo-app__title, .ant-empty-description {
            color: ${currentStyle.buttonColor} !important;
            font-weight: 600;
        }
        .todo-app__input input {
            background-color: #e6e6e6;
            border-color: #d1d1d1;
            color: ${currentStyle.buttonColor};
            width: calc(100% - 80px);
        }
        .todo-app__filters button {
            background-color: ${currentStyle.buttonColor};
            border-color: #ccc;
            color: #fff;
            margin-right: 10px;
        }
        .todo-app__input button {
            background-color: ${currentStyle.buttonColor};
            border-color: ${currentStyle.buttonColor};
            color: white;
            width: 80px;
        }
        .todo-app__filters button:hover {
            background-color: ${currentStyle.buttonColor};
        }
        .todo-app__filters button:active {
            background-color: ${currentStyle.buttonColor};
        }
        .todo-app__list-item {
            background-color: ${currentStyle.backgroundColor};
            border-radius: 8px;
            margin-bottom: 10px;
            padding: 10px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .todo-app__list-item-meta {
            color: ${currentStyle.buttonColor};
        }
        .todo-app__delete-button {
            background-color: #f44336;
            border-color: #f44336;
            color: white;
        }
    `;

    // Функция для добавления новой задачи
    const addTask = () => {
        if (taskInput.trim()) {
            const newTask = {
                id: Date.now(),
                text: taskInput,
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setTaskInput(''); // очищаем поле ввода
        }
    };

    // Функция для удаления задачи
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    // Функция для переключения состояния задачи на выполненную/невыполненную
    const toggleTaskCompletion = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="data" style={{ backgroundColor: currentStyle.backgroundColor2 }}>
            <style>{style}</style> {/* Внедрение стилей в тег <style> */}
            <div className="todo-app">
                <h1 className="todo-app__title">Todo App</h1>

                <div className="todo-app__input" style={{ marginBottom: '20px' }}>
                    <Input
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Enter a new task"
                    />
                    <Button type="primary" onClick={addTask} style={{ width: 80 }}>
                        Add
                    </Button>
                </div>

                <div className="todo-app__filters" style={{ margin: '10px 0' }}>
                    <Button type="default" onClick={() => { }}>All</Button>
                    <Button type="default" onClick={() => { }}>Completed</Button>
                    <Button type="default" onClick={() => { }}>Incomplete</Button>
                </div>

                <List
                    dataSource={tasks}
                    renderItem={(task) => (
                        <List.Item key={task.id} className="todo-app__list-item">
                            <List.Item.Meta title={task.text} className="todo-app__list-item-meta" />
                            <Button
                                onClick={() => toggleTaskCompletion(task.id)}
                                style={{ marginRight: '10px' }}
                            >
                                {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                            </Button>
                            <Button
                                danger
                                className="todo-app__delete-button"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </Button>
                        </List.Item>
                    )}
                />
            </div>

            {/* Фиксированный блок с настройками стилей */}
            <div style={{
                position: 'fixed',
                left: '10px',
                bottom: '10px',
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                width: '300px',
            }}>

                <div style={{ marginTop: '20px' }}>
                    <h3>Adjust Color Settings</h3>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {/* Hue */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ flex: 1 }}>Hue Range:</p>
                            <Slider
                                range
                                min={0}
                                max={360}
                                value={hueRange}
                                onChange={setHueRange}
                                style={{ flex: 3 }}
                            />
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: `hsl(${(hueRange[0] + hueRange[1]) / 2}, 100%, 50%)`,
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginLeft: '10px',
                                }}
                            />
                        </div>

                        {/* Saturation */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ flex: 1 }}>Saturation Range:</p>
                            <Slider
                                range
                                min={0}
                                max={100}
                                value={saturationRange}
                                onChange={setSaturationRange}
                                style={{ flex: 3 }}
                            />
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: `hsl(${(hueRange[0] + hueRange[1]) / 2}, ${(saturationRange[0] + saturationRange[1]) / 2}%, 50%)`,
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginLeft: '10px',
                                }}
                            />
                        </div>

                        {/* Lightness */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ flex: 1 }}>Lightness Range:</p>
                            <Slider
                                range
                                min={0}
                                max={100}
                                value={lightnessRange}
                                onChange={setLightnessRange}
                                style={{ flex: 3 }}
                            />
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: `hsl(${(hueRange[0] + hueRange[1]) / 2}, 100%, ${(lightnessRange[0] + lightnessRange[1]) / 2}%)`,
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginLeft: '10px',
                                }}
                            />
                        </div>
                    </Space>


                    <div className="data-b1-btns">
                        <Button type="primary" onClick={handleStyleChange} >
                            Change Styles
                        </Button>

                        <FontChanger />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default App;
