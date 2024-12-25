import React, { useCallback, useEffect, useRef, useState } from 'react';
import './TimerInsert.scss';
import { FaPlay } from "react-icons/fa6";

const TimerInsert = ({ setTime }) => {
  const [totalTime, setTotalTime] = useState('00:00');

  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.setSelectionRange(5, 5);
  }, []);

  const setCursorPosition = useCallback((e) => {
    inputRef.current.setSelectionRange(5, 5);
  }, []);


  // time 설정
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const minutes = parseInt(totalTime.slice(0, 2)) || 0;
    const seconds = parseInt(totalTime.slice(3, 5)) || 0;
    console.log(minutes, seconds);
    const totalSeconds = minutes * 60 + seconds;
    setTime((prevTimer) => ({
      ...prevTimer,
      total: totalSeconds,
      remaining: totalSeconds,
      minutes: minutes,
      seconds: seconds,
      inProgress: true,
    }));
    e.target.style.backgroundColor = 'gray';
  }, [totalTime, setTime]);

  // input 값 변경
  const onChange = useCallback((e) => {
    // ':' 제거
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 4) {
      const time = value.slice(1);
      setTotalTime(`${time.slice(0, 2)}:${time.slice(2)}`);
    }
    // 숫자가 아닌 값 변경 불가능
    if (value.length > 4 && !isNaN(value)) {
      value = value.slice(0, 4);
    }
  }, []);

  const onClickPlay = useCallback(() => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); // 폼 제출 이벤트 트리거
    }
  }, [])

  return (
    <form className='TimerInsert' onSubmit={onSubmit} ref={formRef}>
      <div className='timerInsert-content'>
        <input
          className='input'
          placeholder='00:00'
          onChange={onChange}
          onClick={setCursorPosition}
          onKeyDown={setCursorPosition}
          value={totalTime}
          ref={inputRef}
        />
      </div>
      <div className='button' onClick={onClickPlay}>
        <FaPlay />
      </div>
    </form>
  );
};

export default TimerInsert;