# Memory Match Game

A fun, multiplayer memory match game built with React and CSS Modules. In this game, two or more players take turns flipping cards on a 4×4 board. Match pairs to earn points—watch out for bonus pairs that give extra points and the turn timer that adds extra pressure!

## Features

- **Multiplayer Gameplay:** Play with two or more players on a single device.
- **Turn Timer:** Each player has 15 seconds per turn. If time runs out, any unmatched cards are flipped back and the turn passes.
- **Bonus Pairs:** Each card pair has a 20% chance to be a bonus pair. Matching bonus pairs awards 2 points instead of 1, and a visual star indicator appears on the card.
- **Modern Styling:** All styles are managed using CSS Modules, organized in a single folder for easy maintenance.

## Project Structure

memory-match/ ├── package.json ├── public/ │ └── index.html └── src/ ├── index.js ├── index.css ├── App.jsx ├── styles/ │ ├── App.module.css │ ├── StartScreen.module.css │ ├── Board.module.css │ ├── Card.module.css │ └── ScoreBoard.module.css └── components/ ├── StartScreen.jsx ├── Board.jsx ├── Card.jsx └── ScoreBoard.jsx

bash
Copy

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/memory-match.git
   cd memory-match
Install Dependencies:

bash
Copy
npm install
Start the Development Server:

bash
Copy
npm start
The app will run at http://localhost:3000.

How to Play
Start Screen:
Enter at least two player names separated by commas (e.g., "Alice, Bob, Charlie") and click the Start Game button.

Gameplay:

On your turn, click on cards to flip them.
If you flip two cards that match, you earn a point (or 2 points if it's a bonus pair) and keep your turn.
If they do not match, the cards flip back and the turn passes to the next player.
A 15-second timer counts down each turn. If time runs out, any flipped cards are reset and the turn passes.
Game Over:
The game ends when all pairs are matched. Final scores are displayed, and you can click Play Again to restart the game.

Technologies Used
React: For building the interactive user interface.
CSS Modules: For modular and scoped CSS styling.
Create React App: To bootstrap the project and streamline development.
Customization & Future Improvements
Responsive Design: Enhance mobile responsiveness for on-the-go play.
Sound Effects: Add audio cues for card flips, matches, and time warnings.
Persistent Scores: Implement local storage or a backend to track high scores over time.
Additional Game Modes: Introduce new layouts or timed challenges for even more fun.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgements
Thank you for checking out this Memory Match game! Contributions, feedback, and improvements are always welcome.

yaml
Copy

---

Feel free to modify the file as needed for your project details or additional instructions. Enjoy coding and have fun playing!





