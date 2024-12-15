
import React from 'react';
import { Link, NavLink, useLocation, useNavigation, useParams, useRoutes } from 'react-router-dom';
import styles from '../header/header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementTime,
  toggleRunning,
  resetStopwatch,
  lastRecord,
} from '../../store/stopWatchSlice';
import { resetTimer, setIsRunning } from '../../store/timerSlice';
function Header() {
  const path = useLocation().pathname
  const { time, isRunning, records } = useSelector((state) => state.stopwatch);
  const timerSlicer = useSelector((state) => state.timer);

  const dispatch = useDispatch();

  const handleTime = () => {
    if (path == '/stopwatch') {
      if (isRunning) {
        return dispatch(resetStopwatch())
      }
      dispatch(toggleRunning())
    } else if (path == '/timer') {

      if (timerSlicer.time > 0) {
        dispatch(setIsRunning(!timerSlicer.isRunning))
      } else {
        alert('Time should be >> 0')
      }

    }
  }

  const resetToLast = () => {
    dispatch(lastRecord())
    dispatch(toggleRunning())
  }

  const pause = () => {
    dispatch(setIsRunning(false))
    dispatch(resetTimer())
  }


  return (
    <nav >
      <ul className={styles.container} >
        <li><NavLink className={({ isActive }) => isActive ? `active ${styles.link}` : styles.link} to="/">Saat</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? `active ${styles.link}` : styles.link} to="/stopwatch">Saniyəölçən</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? `active ${styles.link}` : styles.link} to="/timer">Taymer</NavLink></li>
        {/* <li><button onClick={handleTime} >{((path == '/stopwatch' && !isRunning) || !timerSlicer.isRunning) ? '▶' : path=='/stopwatch' && !isRunning && '❚❚'}</button></li> */}
        <li><button onClick={handleTime} >{
          (path == '/stopwatch' ? (isRunning?'❚❚':'▶') : path == '/timer' && (timerSlicer.isRunning?'❚❚':'▶') )
          }</button></li>

        {path=='/timer' &&<li><button disabled={timerSlicer.isRunning ? false : true} onClick={pause} >⏹</button></li>}
        { path=='/stopwatch' &&  <li><button disabled={isRunning?true:false} onClick={resetToLast} >↻</button></li>}
      </ul>
    </nav>
  )
}

export default Header;
