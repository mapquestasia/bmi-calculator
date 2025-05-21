import React, { useState } from "react";
import styles from "./BMICalculator.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const UserInput = ({ setIsResultScreen, setBmi }) => {
  //Validation Schema
  const schema = yup.object({
    weight: yup
      .number()
      .required("Weight is required")
      .typeError("Must be a number")
      .positive("Must be a positive number"),
    height: yup
      .number()
      .required("Height is required")
      .typeError("Must be a number")
      .positive("Must be a positive number"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  const onSubmit = (data) => {
    let weight = data.weight;
    if (weightUnit === "lbs") {
      // convert pounds to kilograms
      weight = data.weight * 0.453592;
    }

    let heightInMeters = data.height;
    if (heightUnit === "cm") {
      heightInMeters = data.height / 100;
    }

    //BMI Formula : Weight(kg) / Height(m)^2
    const bmi = weight / heightInMeters ** 2;
    setBmi(bmi);
    setIsResultScreen(true);
  };

  return (
    <div className={styles["user-input"]}>
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-group"]}>
          <div className={styles["input-group"]}>
            <p>Weight</p>
            <div className={styles["weight-control"]}>
              <div className={styles["input-icon"]}>
                <input autoComplete="off" {...register("weight")} />
                <label>{weightUnit === "kg" ? "kg" : "lbs"}</label>
              </div>
              <select
                className={styles["unit-select"]}
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
            <p className={styles.error}>{errors.weight?.message}</p>
          </div>
          <div className={styles["input-group"]}>
            <p>Height</p>
            <div className={styles["height-control"]}>
              <div className={styles["input-icon"]}>
                <input autoComplete="off" {...register("height")} />
                <label>{heightUnit === "cm" ? "cm" : "m"}</label>
              </div>
              <select
                className={styles["unit-select"]}
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
              >
                <option value="cm">cm</option>
                <option value="m">m</option>
              </select>
            </div>
            <p className={styles.error}>{errors.height?.message}</p>
          </div>
        </div>
        <div className={styles["button-group"]}>
          <button type="submit">Calculate</button>
          <button type="button" onClick={() => reset()}>Reset</button>
        </div>
      </form>
    </div>
  );
};
