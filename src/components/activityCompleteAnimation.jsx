import React, { useState } from "react";
import { useEffect } from "react";
import "./activityCompleteAnimation.css";
import ActivityImg from '../assets/ambient_back.webp'
import LetsSeeImg from '../assets/ambient_front.webp'
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
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  //   Timer For Lets see ambients Page

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetsSee(true);
    }, 4400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetsSeeAnimation(true);
    }, 6600);
    return () => clearTimeout(timer);
  }, []);

  //   Timer For Final Results

  useEffect(() => {
    const timer = setTimeout(() => {
      setfinalResults(true);
    }, 8800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main_container">
      {/* Final Results Part */}

      {finalResults ? (
        <div className="final_card_container">
  
          {/* Accuracy Added 12/29/2022  */}
          <p> Total Right : {props.points}  </p>
          <p> Accuracy : {props.accuracy} %  </p>
        </div>
      ) : letsSee ? (
        <div className="overflow">
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
        </div>
      ) : (
        <div className="overflow">
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
              This activity{" "}
            </span>{" "}
            <span className={activityFinish ? "inactive2" : "text2"}>
              {" "}
              has finish!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationPage;
