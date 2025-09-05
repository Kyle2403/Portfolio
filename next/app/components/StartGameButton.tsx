'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";

type StartGameButtonProps = {
  gameId: number;
};

const StartGameButton = ({ gameId }: StartGameButtonProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [duration, setDuration] = useState(60);

  const handleStartGame = async () => {
    if (!playerName || duration < 10 || duration > 3600) {
      alert("Invalid input");
      return;
    }

    try {
      const backendUrl = process.env.BACKEND_URL || "http://localhost:5271";
      const playerRes = await fetch(`${backendUrl}/player`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: playerName }),
      });

      if (!playerRes.ok) {
        const text = await playerRes.text();
        alert(`Failed to create player: ${text}`);
        return;
      }

      const player = await playerRes.json();

      const sessionRes = await fetch(`${backendUrl}/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId,
          playerId: player.playerId,
          duration,
        }),
      });

      if (!sessionRes.ok) {
        const text = await sessionRes.text();
        alert(`Failed to create session: ${text}`);
        return;
      }

      const session = await sessionRes.json();
      setIsOpen(false);
      router.push(`/sessions/${session.gameSessionId}`);
    } catch (error: any) {
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Start Game Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn bg-green-600 hover:bg-green-950"
      >
        <span>Start Game</span>
        <svg
          className="size-[1em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Start New Game</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Player Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-gray-100 text-black w-full border rounded-lg p-2"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Duration (10–3600s)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="bg-gray-100 text-black w-full border rounded-lg p-2"
                min={10}
                max={3600}
              />
            </div>
            <p className='font-medium italic text-xs mb-3'>*Make sure to read the rules before starting, they wont be displayed during the game session.</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleStartGame}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartGameButton;


// 1: page manages all logic, pass a function to game card (func(gameId)) for the game card to put it into the button. 2: page just pass the game id to game card, gaame card defines the function and call it in the button 3: page pass game id to game card, game card pass to button, button defines what to do itself 