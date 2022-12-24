import React, { useState } from "react";
import { useEffect } from "react";
import "./AnimationPage.css";
import ActivityImg from '../assets/activity.png'
import LetsSeeImg from '../assets/letssee.png'
const AnimationPage = (props) => {
  // Variable Declaration

  const [activityFinish, setActivityFinish] = useState(false);
  const [letsSee, setLetsSee] = useState(false);
  const [letsSeeAnimation, setLetsSeeAnimation] = useState(false);
  const [finalResults, setfinalResults] = useState(false);

  //   Timer For Activity Finish Page

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivityFinish(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  //   Timer For Lets see ambients Page

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetsSee(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetsSeeAnimation(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  //   Timer For Final Results

  useEffect(() => {
    const timer = setTimeout(() => {
      setfinalResults(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main_container">
      {/* Final Results Part */}

      {finalResults ? (
        <div className="final_card_container">
          <p> Final Result : {props.points} </p>
        </div>
      ) : letsSee ? (
        <>
          {/* Lets See Ambients Part */}

          <div
            className={
              letsSeeAnimation
                ? "inactive_img2"
                : "animation_page_img2_container"
            }
          >
            <img
              src={ActivityImg}
              alt="finished activity"
            />
          </div>
          <div className="animation_page_text_container">
            <span className={letsSeeAnimation ? "inactive3" : "text3"}>
              {" "}
              Let's count your{" "}
            </span>{" "}
            <br />
            <span className={letsSeeAnimation ? "inactive4" : "text4"}>
              {" "}
              new ambients!
            </span>
          </div>
        </>
      ) : (
        <>
          {/* Finished Activity Part */}

          <div
            className={
              activityFinish ? "inactive_img" : "animation_page_img_container"
            }
          >
            <img
              src={LetsSeeImg}
              alt="lets see ambients"
            />
          </div>
          <div className="animation_page_text_container">
            <span className={activityFinish ? "inactive1" : "text1"}>
              {" "}
              This activitiy{" "}
            </span>{" "}
            <span className={activityFinish ? "inactive2" : "text2"}>
              {" "}
              has finish!
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimationPage;
