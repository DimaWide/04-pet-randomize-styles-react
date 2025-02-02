import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Input, List, Space, message } from 'antd';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://dev.todo/api/tasks', {
                withCredentials: true, // Убедитесь, что куки отправляются с запросом
            });
            setTasks(response.data);
        } catch (error) {
            message.error('Error fetching tasks');
        }
    };

    const addTask = async () => {
        if (newTask.trim() === '') return;

        const task = { title: newTask, completed: false };

        try {
            const response = await axios.post('http://dev.todo/api/tasks', task, {
                withCredentials: true, // Убедитесь, что куки отправляются с запросом
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setTasks(prevTasks => [...prevTasks, response.data]);
            setNewTask('');
        } catch (error) {
            message.error('Error adding task');
        }
    };

    const toggleComplete = async (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        const updatedTask = { ...task, completed: !task.completed };

        try {
            const response = await axios.put(`http://dev.todo/api/tasks/${taskId}`, updatedTask, {
                withCredentials: true, // Убедитесь, что куки отправляются с запросом
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? updatedTask : t));
        } catch (error) {
            message.error('Error updating task');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://dev.todo/api/tasks/${taskId}`, {
                withCredentials: true, // Убедитесь, что куки отправляются с запросом
            });
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            message.error('Error deleting task');
        }
    };
    
    console.log( Array.isArray(tasks) )

    const filteredTasks = (Array.isArray(tasks) && tasks.length > 0) 
    ? tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true; // Default: return all tasks
    }) 
    : []; // Если tasks не массив или пустой массив, то возвращаем пустой массив

    console.log(tasks)

    const completedCount = Array.isArray(tasks) ?? tasks.filter(task => task.completed).length;
    const remainingCount = tasks.length - completedCount;

    return (
        <div className="todo-app-out">
            <div className="todo-app" style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
                <h1 className="todo-app__title">Todo App</h1>
                <div className="todo-app__input">
                    <Input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter a new task"
                        style={{ width: 'calc(100% - 80px)', marginBottom: 10 }}
                    />
                    <Button type="primary" onClick={addTask} style={{ width: 80 }}>
                        Add
                    </Button>
                </div>

                <div className="todo-app__filters" style={{ margin: '10px 0' }}>
                    <Button type={filter === 'all' ? 'default' : 'text'} onClick={() => setFilter('all')}>
                        All
                    </Button>
                    <Button type={filter === 'completed' ? 'default' : 'text'} onClick={() => setFilter('completed')}>
                        Completed
                    </Button>
                    <Button type={filter === 'incomplete' ? 'default' : 'text'} onClick={() => setFilter('incomplete')}>
                        Incomplete
                    </Button>
                </div>

                <div className="todo-app__counts">
                    <Space>
                        <span>Remaining tasks: {remainingCount}</span>
                        <span>Completed tasks: {completedCount}</span>
                    </Space>
                </div>

                <List
                    dataSource={filteredTasks}
                    renderItem={(task) => (
                        <List.Item key={task.id} actions={[
                            <Button onClick={() => toggleComplete(task.id)}>
                                {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                            </Button>,
                            <Button danger onClick={() => deleteTask(task.id)}>Delete</Button>
                        ]}>
                            <List.Item.Meta
                                avatar={<Checkbox checked={task.completed} onChange={() => toggleComplete(task.id)} />}
                                title={task.title}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default App;
