"use client"
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'
import NavigationBar from '@/app/components/NavigationBar'
import Footer from '@/app/components/Footer'
const Page = () => {
    // thanks tto this useParams i have to make this cliennt
    const {id} = useParams();
    const [session, setSession] = useState<GameSession | null>(null)
    useEffect(() => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5271";
        const fetchSession = async () => {
            const res = await fetch(`${backendUrl}/session/${id}`)
            const data: GameSession = await res.json()
            setSession(data)
        }
        fetchSession()
    }, [id])
    if (!session) return <p>Loading...</p>
    return (
        <div className='flex flex-col min-h-screen bg-white bg:opacity-0 rounded-xl shadow-md'>
            <NavigationBar/>
            <p className='font-semibold text-xl pl-5 pt-20'>Session: #{session.gameSessionId}</p>
            <div className='flex-grow mx-5 p-4'>
                <div className="flex justify-between">
                    <p className="font-medium">Game: {session.gameName}</p>
                        <span className={`px-2 rounded ${
                            session.isDone
                            ? "bg-green-100 text-green-700"
                            : "bg-red-300 text-black-700"
                        }`}
                        >
                            {session.isDone ? <div className="">Completed by <span className="italic font-bold">{session.playerName}</span></div> : "Aborted by player"}
                        </span>
                </div>
                <p className="text-gray-600 text-md mt-1">Started at {new Date(session.startTime).toLocaleString()}</p>
                <div className="mt-2">
                    <p>⏱ {session.duration} s</p>
                    <p className='font-semibold my-5'>Answers</p>

                    <div className="overflow-x-auto mt-2">
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                <th className="px-4 py-2 border">Number</th>
                                <th className="px-4 py-2 border">Response</th>
                                <th className="px-4 py-2 border">Correct Response</th>
                                <th className="px-4 py-2 border">Correct?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {session.answers.filter(a => a.response).map((a, index) => (
                                    <tr key={a.answerId} className={index % 2 === 0 ? "bg-white text-center" : "bg-gray-50 text-center"}>
                                    <td className="px-4 py-2 border">{a.number}</td>
                                    <td className="px-4 py-2 border">{a.response}</td>
                                    <td className="px-4 py-2 border">{a.correctResponse}</td>
                                    <td className="px-4 py-2 border">{a.isCorrect ? "✅" : "❌"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            

        </div>
    )
}

export default Page