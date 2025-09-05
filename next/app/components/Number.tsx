import React from 'react'


const Number = ({number}: NumberProps) => {
  return (
    <div className='w-fit flex flex-col items-center mx-auto '>
        <h1 className='text-4xl font-bold mb-4 text-gray-100'>Current Number</h1>
        <div className='font-bold text-9xl text-cyan-300 border-2 border-gray-100 rounded-lg p-4 mx-auto'>{number}</div>
    </div>
  )
}

export default Number

// item-center makes child div shrink to their content, otherwise, div stretches to fit its parent as normal