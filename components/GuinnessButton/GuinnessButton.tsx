"use client";
import React from "react";
import styles from "./GuinnessButton.module.css";

const GuinnessButton = () => {
  return (
    <a href="/addbeer" className={styles.button}>
      <span className={styles.text}>Add Beer</span>
      <span className={styles.bubble}></span>
    </a>
  );
};

export default GuinnessButton;
