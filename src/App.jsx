import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import StartScreen from './components/StartScreen';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';

const CARD_VALUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  let cards = [];
  // For each value, randomly assign bonus (20% chance)
  CARD_VALUES.forEach((value, index) => {
    const isBonus = Math.random() < 0.2;
    cards.push({ id: index * 2, value, isFlipped: false, isMatched: false, isBonus });
    cards.push({ id: index * 2 + 1, value, isFlipped: false, isMatched: false, isBonus });
  });
  return shuffle(cards);
}

const App = () => {
  // Game setup states
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNamesInput, setPlayerNamesInput] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  // Game play states
  const [board, setBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // Timer state (15 seconds per turn)
  const [timeLeft, setTimeLeft] = useState(15);

  const startGame = () => {
    const names = playerNamesInput
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name);
    if (names.length < 2) {
      alert('Enter at least two names separated by commas.');
      return;
    }
    setPlayers(names.map((name) => ({ name, score: 0 })));
    setBoard(createBoard());
    setGameStarted(true);
    setTimeLeft(15);
  };

  const handleCardClick = (cardIndex) => {
    if (isProcessing) return;
    const card = board[cardIndex];
    if (card.isFlipped || card.isMatched) return;

    const newBoard = board.map((c, index) =>
      index === cardIndex ? { ...c, isFlipped: true } : c
    );
    const newSelected = [...selectedCards, cardIndex];
    setBoard(newBoard);
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        const [firstIndex, secondIndex] = newSelected;
        const firstCard = newBoard[firstIndex];
        const secondCard = newBoard[secondIndex];

        if (firstCard.value === secondCard.value) {
          newBoard[firstIndex].isMatched = true;
          newBoard[secondIndex].isMatched = true;
          const updatedPlayers = [...players];
          // Bonus match awards 2 points
          updatedPlayers[currentPlayerIndex].score += firstCard.isBonus ? 2 : 1;
          setPlayers(updatedPlayers);
          // Successful match resets the timer (and same player gets another turn)
          setTimeLeft(15);
        } else {
          newBoard[firstIndex].isFlipped = false;
          newBoard[secondIndex].isFlipped = false;
          // Change turn and reset timer
          setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
          setTimeLeft(15);
        }
        setBoard(newBoard);
        setSelectedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  // Timer effect: counts down each second during a turn.
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (timeLeft === 0) {
      // Time expired: flip back any selected cards and pass turn
      if (selectedCards.length > 0) {
        const newBoard = board.map((c, idx) =>
          selectedCards.includes(idx) ? { ...c, isFlipped: false } : c
        );
        setBoard(newBoard);
        setSelectedCards([]);
      }
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
      setTimeLeft(15);
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, gameStarted, gameOver, selectedCards, board, players.length]);

  // Check if game is over (all cards matched)
  useEffect(() => {
    if (board.length > 0 && board.every((card) => card.isMatched)) {
      setGameOver(true);
    }
  }, [board]);

  const resetGame = () => {
    setGameStarted(false);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setPlayerNamesInput('');
    setBoard([]);
    setSelectedCards([]);
    setGameOver(false);
    setIsProcessing(false);
    setTimeLeft(15);
  };

  return (
    <div className={styles.App}>
      {!gameStarted ? (
        <StartScreen
          playerNamesInput={playerNamesInput}
          setPlayerNamesInput={setPlayerNamesInput}
          startGame={startGame}
        />
      ) : (
        <>
          <header className={styles.header}>
            <h1>Memory Match</h1>
            <p>
              Current Turn: {players[currentPlayerIndex].name} | Time Left: {timeLeft}s
            </p>
          </header>
          <ScoreBoard players={players} />
          <Board board={board} onCardClick={handleCardClick} />
          {gameOver && (
            <div className={styles.gameOver}>
              <h2>Game Over!</h2>
              <h3>Results:</h3>
              <ul>
                {players.map((player, index) => (
                  <li key={index}>
                    {player.name}: {player.score} {player.score === 1 ? 'pair' : 'pairs'}
                  </li>
                ))}
              </ul>
              <button onClick={resetGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
