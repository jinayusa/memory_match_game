import React from 'react';
import styles from '../styles/StartScreen.module.css';

const StartScreen = ({ playerNamesInput, setPlayerNamesInput, startGame }) => {
  return (
    <div className={styles.startScreen}>
      <h1>Memory Match</h1>
      <p>Enter player names (at least two), separated by commas:</p>
      <input
        type="text"
        className={styles.inputField}
        value={playerNamesInput}
        onChange={(e) => setPlayerNamesInput(e.target.value)}
        placeholder="e.g. Alice, Bob, Charlie"
      />
      <button onClick={startGame} className={styles.startButton}>
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
