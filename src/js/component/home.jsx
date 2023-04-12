import React, { useState, useEffect } from "react";

const Home = () => {
  const [light, setLight] = useState("red");
  const [isCycling, setIsCycling] = useState(false);
  const [timeUntilNextCycle, setTimeUntilNextCycle] = useState(0);
  const [showPurpleLight, setShowPurpleLight] = useState(false);

  const handleOn = (changelight) => {
    if (light === changelight) {
      setLight("off");
    } else {
      setLight(changelight);
    }
  };

  const handleCycle = () => {
    setIsCycling(!isCycling);
    setTimeUntilNextCycle(0);
    };

  const handleHidePurpleLight = () => {
    setShowPurpleLight(!showPurpleLight);
  };

  useEffect(() => {
    let intervalId;

    if (isCycling) {
      intervalId = setInterval(() => {
        switch (light) {
          case "red":
            setLight("green");
            setTimeUntilNextCycle(10);
            break;
          case "green":
            setLight("yellow");
            setTimeUntilNextCycle(3);
            break;
          case "yellow":
            setLight("red");
            setTimeUntilNextCycle(5);
            break;
          default:
            setLight("red");
            setTimeUntilNextCycle(5);
            break;
        }
      }, timeUntilNextCycle * 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isCycling, light, timeUntilNextCycle]);

  const countdown = () => {
    if (timeUntilNextCycle > 0) {
      setTimeUntilNextCycle(timeUntilNextCycle - 1);
    }
  };

  useEffect(() => {
    let intervalId;

    if (timeUntilNextCycle > 0) {
      intervalId = setInterval(countdown, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timeUntilNextCycle]);

  return (
    <div className="container">
      <div className="stick"></div>
      <div className="traffic-light" style={{ height: showPurpleLight ? "550px" : "420px" }}>
        <div className="traffic_light_center">
          <div
            className={
              light === "red"
                ? "lights_red lights_red_selected"
                : "lights_red"
            }
            onClick={() => {
              handleOn("red");
            }}
          ></div>
        </div>
        <div className="traffic_light_center">
          <div
            className={
              light === "yellow"
                ? "lights_yellow lights_yellow_selected"
                : "lights_yellow"
            }
            onClick={() => {
              handleOn("yellow");
            }}
          ></div>
        </div>
        <div className="traffic_light_center">
          <div
            className={
              light === "green"
                ? "lights_green lights_green_selected"
                : "lights_green"
            }
            onClick={() => {
              handleOn("green");
            }}
          ></div>
        </div>
        {showPurpleLight && (
          <div className="traffic_light_center">
            <div
              className={
                light === "purple"
                  ? "lights_purple lights_purple_selected"
                  : "lights_purple"
              }
              onClick={() => {
                handleOn("purple");
              }}
            ></div>
          </div>
        )}
        
        <div className="traffic_light_center">
        <button onClick={handleHidePurpleLight}>
    Toggle Purple Light
  </button>
      <button onClick={handleCycle}>
        {isCycling ? (
          <>
            Stop Cycling ({timeUntilNextCycle}s)
          </>
        ) : (
          "Start Cycling"
        )}
      </button>
    </div>
  </div>
</div>
  );
};

export default Home;