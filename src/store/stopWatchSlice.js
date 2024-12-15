import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  const storedState = sessionStorage.getItem('stopwatchState');
  return storedState ? JSON.parse(storedState) : { time: 0, isRunning: false, records: [] };
};

const saveState = (state) => {
  sessionStorage.setItem('stopwatchState', JSON.stringify(state));
};

const initialState = loadState();

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    incrementTime: (state) => {
      state.time += 1;
      saveState(state);
    },
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
      saveState(state); 
    },
    resetStopwatch: (state) => {
      state.records = [state.time, ...state.records];
      state.time = 0;
      state.isRunning = false;
      saveState(state); 
    },
    lastRecord: (state) => {
      if (state.records.length > 0) {
        state.time = state.records[0];
        state.records = state.records.slice(1); 
        saveState(state); 
      }
    },
  },
});

export const { incrementTime, lastRecord, toggleRunning, resetStopwatch } = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
