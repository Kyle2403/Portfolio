import React from 'react'


const RuleList = ({rules}: {rules:Rule[]}) => {
  return (
    <ul className="list">
        <li className="px-4 pt-1 pb-2 text-xl font-semibold opacity-60 tracking-wide">Rules</li>
        {rules.map((rule,i)=> (
            <li key = {i} className="list-row">
                <div className="text-4xl font-thin tabular-nums">{i+1}</div>
                {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div> */}
                <div className="list-col-grow">
                    <div>Divisor: {rule.divisor}</div>
                    <div className="text-xs font-semibold opacity-60">Replacement text: {rule.replacement}</div>
                </div>
                
            </li>
        ))}
    </ul>
  )
}

export default RuleList