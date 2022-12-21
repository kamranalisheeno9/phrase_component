import React, { useState, useEffect } from "react";
import rightImg from "../assets/right.webp";
import wrongImg from "../assets/wrong.webp";
import wrongSound from "../assets/wrongaction.wav";
import rightSound from "../assets/activitycompletepluck.wav";
import "./Phrase.css";
const Phrase = () => {
  // Phrases Data

  const phrases = [
    {
      text: "Live with gratitude",
      right: "Live with gratitude",
    },
    {
      text: "Live with proud",
      right: "Live with proud",
    },

    {
      text: "be an honest person",
      right: "be an honest person",
    },

    {
      text: "honesty is best policy",
      right: "honesty is best policy",
    },
    {
      text: "do good to people",
      right: "do good to people",
    },
    {
      text: "be kind person",
      right: "be kind person",
    },
    {
      text: "be humble to people",
      right: "be humble to people",
    },
  ];

  // State Variaable Declared

  const [repeatedPhrases, setRepeatedPhrases] = useState([]);
  const [num, setNum] = useState(0);
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [points, setPoints] = useState(0);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finalResult, setFinalResult] = useState(false);

  // Timer Function

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
    if (mins === 4) {
      clearTimeout(timeoutID);
      setFinalResult(true);
    } else if (seconds === 60) {
      setSeconds(0);
      setMins(mins + 1);
    }
  });

  // Random Data Occuring Function

  function newRandomNumber() {
    const newNum = Math.floor(Math.random() * phrases.length);
    setNum(newNum);
  }
  useEffect(() => {
    newRandomNumber();
  }, []);

  // Sound Play Functions

  const wrongPlay = () => {
    new Audio(wrongSound).play();
  };
  const rightPlay = () => {
    new Audio(rightSound).play();
  };

  // Right Answer Function

  const addPoints = (correct) => {
    rightPlay();
    if (correct === phrases[num].text) {
      setPoints(points + 1);

      repeatedPhrases.map((repeated) => {
        if (repeated.text === phrases[num].text) {
          setPoints(points);
        }
      });
    }
    setActive(true);
    {
      phrases
        .filter((phrase) => phrase.text.includes(phrases[num].text))
        .map((filteredPhase) =>
          setRepeatedPhrases((repeated) => [...repeated, filteredPhase])
        );
    }

    setTimeout(() => {
      newRandomNumber();
    }, 1000);

    setTimeout(() => {
      setActive(false);
    }, 2000);
  };

  // Wrong Answer Function

  const Wrong = () => {
    wrongPlay();
    setActive2(true);
    setTimeout(() => {
      newRandomNumber();
    }, 1000);

    setTimeout(() => {
      setActive2(false);
    }, 2000);
  };

  return (
    <>
      {finalResult ? (
        // Showing Final Result Component

        <div className="final_card_container">
          <p> Final Result : {points}</p>
        </div>
      ) : (
        // Main Phrase Component

        <div>
          <div className="points">
            <div>
              {mins} : {seconds}
            </div>
            <span> Ambients : </span> {points} {points <= 1 ? "pt" : "pts"}
          </div>
          <div className="card_done_container">
            <div className={active ? "active done" : "inactive done"}>
              {active ? <img width="50px" src={rightImg} alt="right" /> : <></>}
            </div>
            <div className={active2 ? "active done" : "inactive done"}>
              {active2 ? (
                <img width="50px" src={wrongImg} alt="wrong" />
              ) : (
                <></>
              )}
            </div>
            <div
              className={
                active2 || active
                  ? "card-container activeCard"
                  : "card-container inactiveCard"
              }
            >
              <p className="phrase">{phrases[num].text}</p>
            </div>
          </div>
          <div className="buttons">
            <div className="wrong" onClick={active2 ? null : () => Wrong()}>
              <div className="circle-btn"> X</div>
            </div>
            <p className="or">or</p>
            <div
              className="right"
              onClick={active ? null : () => addPoints(phrases[num].right)}
            >
              <div className="circle-btn"> &#10004;</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Phrase;
