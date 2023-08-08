import React from "react";
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    //BMI Formula : Weight(kg) / Height(m)^2
    const bmi = data.weight / (data.height / 100) ** 2;
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
            <div className={styles["input-icon"]}>
              <input autoComplete="off" {...register("weight")} />
              <label>kg</label>
            </div>
            <p className={styles.error}>{errors.weight?.message}</p>
          </div>
          <div className={styles["input-group"]}>
            <p>Height</p>
            <div className={styles["input-icon"]}>
              <input autoComplete="off" {...register("height")} />
              <label>cm</label>
            </div>
            <p className={styles.error}>{errors.height?.message}</p>
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>
    </div>
  );
};
