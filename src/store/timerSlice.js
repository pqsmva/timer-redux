import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    time: sessionStorage.getItem('timerTime') || 0, 
    isRunning: false,
  },
  reducers: {
    incrementTime: (state, action) => {
      state.time += action.payload; 
    },
    decrementTime: (state, action) => {
      state.time = Math.max(state.time - action.payload, 0);
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    resetTimer: (state) => {
      state.time = 0;
      state.isRunning = false;
    },
    tick: (state) => {
      if (state.time > 0) {
        state.time -= 1;
      }
      if (state.time === 0) {
        state.isRunning = false;
      }
    },
  },
});

export const { incrementTime, decrementTime, setIsRunning, resetTimer, tick } = timerSlice.actions;

export default timerSlice.reducer;
