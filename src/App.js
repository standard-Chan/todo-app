import { useCallback, useReducer, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import Timer from './components/timer/Timer';

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
  ]);

  const [timerForTodo, setTimerForTodo] = useState({
    todoId : 0,
    displayed : false,
  })

  // hash 함수 : 현재 날짜와 업무 내용으로 키 생성
  const generateUniqueKey = async (date, str) => {
    const input = `${date}-${str}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const onInsert = useCallback(
    async text => {
      const currentDate = new Date().toISOString();
      const uniqueKey = await generateUniqueKey(currentDate, text);
      const todo = {
        id : uniqueKey,
        text : text,
        checked : false,
      };
      setTodos(todos.concat(todo));
    }, [todos]);

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id))
    }, [todos]);

  const onToggle = useCallback(id => {
    console.log('toggle');
    const updatedTodo = todos.map(todo => 
      todo.id === id ? {...todo, checked: !todo.checked} : todo
    )
    setTodos(updatedTodo);
  }, [todos])

  const onStart = useCallback(todo => {
    setTimerForTodo({
      id : todo.id,
      text : todo.text,
      displayed : true,
    })
  }, [timerForTodo]);

  const onExitTimer = useCallback(() => {
    setTimerForTodo({
      ...timerForTodo,
      displayed : false,
    })
  }, [timerForTodo]);

  return (
  <div>
    <TodoTemplate>
      {timerForTodo.displayed && <Timer timerForTodo={timerForTodo} onExitTimer={onExitTimer}/>}
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onStart={onStart}/>
    </TodoTemplate>
  </div>);
}

export default App;
