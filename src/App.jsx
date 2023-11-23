import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const getNextYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear + 1;
  };

  const calculateTimeLeft = () => {
    const year = getNextYear();
    const difference = +new Date(`01/01/${year}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(getNextYear()); // This line will set the 'year' variable

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const resetCountdown = () => {
    setTimeLeft(calculateTimeLeft());
  };

  return (
    <main className="countdown-container">
      <h1>Countdown to {year}</h1> { /* Now 'year' is defined so it should not give error */ }
      <h1>Please click on the comment button to leave a comment.</h1>
      <div className="countdown">
        {Object.keys(timeLeft).map(interval => (
          <div className="countdown-element" key={interval}>
            <div className="countdown-time">{timeLeft[interval]}</div>
            <div className="countdown-label">{interval.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <button onClick={resetCountdown} className="reset-button">Reset Countdown</button>

      <a href="comment.html" className="comment-link" style={{ color: 'blue' }}>Go to Comments</a>


      {/* Fireworks added here */}
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
    </main>
  );
}
