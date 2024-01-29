// CircleInitials.jsx
import React from 'react';
import styles from '../Styles/CircleInitials.module.css';

const CircleInitials = ({ initials, color }) => {
  const circleStyle = {
    backgroundColor: color,
  };

  return (
    <div className={styles.circle} style={circleStyle}>
      {initials}
    </div>
  );
};

export default CircleInitials;
