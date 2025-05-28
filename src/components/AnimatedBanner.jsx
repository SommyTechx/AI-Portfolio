import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.png";

export default function AnimatedBanner() {
  const [shapePos, setShapePos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [showShape, setShowShape] = useState(false);
  const [speed, setSpeed] = useState(2000);
  const [missed, setMissed] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("highScore")) || 0;
  });
  const [leaderboard, setLeaderboard] = useState(() => {
    return JSON.parse(localStorage.getItem("leaderboard")) || [];
  });

  const [gameStarted, setGameStarted] = useState(false);
  const maxMisses = 5;
  const gameRef = useRef(null);

  const highScoreSound = useRef(null);
  const gameOverSound = useRef(null);

  useEffect(() => {
    highScoreSound.current = new Audio("/sounds/highscore.mp3");
    gameOverSound.current = new Audio("/sounds/gameover.mp3");
  }, []);

  useEffect(() => {
    if (!gameStarted || missed >= maxMisses) return;

    const interval = setInterval(() => {
      if (showShape) {
        setMissed((m) => m + 1);
      }

      setShowShape(true);
      setShapePos({
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, showShape, missed, gameStarted]);

  useEffect(() => {
    if (missed < maxMisses) {
      setDisplayScore(0);
      return;
    }

    let start = 0;
    const increment = Math.max(1, Math.floor(score / 30));

    const interval = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(start);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [missed, score]);

  useEffect(() => {
    if (missed >= maxMisses && isNewHighScore) {
      highScoreSound.current?.play();

      let newLeaderboard = [...leaderboard, score];
      newLeaderboard = Array.from(new Set(newLeaderboard))
        .sort((a, b) => b - a)
        .slice(0, 3);

      setLeaderboard(newLeaderboard);
      localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
    }

    if (missed >= maxMisses && !isNewHighScore) {
      gameOverSound.current?.play();
    }
  }, [missed, isNewHighScore, leaderboard, score]);

  function handleShapeClick() {
    if (!showShape || missed >= maxMisses) return;

    setShowShape(false);
    setScore((s) => {
      const newScore = s + 1;

      if (newScore % 10 === 0) {
        setSpeed((prev) => Math.max(700, prev - 100));
      }

      if (newScore > highScore) {
        localStorage.setItem("highScore", newScore);
        setHighScore(newScore);
        setIsNewHighScore(true);
      }

      return newScore;
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleShapeClick();
    }
  }

  function resetGame() {
    setScore(0);
    setDisplayScore(0);
    setMissed(0);
    setSpeed(2000);
    setShapePos({ x: 50, y: 50 });
    setShowShape(true);
    setIsNewHighScore(false);
    setGameStarted(true);
  }

  return (
    <div
      className=" relative flex
    x flex-col items-center  "
    >
      <div
        ref={gameRef}
        className="
        mt-5 px-4
        max-w-full mx-auto
        h-[9rem]
        w-[90vw]  
        sm:px-10 sm:w-[25rem]
        md:h-40 md:w-[40rem]
        lg:h-64 lg:w-[53rem]
        relative  shadow-md select-none overflow-hidden
      "
        style={{
          background:
            "radial-gradient(ellipse at center, #0f2027 0%, #203a43 60%, #2c5364 100%)",
        }}
      >
        {/* Animated stars */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 800 200"
          fill="none"
        >
          {[...Array(15)].map((_, i) => {
            const cx = Math.random() * 800;
            const cy = Math.random() * 200;
            const r = Math.random() * 1.5 + 0.5;
            return (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="white"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: Math.random() * 3,
                }}
              />
            );
          })}
        </svg>

        {/* Title */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4">
          <h1 className="textbase sm:text-lg md:text-xl lg:text-2xl font-heading font-semibold text-sky-400 select-text">
            Catch the Shape!
          </h1>
        </div>

        {/* Start Game screen */}
        {!gameStarted && missed < maxMisses && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white bg-accent-light backdrop-blur">
            <h2 className="textbase sm:text-lg md:text-xl lg:text-2xl font-heading mb-4">
              Ready to Play?
            </h2>
            <button
              onClick={() => setGameStarted(true)}
              className="bg-primary hover:bg-accent px-4 py-2 rounded text-white shadow font-body textbase sm:text-lg md:text-xl lg:text-2xl"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Game Over screen */}
        {missed >= maxMisses && (
          <div className="absolute inset-0 z-20 bg-accent-light flex flex-col items-center justify-center text-white px-4 ">
            <h2 className=" text-[0.9rem] textbase sm:text-l md:text-lg lg:text-xl font-heading sm:mb-2">
              Game Over!
            </h2>
            <p className=" text-[0.5rem] textbase sm:text-l md:text-lg lg:text-xl font-body">
              Your Score:{" "}
              <motion.span
                key={displayScore}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sky-400"
              >
                {displayScore}
              </motion.span>
            </p>
            <p className=" text-[0.8rem] textbase sm:text-l md:text-lg lg:text-xl font-body">
              High Score: <span className="text-yellow-400">{highScore}</span>
            </p>
            <p className="mt-1 lg:mt-2 text-[0.5rem] textbase sm:text-l md:text-lg lg:text-xl italic text-center text-red-50 font-body">
              {isNewHighScore
                ? "Congratulations! You beat your high score!"
                : "Try again — bet the High score Next Time!"}
            </p>

            <div className="mb-2 w-full max-w-xs text-left">
              <h3 className="text-[0.7rem] textbase sm:text-l md:text-lg lg:text-xl font-semibold mb-0 lg:mb-2 underline text-sky-300">
                Top Scores
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-yellow-300 font-mono">
                {leaderboard.length === 0 && <li>No scores yet</li>}
                {leaderboard.map((scoreItem, index) => (
                  <li
                    className="text-[0.8rem]  textbase sm:text-l md:text-lg lg:text-xl "
                    key={index}
                  >
                    {scoreItem}
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={resetGame}
              className="bg-primary text-[0.5rem] textbase sm:text-l md:text-lg lg:text-xl hover:bg-accent px-4 py-2 rounded text-white shadow font-body"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Game area */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          {showShape && missed < maxMisses && gameStarted && (
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Catch the shape"
              onClick={handleShapeClick}
              onKeyDown={handleKeyDown}
              className="absolute w-10 h-10 bg-sky-500 rounded-full shadow-lg cursor-pointer select-none"
              style={{
                top: `${shapePos.y}%`,
                left: `${shapePos.x}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
            />
          )}

          {/* Score display */}
          {gameStarted && missed < maxMisses && (
            <div className="absolute bottom-3 right-4 bg-sky-800/70 text-white font-mono px-3 py-1 rounded-lg shadow-md select-text">
              Score: {score} | Missed: {missed}/{maxMisses}
            </div>
          )}
        </div>
      </div>
      <img
        src={profile}
        alt=""
        className="absolute z-2000 
        left-11 top-32
        sm:left-35 sm:top-35
        lg:top-52 lg:left-60
         w-[5rem] h-[5rem]
         lg:w-[9rem] lg:h-[9rem] 
         sm:w-16 sm:h-16 rounded-full object-cover"
      />

      <button
        className="
        bg-accent absolute z-3000 top-45 right-10
        sm:top-45 sm:right-30
        lg:top-75 lg:right-60
       rounded-[3rem] text-secondary font-body
      text-[0.8rem]
      textbase sm:text-l md:text-xl lg:text-xl
       px-4 py-1 sm:px-4 sm:py-1 md:px-5 lg:px-6
       hover:border-2 hover:border-secondary
       dark:hover:bg-primary 

       "
      >
        Follow
      </button>
    </div>
  );
}
