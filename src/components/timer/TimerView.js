import React from 'react';
import PropTypes from 'prop-types';
import './TimerView.scss';

const TimerView = ({ time, onPause, onPlay}) => {
  const formatTime = (minutes, seconds) => {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalSeconds = time.total;
    const remainingSeconds = time.remaining;
    return (remainingSeconds / totalSeconds) * 100;
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = calculateProgress();
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`TimerView ${time.inPause ? 'paused' : 'running'}`}>
      <svg className='progress'>
        <circle
          className='progress-circle'
          onClick={time.inPause ? onPlay : onPause}
          stroke={!time.inPause ? "skyBlue" : "rgb(4, 34, 83)"}
          strokeWidth="10"
          fill='transparent'
          cx={172}
          cy={122}
          r={radius}
          transform="rotate(-90 172 122)"
          style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: offset }}
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".5em" className='time-display-text'>
          {formatTime(time.minutes, time.seconds)}
        </text>
      </svg>
    </div>
  );
};

TimerView.propTypes = {
  time: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default TimerView;