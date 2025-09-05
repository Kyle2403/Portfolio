"use client"
import React, { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar'
import GameCard from '../components/GameCard'
import Footer from "../components/Footer"
import BreadCrumbs from "../components/BreadCrumbs";
const Page =  () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // how many per page
  useEffect(() => {
    const fetchGames = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5271";
      const res = await fetch(`${backendUrl}/game`, { cache: "no-store" });
      const data: Game[] = await res.json();
      setGames(data.slice().sort((a, b) => b.gameId - a.gameId));
      
    };
    fetchGames();
  }, []);

  const totalPages = Math.ceil(games.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentGames = games.slice(startIndex, startIndex + pageSize);
  return (
    <main className="flex flex-col min-h-screen">
        <NavigationBar/>
        <BreadCrumbs links={[{text: "Games", href:""}]}></BreadCrumbs>
        <div className="flex-grow">
          <div className="bg-black/40">
            <h1 className='font-black text-2xl px-6 pb-2 pt-2  text-white'>All Games</h1>
            <div className=''>
                  <div className="">
                    {currentGames
                    //.slice(0, 2)
                    .map((game, i) => (
                      <GameCard
                        key = {game.gameId}
                        gameId={game.gameId}
                        gameName = {game.gameName}
                        author = {game.author}
                        rangeMin={game.rangeMin}
                        rangeMax={game.rangeMax}
                        rules={game.rules.sort((a, b) => a.divisor - b.divisor)}
                      //   onStart={()=> handleStartGame(game.gameId)} 
                      />
                    ))}
                    </div>
                  </div>
              </div>
            
          </div>
          <div className="flex justify-center items-center gap-2 py-4">
              <button
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
          </div>
          <Footer></Footer>
    </main>
  )
}

export default Page