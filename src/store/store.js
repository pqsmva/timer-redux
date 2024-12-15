import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './timerSlice'
import stopwatchReducer from './stopWatchSlice'

export default configureStore({
  reducer: {
    timer: timerReducer,
    stopwatch: stopwatchReducer
  }
})