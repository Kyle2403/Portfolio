'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const GameForm = () => {
  const router = useRouter()
  const [rules, setRules] = useState<FormRule[]>([])
  const [gameName, setGameName] = useState("")
  const [author, setAuthor] = useState("")
  const [rangeMin, setRangeMin] = useState<number | "">("")
  const [rangeMax, setRangeMax] = useState<number | "">("")

  const handleAddRule = () => {
    setRules([...rules, { divisor: "", replacement: "" }])
  }

  const handleChangeRule = (index: number, field: keyof Rule, value: string) => {
    const newRules = [...rules]
    if (field === "divisor") {
      newRules[index][field] = value === "" ? "" : Number(value)
    } else {
      newRules[index][field] = value
    }
    setRules(newRules)
  }

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index))
  }

  const handleCreateGame = async () => {
    //  validation
    if (!gameName.trim()) {
      alert("Game Name is required")
      return
    }
    if (!author.trim()) {
      alert("Your Name is required")
      return
    }
    if (
        rangeMin === "" || 
        rangeMax === "" || 
        Number(rangeMin) >= Number(rangeMax) || 
        Number(rangeMin) < 1 || 
        Number(rangeMax) > 10000
        ) {
        alert("Please enter a valid range: 1 ≤ min < max ≤ 10000");
        return;
    }
    
    if (rules.length < 1) {
      alert("At least one rule is required")
      return
    }
    for (const rule of rules) {
      if (rule.divisor === "" || !rule.replacement.trim()) {
        alert("All rules must have both a divisor and replacement text")
        return
      }
    }

    // payload
    const payload = {
      gameName: gameName,
      author: author,
      rangeMin: rangeMin,
      rangeMax: rangeMax, 
      rules: rules,
    }

    try {
      const res = await fetch("http://localhost:5271/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json();
      // if (!res.ok) {
      //   // Use the message from the API
      //   alert(data.message || "Failed to create game");
      //   return;
      // }

      alert("Game created successfully!")
      // back to games page
      router.push('/games')
      
    } catch (err) {
      console.error(err)
      alert("Error creating game")
    }
  }

  return (
    <div className="flex justify-center ">
      <fieldset className=" border-gray-500 bg-blue-950/60 fieldset w-full max-w-3xl border border-base-300 rounded-box p-4">
        <legend className="fieldset-legend font-bold text-white text-xl xl:text-2xl">Create a New Game</legend>

        <label className="label text-lg xl:text-lg text-white">Game Name</label>
        <input
          type="text" required value={gameName}
          onChange={(e) => setGameName(e.target.value)} className="bg-gray-100 input xl:input-md  mb-4"
          placeholder="e.g., FizzBuzz"
        />

        <label className="label text-lg xl:text-lg text-white">Your Name</label>
        <input
          type="text" required value={author}
          onChange={(e) => setAuthor(e.target.value)} className="bg-gray-100 input xl:input-md  mb-4"
          placeholder="e.g., John"
        />

        <label className="label text-lg xl:text-lg text-white">Range</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="number"
            required
            value={rangeMin}
            onChange={(e) => setRangeMin(e.target.value === "" ? "" : Number(e.target.value))}
            className=" bg-gray-100 input xl:input-md mb-4"
            placeholder="smallest number allowed"
          />
          <input
            type="number"
            required
            value={rangeMax}
            onChange={(e) => setRangeMax(e.target.value === "" ? "" : Number(e.target.value))}
            className="bg-gray-100 input xl:input-md mb-4"
            placeholder="Biggest Number Allowed"
          />
        </div>

        <label className="label text-lg xl:text-lg text-white">Rules</label>
        <div id="rule-container">
          {rules.map((rule, index) => (
            <div key={index} className="flex  items-center gap-4 mb-4">
              <input
                type="number"
                onChange={(e) => handleChangeRule(index, "divisor", e.target.value)}
                required
                className="bg-gray-100 flex-grow input xl:input-md"
                placeholder="Divisor"
                value={rule.divisor}
              />
              <input
                type="text"
                onChange={(e) => handleChangeRule(index, "replacement", e.target.value)}
                required
                className="bg-gray-100 flex-grow input xl:input-md"
                placeholder="Replacement text"
                value={rule.replacement}
              />
              <button
                onClick={() => handleRemoveRule(index)}
                type="button"
                className="btn bg-blue-950 border-none shadow-none btn-square  btn-sm 2xl:btn-lg flex items-center justify-center"
              >
                <span className='text-red-700 font-bold text-2xl 2xl:text-3xl'>✖</span>
              </button>
            </div>
          ))}
            <button onClick={handleAddRule} type="button" className="btn btn-success 2xl:btn-md">
              Add Rule
            </button>
        </div>

        <button onClick={handleCreateGame} type="button" className="btn bg-blue-700 xl:btn-lg mt-4">
          Create
        </button>
      </fieldset>
    </div>
  )
}

export default GameForm
