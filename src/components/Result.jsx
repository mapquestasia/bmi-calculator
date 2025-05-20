import { useEffect, useState } from "react";
import styles from "./BMICalculator.module.css";

export const Result = ({ setIsResultScreen, bmi }) => {
  const close = () => {
    setIsResultScreen(false);
  };

  const [message, setMessage] = useState({});

  //Call only once when component render to set the BMI message and style.
  useEffect(() => {
    if (bmi < 18.5) setMessage({ text: "Underweight", style: "underweight" });
    else if (bmi < 24.9)
      setMessage({ text: "Normal Weight", style: "normalweight" });
    else if (bmi < 29.9)
      setMessage({ text: "Overweight", style: "overweight" });
    else setMessage({ text: "Obesity", style: "obesity" });
  }, []);

  return (
    <div className={styles["result"]}>
      <div className={`${styles["type-line"]} ${styles[message.style]}`}></div>
      <div>
        <p>Your BMI is</p>
        <h1>{bmi.toFixed(2)}</h1>
      </div>
      <div className={`${styles["message-box"]} ${styles[message.style]}`}>
        <p>{message.text}</p>
      </div>
      <button onClick={close}>Close</button>
    </div>
  );
};
