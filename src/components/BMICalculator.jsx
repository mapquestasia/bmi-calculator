import { useEffect, useState } from "react";
import styles from "./BMICalculator.module.css";

import { UserInput } from "./UserInput";
import { Result } from "./Result";
import { History } from "./History";

export const BMICalculator = () => {
  const [isResultScreen, setIsResultScreen] = useState(false);
  const [bmi, setBmi] = useState();
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("bmi-history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bmi-history", JSON.stringify(history));
  }, [history]);

  return (
    //Main container
    <div className={styles.container}>
      {isResultScreen === false ? (
        <>
          <UserInput
            setIsResultScreen={setIsResultScreen}
            setBmi={setBmi}
            addHistory={(entry) =>
              setHistory((prev) => [entry, ...prev].slice(0, 5))
            }
          />
          <History history={history} />
        </>
      ) : (
        <Result setIsResultScreen={setIsResultScreen} bmi={bmi} />
      )}
    </div>
  );
};
