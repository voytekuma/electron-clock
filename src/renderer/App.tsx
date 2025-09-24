import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Clock />} />
      </Routes>
    </Router>
  );
}
