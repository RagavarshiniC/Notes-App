import React from 'react'
import styles from '../Styles/StoredNotes.module.css'
export default function StoredNotes({ storedNoteText }) {
  const { text, date,time } = storedNoteText;

  return (
    <div className={styles.savednotes}>
      <p>{text}</p>
      <div className={styles.dateTimeContainer}>
        <small>{date}</small>
        <span className={styles.dateTimeSeparator}> • </span>
        <small>{time}</small>
      </div>
    </div>
  );
}