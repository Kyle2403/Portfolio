import React from 'react'
import RuleList from './RuleList'
import StartGameButton from './StartGameButton'

const GameCard = ({gameId, gameName, author, rangeMin, rangeMax, rules}: Game) => {
  return (
    <div className="mx-2 sm:mx-4 card shadow-xl mb-3 bg-gray-100">
        <div className="card-body ">
            <div className='flex justify-between items-center'>
                <h2 className="card-title font-bold text-3xl font-mono">{gameName}</h2>
                <h3 className='text-gray-500 font-medium text-md italic'>Created by {author}</h3>
            </div>
            <div className=''>         
                <RuleList rules = {rules}></RuleList>
                <ul className="flex items-center">
                    <li className="pl-4 mr-1 text-xl font-semibold opacity-60 tracking-wide">Range:</li>
                    <div className="flex space-x-2 items-center">
                        <span className="badge badge-info">{rangeMin}</span>
                        <span className="text-gray-500 font-semibold text-xl">→</span>
                        <span className="badge badge-info">{rangeMax}</span>
                    </div>
                </ul>
            </div> 
            <div className="card-actions justify-end">
                <StartGameButton gameId={gameId}/>
            </div>
        </div>
    </div>
  )
}

export default GameCard