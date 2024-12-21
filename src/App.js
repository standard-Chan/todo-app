import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import Timer from './components/timer/Timer';
import generateUniqueKey from './utils/hash';

function App() {
  const [todos, setTodos] = useState([
    {
      id : "예시",
      text : "리액트 공부",
      date : null,
      checked : true,
    },
  ]);
  const [keyList, setKeyList] = useState([]);

  // todo timer
  const [timerForTodo, setTimerForTodo] = useState({
    todoId : 0,
    displayed : false,
  })

  // local storage 값 불러오기
  useEffect(()=>{
    const savedKeyList = localStorage.getItem('key');
    if (savedKeyList) {
      const keys = JSON.parse(savedKeyList);
      const storedTodos = keys.map(key => JSON.parse(localStorage.getItem(key)));
      setTodos(storedTodos);
      setKeyList(keys);
    }
  },[]);

  useEffect(()=> {
    const savedTodos = keyList.map(key => localStorage.getItem(key));
    
  }, [keyList]);

  const onInsert = useCallback(
    async text => {
      const date = new Date();
      const currentDate = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
      const uniqueKey = await generateUniqueKey(currentDate, text);
      const todo = {
        id : uniqueKey,
        text : text,
        date : currentDate,
        checked : false,
      };
      // local storage에 저장
      console.log(uniqueKey);
      localStorage.setItem(uniqueKey, JSON.stringify(todo));
      const newKeyList = [...keyList, uniqueKey]
      setKeyList(newKeyList);
      localStorage.setItem('key', JSON.stringify(newKeyList));
      setTodos(todos.concat(todo));
    }, [todos]);

  const onRemove = useCallback(
    id => {
      const removedKeyList = keyList.filter(key => key !== id )
      setTodos(todos.filter(todo => todo.id !== id));
      setKeyList(removedKeyList);
      // localstorage 지우기
      localStorage.removeItem(id);
      localStorage.setItem('key', removedKeyList);
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
