import React from 'react';
import styles from '../styles/Card.module.css';

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`${styles.card} ${
        card.isFlipped || card.isMatched ? styles.flipped : ''
      }`}
      onClick={onClick}
    >
      {(card.isFlipped || card.isMatched) && card.value}
      {(card.isFlipped || card.isMatched) && card.isBonus && (
        <span className={styles.bonusIndicator}>★</span>
      )}
    </div>
  );
};

export default Card;
