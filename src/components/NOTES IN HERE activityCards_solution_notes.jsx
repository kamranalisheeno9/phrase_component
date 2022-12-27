import React, { useState, useEffect } from "react";
// import rightImg from "../assets/right.webp";
import wrongImg from "../assets/wrong.webp";
import wrongSound from "../assets/wrong-action.m4a";
import rightSound from "../assets/activity-complete-pluck.m4a";
import AnimationPage from '../(ActivityComplete)/activityCompleteAnimation';

import "./activityCards.css";
const Phrase = (props) => {
  // Phrases Data
  // If the phrase is positive answer = 1 else answer = 0
  const phrases = [
    {
      text: "I am grateful",
      answer: 1,
    },
    {
      text: "I am happy",
      answer: 1,
    },
    {
      text: "I am not happy",
      answer: 0,
    },
  ];

  // State Variable Declared

  const [repeatedPhrases, setRepeatedPhrases] = useState([]);
  const [num, setNum] = useState(0);
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [points, setPoints] = useState(0);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [finalResult, setFinalResult] = useState(false);
  const rightImg = "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fright.webp?alt=media&token=14d68897-d349-4921-a286-2246362f3e00"

  // Timer Function

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
    if (mins === 1) {
      clearTimeout(timeoutID);
      setTimeout(() => {
        setFinalResult(true);
      }, 2000);

    } else if (seconds === 60) {
      setSeconds(0);
      setMins(mins + 1);
    }
  });

  // Random Data Occurring Function

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
        <>
          <AnimationPage points={points} />

        </>
      ) : (
        // Main Phrase Component
        <>
          <div>
            <div className="points">
              <div>
                {mins} : {seconds < 10 ? "0" + seconds : seconds}
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
              {/* 
              
              First both buttons should have same function
              The function should should pass two parameters (thePhrase, TheCorrectNum)              
              ex . validateAnswer(thePhrase, TheCorrectNumFoundInDataArray)

              function validateAnswer(thePhrase, TheCorrectNumFoundInDataArray){
                  // check the answer property found for thePhrase
                  // if TheCorrectNumFoundInDataArray === answerProperty Then run the addPoints functions
                  // else run the wrong function 
              }
              */}
              <div className="wrong"
                onClick={active2 ? null : () => Wrong()}



              // call this function instead
              // onClick={active2 ? null : () => validateAnswer(phrases[num].text, 0)}

              >
                <div className="circle-btn"> X</div>
              </div>
              <p className="or">or</p>
              <div
                className="right"
                onClick={active ? null : () => addPoints(phrases[num].right)}


              // call this function instead
              // onClick={active ? null : () => validateAnswer(phrases[num].text, 1)}
              >
                <div className="circle-btn"> &#10004;</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Phrase;
