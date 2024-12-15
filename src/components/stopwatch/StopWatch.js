import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementTime,
  toggleRunning,
  resetStopwatch,
} from '../../store/stopWatchSlice';
import styles from './stopwatch.module.css';

function Stopwatch() {
  const { time, isRunning, records} = useSelector((state) => state.stopwatch);
  const dispatch = useDispatch();

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(incrementTime());
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.number}>{formatTime(time)}</h1>
      <div className={styles.records} >
      {
        records.map((item, key) => <p key={key} >{formatTime(item)}</p>)
      }
      </div>
    </div>
  );
}

export default Stopwatch;
