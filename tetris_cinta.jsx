import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import './App.css';

const ROWS = 20;
const COLS = 10;
const INITIAL_BOARD = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
const POINTS_PER_LINE = 2;
const POINTS_TO_WIN = 100;

function NotificationBar({ title, message, onClose }) {
  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-center p-4 shadow-lg rounded-xl z-50 animate-pulse">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm mt-1">{message}</p>
      <Button onClick={onClose} className="mt-2 bg-white text-pink-500 hover:bg-pink-100">Tutup</Button>
    </div>
  );
}

export default function TetrisCinta() {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showLoseMessage, setShowLoseMessage] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && !gameOver) {
      interval = setInterval(() => {
        const linesCleared = Math.random() < 0.3 ? 1 : 0; // simulasi pecah baris
        if (linesCleared > 0) {
          setScore((prev) => {
            const newScore = prev + POINTS_PER_LINE * linesCleared;
            if (newScore >= POINTS_TO_WIN) {
              setIsRunning(false);
              setGameOver(true);
              setShowWinMessage(true);
            }
            return newScore;
          });
        }
        if (Math.random() < 0.1) {
          setIsRunning(false);
          setGameOver(true);
          setShowLoseMessage(true);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameOver]);

  const startGame = () => {
    setBoard(INITIAL_BOARD);
    setScore(0);
    setIsRunning(true);
    setGameOver(false);
    setShowWinMessage(false);
    setShowLoseMessage(false);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
      {showWinMessage && (
        <NotificationBar
          title="KAMU MENANG"
          message="Selamat kamu udah jadi pacar aku untuk selamanya"
          onClose={() => setShowWinMessage(false)}
        />
      )}
      {showLoseMessage && (
        <NotificationBar
          title="KAMU KALAH"
          message="Karna kamu kalah, kamu wajib jadi pacarku selamanya"
          onClose={() => setShowLoseMessage(false)}
        />
      )}

      <div className="flex gap-8 items-start">
        {/* Kiri: Gif */}
        <div className="w-40">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGd5dTBmN3NlNHZrb2RuMHJlYmZ1YXF4bmZ5eGg0bnA4ZGVwa3IxbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MaEjSFeN8LqQxFMwxO/giphy.gif"
            alt="anime joget"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Tengah: Board */}
        <div className="grid grid-cols-10 gap-0.5 bg-white p-2 rounded shadow">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-4 h-4 bg-pink-300 border border-white"
              />
            ))
          )}
        </div>

        {/* Kanan: Poin */}
        <div className="w-40 bg-pink-200 text-center p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-pink-700">Skor Kamu</h3>
          <p className="text-4xl font-bold text-pink-600 mt-2">{score}</p>
        </div>
      </div>

      {!isRunning && !gameOver && (
        <Button onClick={startGame} className="mt-8 bg-pink-500 text-white hover:bg-pink-600">
          Mulai Tetris Cinta
        </Button>
      )}
    </div>
  );
}
