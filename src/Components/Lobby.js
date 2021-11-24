import React, { useCallback, useState, Fragment } from "react";
import PlayArea from "./PlayArea";

function Lobby() {
  const [gameNumber, setGameNumber] = useState(1);
  const [gameScorePlayer1, setGameScorePlayer1] = useState(0);
  const [gameScorePlayer2, setGameScorePlayer2] = useState(0);
  const [startGame, setStartGame] = useState(false);

  const startNextGame = useCallback(
    ({ player1Score, player2Score }) => {
      if (gameNumber < 6) {
        setGameScorePlayer1((s) => s + player1Score);
        setGameScorePlayer2((s) => s + player2Score);
        setGameNumber((g) => g + 1);
      }
    },
    [gameNumber]
  );

  const restartGame = useCallback(() => {
    setStartGame(false);
    setGameNumber(1);
    setGameScorePlayer1(0);
    setGameScorePlayer2(0);
    setStartGame(true);
  }, []);

  return (
    <div>
      <Fragment>
        <p>Game {gameNumber} -</p>
        <hr />
        <button onClick={restartGame}>Start Game</button>
        <p>Player 1 - Won : {gameScorePlayer1}</p>
        <p>Player 2 - Won : {gameScorePlayer2}</p>
        <hr />
        {gameScorePlayer1 > 2 || gameScorePlayer2 > 2 ? (
          <p>Player {gameScorePlayer1 > gameScorePlayer2 ? "1" : "2"} won</p>
        ) : (
          <Fragment>
            {startGame && (
              <PlayArea key={gameNumber} startNextGame={startNextGame} />
            )}
          </Fragment>
        )}
      </Fragment>
    </div>
  );
}

export default Lobby;
