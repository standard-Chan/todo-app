import { useCallback, useReducer, useRef, useState } from 'react';
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

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id : nextId.current,
        text : text,
        checked : false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    }, [todos]
  );

  return (
  <div>
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos}/>
    </TodoTemplate>
  </div>);
}

export default App;
