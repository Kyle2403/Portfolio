"use client"
import React from 'react'
import Number from '@/app/components/Number'
import Timer from '@/app/components/Timer'
import Counter from '@/app/components/Counter'
import NavigationBar from '@/app/components/NavigationBar'
import Footer from '@/app/components/Footer'
import { useState, useEffect, useRef } from 'react'
import { useParams } from "next/navigation"

import { useRouter } from 'next/navigation'
const Page =  () => {
  const router = useRouter();
  const {id} = useParams();

  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState<number | null>(null);
  const answerIdRef = useRef<number | null>(null);
  const [input, setInput] = useState("")
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5271";
  useEffect(() => {
    const fetchSession = async () => {
      try{
        const res = await fetch(`${backendUrl}/session/${id}`);
        if (!res.ok){
          router.replace("/games");
          return;
        }
        const data: GameSession = await res.json();
        //console.log(data)
        const end = new Date(data.endTime);
        const now = new Date()

        if (now > end || data.isDone){
          router.replace("/games");
          return;
        }

        const start = new Date(data.startTime);
        const elapsedMs = now.getTime() - start.getTime();
        const elapsedSeconds = Math.max(0, Math.floor(elapsedMs / 1000)); // Don't allow negative elapsed time
        const remaining = Math.max(0, data.duration - elapsedSeconds);

        console.log('=== FIXED CALCULATION ===');
        console.log('Raw elapsed seconds:', Math.floor(elapsedMs / 1000));
        console.log('Clamped elapsed seconds:', elapsedSeconds);
        console.log('Remaining:', remaining);
        setTime(remaining - 1);
        fetchNumber();
        setLoading(false);
      }catch (err) {
        console.error('Failed to fetch session', err);
        router.replace("/games");
      }
      
      
    }
    if (id) {
      fetchSession();
      
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchNumber = async () => {
    try {
      const res = await fetch(`${backendUrl}/session/${id}/random`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data: RandomNumber = await res.json()
      if (!res.ok) {
        return
      }
      setNumber(data.number)
      answerIdRef.current = data.answerId
      setInput("") // reset input field
    } catch (err) {
      alert("Failed to fetch number"+ err)
    }
  }

  const handleSubmit = async () => {
    if (time < 1) return
    if (!answerIdRef.current) return
    if (!input.trim()) return
    try {
      const res = await fetch(`${backendUrl}/answer/${answerIdRef.current}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: input }),
      })
      if (!res.ok) {
        alert("Out of time or invalid answer id")
        return
      }
      setCount((c) => c + 1)
      fetchNumber() // immediately load next question
    } catch (err) {
      alert("Failed to submit answer "+ err)
    }
  }
  const endSession = async () => {
    try {
      const res = await fetch(`${backendUrl}/session/${id}`, {
        method: "PATCH",
      })
      if (!res.ok) {
        router.replace("/games")
        console.log(res)
        return
      }
      router.replace(`/sessions/${id}/details`)
    } catch (err) {
      console.error("Failed to end session", err)
    }
    
  }

  if (loading) {
    return <p className="text-center">Checking session...</p>
  }
  return (
    <div className='flex flex-col min-h-screen'>
        <NavigationBar></NavigationBar>
        <div className='flex flex-col flex-grow 2xl:w-5/6 2xl:mx-auto pt-20'>
            <div className="grid grid-cols-2 gap-4 p-4 mb-10">
              <div className="bg-gray-200 card shadow-md p-4 flex flex-col items-center">
                <p className="text-lg font-medium">Questions Answered</p>
                <Counter count={count} />
              </div>

              <div className=" bg-gray-200  card shadow-md p-4 flex flex-col items-center">
                <p className="text-lg font-medium">Time Left</p>
                <Timer time={time} />
              </div>
            </div>

          <Number number = {number}></Number>
          <div className='flex flex-col w-1/3 items-center mx-auto'>
            <input type="text" value = {input} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} onChange = {(e)=> setInput(e.target.value)} placeholder="Type answer (Enter to submit)" className="bg-gray-200 input input-xl text-center w-full text-black text-sm lg:text-base input-bordered mt-16 rounded-lg" />
          </div>

        </div>
        
        <button className='btn btn-info btn-xl shadow-md lg:mt-4' onClick={endSession}>End Game</button>
        <Footer></Footer>
    </div>
  )
}

export default Page


// current approach is to have the patch called when timer is out
// however, that means i dont have power to end it early
// and this means i can only choose the latter option for patch.
// since if i force the patch upon exit or change of page, user can comeback
// as currently i only check end < now

// thus add a end game session that signals the ennd,
// the page can trigger it or user
// so needs to have a isDone attr for game session
// since the end time check will pass if user
// finish early and come back, i donnt want that
// change end < now to isDone || end < now (if choose the latter) and isDone if chose former (as below)

// should i make the button trigger if user close or move away from this page
// otherwise, the session may never be patched? and 
// or, should i make the get sessionns check for all session with end < now with isDone = false, and update them?