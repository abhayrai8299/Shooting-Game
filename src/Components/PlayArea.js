import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";

function PlayArea({ startNextGame }) {
  const [power1, setPower1] = useState(100);
  const [power2, setPower2] = useState(100);
  const startNextGameRef = useRef(startNextGame);
  const intervalRef = useRef(0);

  const fire = useCallback((player) => {
    const power = Math.floor(Math.random() * 5) + 1;
    if (player === 1) {
      setPower2((c) => {
        return c - power;
      });
    } else {
      setPower1((c) => {
        return c - power;
      });
    }
  }, []);

  useEffect(() => {
    if (power1 <= 0) {
      startNextGameRef.current({ player1Score: 0, player2Score: 1 });
    }
  }, [power1]);

  useEffect(() => {
    if (power2 <= 0) {
      startNextGameRef.current({ player1Score: 1, player2Score: 0 });
    }
  }, [power2]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fire(1);
      fire(2);
    }, 10);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [fire]);

  return (
    <div>
      <div>
        <p>Player 1</p>
        <p>Health: {power1}</p>
      </div>
      <hr />
      <div>
        <p>Player 2</p>
        <p>Health: {power2}</p>
      </div>
    </div>
  );
}

export default PlayArea;
