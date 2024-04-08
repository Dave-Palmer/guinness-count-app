"use client";
import React from "react";
import styles from "./AddBeerButton.module.css";

const AddBeerButton = ({
  text,
  href,
  onClick,
}: {
  text: string;
  href?: string;
  onClick?: any;
}) => {
  return (
    <a href={href} onClick={onClick} className={styles.button}>
      <span className={styles.text}>{text}</span>
      <span className={styles.bubble}></span>
    </a>
  );
};

export default AddBeerButton;
