import React, { useState, useEffect } from "react";
import rightImg from "../assets/right.webp";
import wrongImg from "../assets/wrong.webp";
import wrongSound from "../assets/wrongaction.wav";
import rightSound from "../assets/activitycompletepluck.wav";
import AnimationPage from "./activityCompleteAnimation";

import "./activityCards.css";
const Phrase = () => {
  // Phrases Data
  // Array is updated with new element of image "themeImage"
  const phrases = [
    {
      text: "I am grateful",
      answer: 1,
      themeImage:
        "https://static.vecteezy.com/system/resources/previews/009/268/713/original/yellow-emoji-face-reaction-illustration-free-png.png",
    },
    {
      text: "I am happy",
      answer: 1,
      themeImage:
        "https://images.pngnice.com/download/2007/Sunglasses-Emoji-PNG-Download-Image.png",
    },
    {
      text: "I am not happy",
      answer: 0,
      themeImage:
        "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55893/angry-face-emoji-clipart-xl.png",
    },
  ];

  // State Variable Declared

  const [repeatedPhrases, setRepeatedPhrases] = useState([]);
  const [num, setNum] = useState(0);
  // New States Added For Accuracy and Wrong 12/29/2022
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  
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
    if (mins === 1) {
      clearTimeout(timeoutID);
      setFinalResult(true);
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

  // Answer Function
  // Complete answer section is update so replace 'right and wrong functions section' with 'answer section' also update function of buttons on lines 185 and 204 by changing 'onClick function' .
  const validateAnswer = (thePhrase, TheCorrectNum, ButtonBehaviour) => {

    // Function Conditions For Accuracy and Wrong 12/29/2022 
    if (wrongAnswer === 0) {
      setAccuracy(1 * 100);
    } else {
      setAccuracy((points / (wrongAnswer + points).toFixed(2)) * 100);
    }

    if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 1 &&
      ButtonBehaviour === 1
    ) {
      setPoints(points + 1);
      setActive(true);
      rightPlay();
      setTimeout(() => {
        setActive(false);
      }, 2000);
    } else if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 0 &&
      ButtonBehaviour === 1
    ) {
      setActive2(true);
      setWrongAnswer(wrongAnswer + 1);
      wrongPlay();
      setTimeout(() => {
        newRandomNumber();
      }, 1000);

      setTimeout(() => {
        setActive2(false);
      }, 2000);
    } else if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 0 &&
      ButtonBehaviour === 0
    ) {
      setPoints(points + 1);
      setActive(true);
      rightPlay();
      setTimeout(() => {
        setActive(false);
      }, 2000);
    } else if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 1 &&
      ButtonBehaviour === 0
    ) {
      setActive2(true);
      setWrongAnswer(wrongAnswer + 1);
      wrongPlay();
      setTimeout(() => {
        newRandomNumber();
      }, 1000);

      setTimeout(() => {
        setActive2(false);
      }, 2000);
    }

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
  };

  return (
    <>
      {finalResult ? (
        // Showing Final Result Component
        <>
          <AnimationPage points={points} accuracy={accuracy} />
        </>
      ) : (
        // Main Phrase Component
        <>
          <div>
            <div className="points">
              <div>
                {mins} : {seconds}
              </div>
              <span> Ambients : </span> {points} {points <= 1 ? "pt" : "pts"}
            </div>
            <div className="card_done_container">
              <div className={active ? "active done" : "inactive done"}>
                {active ? (
                  <img width="50px" src={rightImg} alt="right" />
                ) : (
                  <></>
                )}
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
                {/* Added Theme Image Container */}
                <div className="theme_image">
                  <img src={phrases[num].themeImage} alt="theme_image" />
                </div>
              </div>
            </div>
            <div className="buttons">
              {/* Onclick Function is Updated */}

              <div
                className="wrong"
                onClick={
                  active2
                    ? null
                    : () =>
                        validateAnswer(
                          phrases[num].text,
                          phrases[num].answer,
                          0
                        )
                }
              >
                <div className="circle-btn"> X</div>
              </div>
              <p className="or">or</p>
              {/* Onclick Function is Updated */}
              <div
                className="right"
                onClick={
                  active
                    ? null
                    : () =>
                        validateAnswer(
                          phrases[num].text,
                          phrases[num].answer,
                          1
                        )
                }
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
