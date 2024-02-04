import React from 'react'
import styles from '../../Styles/List.module.css'
import CircleInitials from '../CircleInitials.jsx'
export default function List({ color, name, onClick }) {
  const circleStyle = {
    backgroundColor: color,
  };

  const getInitials = (groupName) => {
    if (typeof groupName !== 'string' || groupName.trim() === '') {
      // Handle cases where groupName is not a string or an empty string
      return '';
    }
  
    const words = groupName.split(' ');
  
    if (words.length === 1) {
      // For single-word group names, return only the first letter
      return words[0]?.charAt(0).toUpperCase() || '';
    } else {
      // For multi-word group names, return the initials of the first and last words
      const firstLetter = words[0]?.charAt(0) || '';
      const lastWord = words[words.length - 1] || '';
      const lastLetter = lastWord.charAt(0);
      return `${firstLetter.toUpperCase()}${lastLetter.toUpperCase()}`;
    }
  };
  
  const initials = getInitials(name);
  

  return (
    <div style={{ margin: '20px' }} onClick={onClick}>
      <div className={styles.ListBody}>
        <div className={styles.Listdiv}>
          <CircleInitials initials={initials} color={color}/>
          {/* <div className={styles.circle} style={circleStyle}>
            {initials}
          </div> */}
          <div className={styles.NotesName}>{name}</div>
        </div>
      </div>
    </div>
  );
}
