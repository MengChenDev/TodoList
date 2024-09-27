import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import './TodoList.css';
import { useImmer } from 'use-immer';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

function TodoList() {
  const [todos, updateTodos] = useImmer<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    // 初始化数据
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: 'Learn TypeScript', done: true },
      { id: 2, text: 'Learn React', done: false },
      { id: 3, text: 'Learn Vite', done: false },
    ];
  });

  const [newTodoText, setNewTodoText] = useState('');

  // TodoList更新时自动保存数据到localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加新Todo
  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: newTodoText,
        done: false,
      };
      updateTodos(draft => {
        draft.push(newTodo);
      });
      setNewTodoText('');
    }
  };

  // 设置Todo内容
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(event.target.value);
  };

  // 添加Todo
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <Item key={todo.id} todo={todo} updateTodos={updateTodos} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;