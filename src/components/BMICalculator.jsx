import { useState } from "react";
import styles from "./BMICalculator.module.css";

import { UserInput } from "./UserInput";
import { Result } from "./Result";

export const BMICalculator = () => {
  const [isResultScreen, setIsResultScreen] = useState(false);
  const [bmi, setBmi] = useState();

  return (
    //Main container
    <div className={styles.container}>
      {isResultScreen === false ? (
        <UserInput setIsResultScreen={setIsResultScreen} setBmi={setBmi} />
      ) : (
        <Result setIsResultScreen={setIsResultScreen} bmi={bmi} />
      )}
    </div>
  );
};
