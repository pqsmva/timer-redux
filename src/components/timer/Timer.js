import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementTime,
  decrementTime,
  setIsRunning,
  resetTimer,
  tick,
} from '../../store/timerSlice';
import styles from './timer.module.css';

function Timer() {
  const { time, isRunning } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  const startTimer = () => {
    dispatch(setIsRunning(true));
  };

  const reset = () => {
    dispatch(resetTimer());
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  useEffect(()=> {
    sessionStorage.setItem('timerTime', time)
  }, [time])
  useEffect(()=> {
    sessionStorage.setItem('timerIsRun', isRunning)
  }, [isRunning])

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const formattedTime = formatTime(time);

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <div>
          <div className={styles.block}>
            <p className={styles.number}>{formattedTime.hours} 
               {isRunning && ":"}
            </p>
            {!isRunning && <div className={styles.controller}>
              <button
                className={styles.controlbutton}
                onClick={() => dispatch(incrementTime(3600))}
              >
                +
              </button>
              <button
                className={styles.controlbutton}
                onClick={() => dispatch(decrementTime(3600))}
              >
                -
              </button>
            </div>}

          </div>
        </div>
        <div>
          <div className={styles.block}>
            <p className={styles.number}>{formattedTime.minutes}       {isRunning && ":"}</p>
            {!isRunning && <div className={styles.controller}>
              <button
                className={styles.controlbutton}
                onClick={() => dispatch(incrementTime(60))}
              >
                +
              </button>
              <button
                className={styles.controlbutton}
                onClick={() => dispatch(decrementTime(60))}
              >
                -
              </button>
            </div>}
          </div>
        </div>
        <div>
          <div className={styles.block}>
            <p className={styles.number}>{formattedTime.seconds}</p>
            {!isRunning && <div className={styles.controller}>
              <button
                className={styles.controlbutton}
                onClick={() => dispatch(incrementTime(1))}
              >
                +
              </button>
              <button
                className={styles.controlbutton}
                onClick={() => dispatch(decrementTime(1))}
              >
                -
              </button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
