// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clock from './components/clock/Clock';
import Timer from './components/timer/Timer';
import Stopwatch from './components/stopwatch/StopWatch';
import Header from './components/header/Header';
import { useDispatch } from 'react-redux';
import { setIsRunning } from './store/timerSlice';



function App() {
  const dispatch = useDispatch()
  useEffect(()=> {
    if (sessionStorage.getItem('timerTime') > 0) {
      dispatch(setIsRunning(true))
    }
  }, [])
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Clock />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
}

export default App;
