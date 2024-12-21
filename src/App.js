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

  // id가 겹칠 수가 있음. 그래서 이후에 수정이 필요함.
  const nextId = useRef(todos.length + 1);
  
  const onInsert = useCallback(
    text => {
      const todo = {
        id : nextId.current,
        text : text,
        checked : false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
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
