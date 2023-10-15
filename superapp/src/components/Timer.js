import React, { useEffect, useState } from "react";
import "../styles/Timer.css";
import uparrow from "../images/up.png";
import downarrow from "../images/down.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import tune from "../images/tune.mp3";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [newTotalSeconds, setNewTotalSeconds] = useState(0);

  const audioRef = React.createRef();

  const startTimer = () => {
    const totalSeconds =
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10);

    console.log("totalSeconds", totalSeconds);
    setNewTotalSeconds(totalSeconds);
    setStartTime(Date.now() + totalSeconds * 1000);
    console.log("newtotalSeconds", newTotalSeconds);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    console.log("timerRunning", timerRunning);
    console.log("newtotalSeconds", newTotalSeconds);
    audioRef.current.play();
    setTimerRunning(false);
    setNewTotalSeconds(0);
    console.log("timerRunningafter", timerRunning);
    console.log("newTotalseconds", newTotalSeconds);
    setHours("00");
    setMinutes("00");
    setSeconds("00");
  };

  useEffect(() => {
    let interval;

    if (timerRunning && startTime) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, startTime - currentTime);
        console.log("startTime", startTime);
        console.log("remainingTime", remainingTime);

        if (remainingTime > 0) {
          const h = Math.floor(remainingTime / 3600000);
          const m = Math.floor((remainingTime % 3600000) / 60000);
          const s = Math.floor((remainingTime % 60000) / 1000);
          console.log("remainingTime", remainingTime);
          setHours(h.toString().padStart(2, "0"));
          setMinutes(m.toString().padStart(2, "0"));
          setSeconds(s.toString().padStart(2, "0"));
        } else {
          clearInterval(interval);
          console.log("timerrunning", timerRunning);
          setTimerRunning(false);
          console.log("timeRrunning", timerRunning);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        console.log("timeRrunning", timerRunning);
      }
    };
  }, [timerRunning, startTime]);

  const increment = (stateSetter, maxValue) => {
    stateSetter((prevValue) => {
      let newValue = parseInt(prevValue, 10) + 1;
      newValue = newValue > maxValue ? maxValue : newValue;
      return newValue.toString().padStart(2, "0");
    });
  };
  const decrement = (stateSetter, minValue) => {
    stateSetter((prevValue) => {
      let newValue = parseInt(prevValue, 10) - 1;
      newValue = newValue < minValue ? minValue : newValue;
      return newValue.toString().padStart(2, "0");
    });
  };

  return (
    <div className="timer-section">
      <div className="timer-display">
        <div className="circle-timer">
          <CountdownCircleTimer
            isPlaying={timerRunning}
            duration={newTotalSeconds}
            strokeWidth={6}
            size={160}
            colors={[["#FF6A6A"]]}
            onComplete={stopTimer}
          >
            {({ remainingTime }) => (
              <div>
                <div>
                  {remainingTime >= 0
                    ? `${Math.floor(remainingTime / 3600)
                        .toString()
                        .padStart(2, "0")}:${Math.floor(
                        (remainingTime % 3600) / 60
                      )
                        .toString()
                        .padStart(2, "0")}:${(remainingTime % 60)
                        .toString()
                        .padStart(2, "0")}`
                    : "00:00:00"}
                </div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className="timer-inputs">
        <div className="hours-area">
          <h3>Hours</h3>
          <button onClick={() => increment(setHours, 99)}>
            <img src={uparrow} alt="uparrow"></img>
          </button>
          {hours.toString().padStart(2, "0")}
          <button onClick={() => decrement(setHours, 0)}>
            <img src={downarrow} alt="downarrow"></img>
          </button>
        </div>
        <h1>:</h1>
        <div className="minutes-area">
          <h3>Minutes</h3>
          <button onClick={() => increment(setMinutes, 59)}>
            <img src={uparrow} alt="uparrow"></img>
          </button>
          {minutes.toString().padStart(2, "0")}
          <button onClick={() => decrement(setMinutes, 0)}>
            <img src={downarrow} alt="downarrow"></img>
          </button>
        </div>
        <h1>:</h1>
        <div className="seconds-area">
          <h3>Seconds</h3>
          <button onClick={() => increment(setSeconds, 59)}>
            <img src={uparrow} alt="uparrow"></img>
          </button>
          {seconds.toString().padStart(2, "0")}
          <button onClick={() => decrement(setSeconds, 0)}>
            <img src={downarrow} alt="downarrow"></img>
          </button>
        </div>
        <button className="start-btn" onClick={startTimer}>
          Start
        </button>
        <audio ref={audioRef} src={tune} />
      </div>
    </div>
  );
};

export default Timer;
