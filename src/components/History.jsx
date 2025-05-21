import React from "react";
import styles from "./BMICalculator.module.css";

const getCategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal Weight";
  if (bmi < 29.9) return "Overweight";
  return "Obesity";
};

export const History = ({ history }) => {
  if (!history.length) return null;
  return (
    <div className={styles.history} data-testid="history">
      <h2>Previous Results</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {`${entry.weight} ${entry.weightUnit} – ${entry.height} ${entry.heightUnit} – BMI: ${entry.bmi.toFixed(2)} (${getCategory(entry.bmi)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};
