import React from 'react';
import styles from './styles.css';

export default (props) => {
  const {
    speed = 1.4,
    loading,
  } = props;

  const rootStyle = loading ? { opacity: 1 } : { opacity: 0 };
  const barStyle = loading ? {
    width: '97%',
    transition: `${speed}s width`,
  } : {
    width: '0%',
    // speed it up for fast clicks
    transition: '0.1s width',
    // make sure it only happens after the bar is faded out
    transitionDelay: '0.3s',
  };

  return (
    <div className={styles.root} style={rootStyle}>
      <div className={styles.bar} style={barStyle} />
    </div>
  );
};
