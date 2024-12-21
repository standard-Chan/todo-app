import { use, useCallback, useEffect, useRef, useState } from 'react';
import { VscDebugRestart } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { FaPause, FaPlay } from "react-icons/fa6";
import './Timer.scss';
import TimerInsert from './TimerInsert';

const Timer = ({todo, timerForTodo, onExitTimer}) => {
  const [time, setTime] = useState({
    id : 0,
    total : 0,
    remaining : 0,
    minutes : 0,
    seconds : 0,
    elapsed : 0,
    inProgress : false,
    lock : false, // 실행 중 true => useEffect 불가
    inPause : false,
  });
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (time.inProgress && !time.lock){
      // lock for other todo start
      setTime(prevTime => {return {...prevTime, lock : true}});

      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          // 시간이 다 되었을 경우
          if (prevTime.remaining < 1 ){
            clearInterval(intervalRef.current);
            return {...prevTime, inProgress: false, lock : false};
          }
          // 시간 tick
          if (prevTime.minutes > 0 && prevTime.seconds <= 0){
            return {...prevTime, remaining: prevTime.remaining -1, elapsed : prevTime.elapsed + 1, minutes: prevTime.minutes-1, seconds: prevTime.seconds+59};
          }
          return {...prevTime, seconds: prevTime.seconds-1, remaining: prevTime.remaining -1, elapsed : prevTime.elapsed + 1};
        })
      }, 1000);
    }
  }, [time])

  useEffect(() => {
    setTime({...time, id : timerForTodo.id})
  }, [timerForTodo]);

  const onPause = useCallback(() => {
    clearInterval(intervalRef.current);
    setTime({...time, inPause : true})
  }, [time]);

  const onPlay = useCallback(() => {
    setTime({...time, inPause:false});

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.remaining < 1 ){
          clearInterval(intervalRef.current);
          return {...prevTime, inProgress: false, lock : false};
        }
        return {...prevTime, remaining: prevTime.remaining -1, elapsed : prevTime.elapsed + 1};
      })
    }, 1000);
  }, [time]);

  const onReset = useCallback(()=> {
    setTime({...time, inProgress : false, lock : false})
  }, [])

  return (
    <div className='Timer'>
      <div className='header'>
        <h3 className='text'>{timerForTodo.text}</h3>
        <div className='exit' onClick={onExitTimer}><RxCross2/></div>
        </div>
      <div className='time'>
        { time.inProgress ? <h2>{`${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`}</h2> : <TimerInsert setTime={setTime}/>
        }
      </div>
      { time.inProgress &&
      (<div className='inProgress'>
        {!time.inPause ? 
        <div className='pause' onClick={onPause}><FaPause /></div> :
        <div className='play' onClick={onPlay}><FaPlay /></div>}
        <div className='reset' onClick={onReset}><VscDebugRestart /></div>
      </div>)
      }
    </div>
  )
};

export default Timer;