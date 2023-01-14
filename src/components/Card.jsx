"use client";

import React, { useState, useEffect } from "react";
import AnimationPage from "./activityCompleteAnimation";

// 13 -14 January 2023 Update => Kamran --- From

import Open_heart_img from "../assets/open_heart.webp";
import Close_heart_img from "../assets/close_heart.webp";
// 13 -14 January 2023 Update => Kamran --- From

import "./Card.css";

const Card = () => {
  // Phrases Data

  const [phrases, setPhrases] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://ambiencelife-api-us.com/v1/api/gen/cards"
      );
      const data = await response.json();
      setPhrases(data);
    }
    fetchData();
  }, []);

  // State Variable Declared

  const [repeatedPhrases, setRepeatedPhrases] = useState([]);
  const [num, setNum] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  // 13 -14 January 2023 Update => Kamran --- From

  const [active3, setActive3] = useState(false);
  const [wait, setWait] = useState(false);

  // 13 -14 January 2023 Update => Kamran --- To

  const [points, setPoints] = useState(0);

  // Timer Constants
  const [mins, setMins] = useState(4);
  const [seconds, setSeconds] = useState(0);
  const [finalResult, setFinalResult] = useState(false);

  const [users, setUsers] = useState(["Dom", "Mic", "John", "Nick", "Daniel"]);
  const [currentUser, setCurrentUser] = useState("Jack");
  const [bonusPoints, setBonusPoints] = useState(0);

  // 13 -14 January 2023 Update => Kamran

  const [openHeart, setOpenHeart] = useState(false);

  //
  // Images
  const correctImg =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fimage-correct.webp?alt=media&token=14d68897-d349-4921-a286-2246362f3e00";
  const incorrectImg =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fimage-incorrect.webp?alt=media&token=01353005-f9b2-4999-91ed-25c3a019a810";

  // Sounds
  const correctSound =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fcorrect-action.m4a?alt=media&token=9690f66f-916e-48c0-a94c-813cab94691a";
  const incorrectSound =
    "https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/sounds%2Fsounds_actions%2Fincorrect-action.m4a?alt=media&token=e2bd36ac-0967-41dc-b959-0359471e575c";

  // Timer Function

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
    if (mins === 0 && seconds === -1) {
      clearTimeout(timeoutID);
      setFinalResult(true);
    } else if (seconds === -1) {
      setSeconds(59);
      setMins(mins - 1);
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

  const incorrectPlay = () => {
    new Audio(incorrectSound).play();
  };
  const correctPlay = () => {
    new Audio(correctSound).play();
  };

  // Answer Function
  const validateAnswer = (thePhrase, TheCorrectNum, ButtonBehaviour) => {
    if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 1 &&
      ButtonBehaviour === 1
    ) {

      setPoints(points + 1);
      setActive(true);
      correctPlay();
      // 13 -14 January 2023 Update => Kamran ---- From
      setWait(true)

      setOpenHeart(true);
      setTimeout(() => {
        setActive3(true);
      }, 2000);
      setTimeout(() => {
        setActive(false);
        setOpenHeart(false);
        setActive3(false);
      setWait(false)



      }, 4000);

      // 13 -14 January 2023 Update => Kamran ---- To
    } else if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 0 &&
      ButtonBehaviour === 1
    ) {
      setIncorrectAnswer(incorrectAnswer + 1);

      setActive2(true);
      // 13 -14 January 2023 Update => Kamran --- From
        setWait(true)
      setOpenHeart(true);

      incorrectPlay();
      setTimeout(() => {
        newRandomNumber();
      }, 4000);

      //
      setTimeout(() => {
        setActive3(true);
      }, 2000);
      setTimeout(() => {
        setOpenHeart(false);
        setActive2(false);
        setActive3(false);
        setWait(false)

      }, 4000);

      // 13 -14 January 2023 Update => Kamran --- To
    } else if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 0 &&
      ButtonBehaviour === 0
    ) {
      setPoints(points + 1);
      setActive(true);
      correctPlay();
      // 13 -14 January 2023 Update => Kamran --- From
        setWait(true)
      setTimeout(() => {
        setActive3(true);
      }, 2000);
      setTimeout(() => {
        setActive(false);
        setActive3(false);
        setWait(false)

      }, 4000);
      // 13 -14 January 2023 Update => Kamran --- To
    } else if (
      thePhrase === phrases[num].text &&
      TheCorrectNum === 1 &&
      ButtonBehaviour === 0
    ) {
      setIncorrectAnswer(incorrectAnswer + 1);
      setActive2(true);

      incorrectPlay();
      setTimeout(() => {
        newRandomNumber();
      }, 4000);
      // 13 -14 January 2023 Update => Kamran --- From
      setWait(true)

      setTimeout(() => {
        setActive3(true);
      }, 2000);
      setTimeout(() => {
        setActive2(false);
        setActive3(false);
        setWait(false)

      }, 4000);
      // 13 -14 January 2023 Update => Kamran --- To
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
    }, 4000);
  };

  useEffect(() => {
    if (incorrectAnswer === 0 && points === 0) {
      setAccuracy(0 * 100);
    } else {
      let accuracyDecimal = (
        (points / (incorrectAnswer + points)) *
        100
      ).toFixed(2);
      setAccuracy(accuracyDecimal);
    }
  }, [incorrectAnswer, points]);

  useEffect(() => {
    // Convert The array and current user into lower case

    const lowerArray = users.map((element) => {
      return element.toLowerCase();
    });
    setCurrentUser(currentUser.toLocaleLowerCase());

    if (lowerArray.includes(currentUser.toLocaleLowerCase())) {
      setPoints(points + 2);
      setBonusPoints(2);
    } else if (!lowerArray.includes(currentUser.toLocaleLowerCase())) {
      setBonusPoints(11);
      setPoints(points + 11);
    }
    console.log("Users", users);
    console.log("Current User", currentUser);
  }, []);

  return (
    <>
      {finalResult ? (
        // Showing Final Result Component
        <>
          <AnimationPage
            points={points}
            accuracy={accuracy}
            bonus={bonusPoints}
          />
        </>
      ) : (
        // Main Phrase Component
        <>
          <div>
            <div className="points">
              <div>
                {mins} : {seconds < 10 ? "0" + seconds : seconds}
              </div>
              <span> ambients: {points}</span>
            </div>
            <div className="card_done_container">
              <div className={active ? "active done" : "inactive done"}>
                {active ? (
                  <>
                    <img width="50px" src={correctImg} alt="correct" />
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className={active2 ? "active done" : "inactive done"}>
                {active2 ? (
                  <img width="50px" src={incorrectImg} alt="incorrect" />
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
                {/* Added Theme Image Container */}
                <div className="card_wrapper">
                  <div className="theme_image">
                    {num >= 0 && num < phrases.length ? (
                      <img src={phrases[num].themeImage} alt="theme_image" />
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="phrase">
                    {num >= 0 && num < phrases.length ? phrases[num].text : ""}
                  </p>
                </div>
              </div>

              {/* 13-14 January Update Kamran */}

              <div
                className={active3 ? " active3" : "card-container-2 inactive3 "}
              >
                {/* Added Theme Image Container */}
                <div className="card_wrapper">
                  <div className="theme_image">
                    {num >= 0 && num < phrases.length ? (
                      <img src={phrases[num].themeImage} alt="theme_image" />
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="phrase">
                    {num >= 0 && num < phrases.length ? phrases[num].text : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="buttons">
              {/* Onclick Function is Updated */}

              <div
                className="incorrect"
                onClick={
                  wait
                    ? null
                    : () =>
                        validateAnswer(
                          phrases[num].text,
                          phrases[num].answer,
                          0
                        )
                }
              >
                <div className="circle-btn">
                  <img src="https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Ftrash-open-partial.svg?alt=media&token=c4fb11e5-2979-4a9f-8360-d83bbd7bf1ab" />
                </div>
              </div>
              <p className="or">or</p>
              {/* Onclick Function is Updated */}
              <div
                className="correct"
                onClick={
                    wait
                    ? null
                    : () =>
                        validateAnswer(
                          phrases[num].text,
                          phrases[num].answer,
                          1
                        )
                }
              >
                <div className="circle-btn">
                  {/*  13 -14 January 2023 Update => Kamran ----> Cards.css is also updated */}

                  {openHeart ? (
                    <img src={Open_heart_img} />
                  ) : (
                    <img className="open-heart" src={Close_heart_img} />
                  )}
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
