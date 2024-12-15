import React, { useState, useEffect } from 'react';
import styles from './clock.module.css'

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container} >
      <p className={styles.number} >{time.toLocaleTimeString()}</p>
    </div>
  );
}

export default Clock;
