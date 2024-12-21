import { useCallback, useState } from 'react';
import './TimerInsert.scss';

const TimerInsert = ({setTimer}) => {
  const [totalTime, setTotalTime] = useState(0);

  const onSubmit = useCallback(e => {
    setTimer((preTimer) => {
      return {...preTimer, total : Number(totalTime), remaining : Number(totalTime), inProgress : true };
    })
    e.preventDefault();
    e.target.style.backgroundColor = 'gray';
  }, )

  const onChange = useCallback(e => {
    if (!isNaN(e.target.value)){
      setTotalTime(e.target.value);
    }
  });

  return (
    <form className='TimerInsert' onSubmit={onSubmit}>
      <input className='input' placeholder='초 입력' onChange={onChange} value={totalTime}></input>
      <button className='button' type='submit'>start</button>
    </form>
  )
}

export default TimerInsert;