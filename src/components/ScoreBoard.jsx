import React from 'react';
import styles from '../styles/ScoreBoard.module.css';

const ScoreBoard = ({ players }) => {
  return (
    <div className={styles.scores}>
      {players.map((player, index) => (
        <p key={index}>
          {player.name}: {player.score}
        </p>
      ))}
    </div>
  );
};

export default ScoreBoard;
