import { useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function App() {
  const [todos, setTodos] = useState([
    {
      id : 1,
      text : '할 일 1',
      checked : true,
    },
    {
      id : 2,
      text : '리액트',
      checked : false,
    },
    {
      id : 3,
      text : '집 알아보기',
      checked : true,
    }
  ]);
  return (
  <div>
    <TodoTemplate>
      <TodoInsert/>
      <TodoList todos={todos}/>
    </TodoTemplate>
  </div>);
}

export default App;
