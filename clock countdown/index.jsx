import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timerId;
    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    const totalSeconds =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    setTimeLeft(totalSeconds);
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleHours = (value) => {
    if (value > 12) value = 12;
    if (value < 0) value = 0;
    setHours(value);
  };

  const handleMinutes = (value) => {
    if (value > 60) value = 60;
    if (value < 0) value = 0;
    setMinutes(value);
  };

  const handleSeconds = (value) => {
    if (value > 60) value = 60;
    if (value < 0) value = 0;
    setSeconds(value);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs < 10 ? "0" : ""}${hrs}:${mins < 10 ? "0" : ""}${mins}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>Dynamic Countdown Timer</h2>

      {!isActive && (
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            value={hours}
            onChange={(e) => handleHours(Number(e.target.value))}
            placeholder="Hours"
            min="0"
            max="12"
            style={{ width: "60px", marginRight: "5px" }}
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => handleMinutes(Number(e.target.value))}
            placeholder="Minutes"
            min="0"
            max="60"
            style={{ width: "60px", marginRight: "5px" }}
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => handleSeconds(Number(e.target.value))}
            placeholder="Seconds"
            min="0"
            max="60"
            style={{ width: "60px" }}
          />
        </div>
      )}

      <h1>{formatTime(timeLeft)}</h1>

      {!isActive ? (
        <button onClick={startTimer} style={{ marginRight: "5px" }}>
          Start
        </button>
      ) : (
        <button
          onClick={() => setIsActive(false)}
          style={{ marginRight: "5px" }}
        >
          Pause
        </button>
      )}
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default CountdownTimer;
