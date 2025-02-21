import React from 'react';
import Card from './Card';
import styles from '../styles/Board.module.css';

const Board = ({ board, onCardClick }) => {
  return (
    <div className={styles.board}>
      {board.map((card, index) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(index)} />
      ))}
    </div>
  );
};

export default Board;
