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

  // EDITED 29 - 31 December 2022 Kamran ( Users Array and Current User)
  const [users, setUsers] = useState(["Dom", "Mic", "John", "Nick", "Daniel"]);
  const [currentUser, setCurrentUser] = useState("Mic");
  const [bonusPoints, setBonusPoints] = useState(0);

  // EDITED 29 December 2022 Kamran ( Updated Value of WrongAnswer from 1 to 0)

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
    // EDITED 29 December 2022 Kamran ("Function Conditions For Accuracy and Wrong 12/29/2022" part is removed from here and added below in useEffect Hook )

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
      setWrongAnswer(wrongAnswer + 1);
      setActive2(true);
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
      setWrongAnswer(wrongAnswer + 1);
      setActive2(true);

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

  // EDITED 29 December 2022 Kamran (UseEffect Hook -> Deleted Part Updated Here)

  useEffect(() => {
    if (wrongAnswer === 0 && points === 0) {
      setAccuracy(0 * 100);
    } else {
      let accuracyDecimal = ((points / (wrongAnswer + points)) * 100).toFixed(
        2
      );
      setAccuracy(accuracyDecimal);
    }
  }, [wrongAnswer, points]);

  // EDITED 29 - 31 December 2022 Kamran ( Bonus Function)

  useEffect(()=>{
      // Convert The array and current user into lower case

    const lowerArray = users.map(element => {
      return element.toLowerCase();
    });
    setCurrentUser(currentUser.toLocaleLowerCase())
   
    if (lowerArray.includes(currentUser.toLocaleLowerCase())) {
      setPoints(points + 2)
      setBonusPoints(2)
    }
    else if(!lowerArray.includes(currentUser.toLocaleLowerCase())){
      setBonusPoints(11)
      setPoints(points + 11)
      
    }
    console.log("Users", users);
    console.log("Current User", currentUser);
  },[])
  

  return (
    <>
      {finalResult ? (
        // Showing Final Result Component
        <>
          <AnimationPage points={points} accuracy={accuracy} bonus={bonusPoints} />
        </>
      ) : (
        // Main Phrase Component
        <>
          <div>
  {/* EDITED 29 - 31 December 2022 Kamran (Current User Display) */}

          <h2 className="current_user">{currentUser}</h2>

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
          {/* EDITED 29 December 2022 Kamran -> Users Array Component Just For Understanding the bonus function you can remove this component part when you have backend done and users in the array. */}
        
        </>
      )}
    </>
  );
};

export default Phrase;
