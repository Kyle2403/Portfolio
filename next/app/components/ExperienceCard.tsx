import React from 'react'
import ReactMarkdown from "react-markdown";

const ExperienceCard = ({imageUrl, company, role, description, time}:ExperienceCardProps) => {
  return (
    <div className="card card-side rounded-lg pt-2 pb-0 px-4 border border-gray-600 bg-slate-950 hover:bg-slate-800 shadow-sm w-full  flex flex-col">
        <div className='flex justify-between'>
            <h2 className="card-title text-xl font-bold">{role} </h2>
            <p className='font-semibold italic'> {company} </p>
            
        </div>
       

        <div className='flex items-center'>
            <div className='w-2/3 flex flex-col items-center'>
                <img src={imageUrl} alt={`${company} logo`} className='w-28 h-28 lg:w-40 lg:h-40'/>
                <p className='font-light italic pt-1 text-sm'> {time} </p>
            </div>
            
            <div className="card-body">
                <ul className="list-disc pl-5 space-y-1">
                    {description.map((item, index) => (
                        <li key={index} className="text-gray-200 font-medium">
                        <ReactMarkdown
                            components={{
                            strong: ({ node, ...props }) => (
                                <span className="font-black" {...props} />
                            ),
                            p: 'span' // keeps text inline with the bullet
                            }}
                        >
                            {item}
                        </ReactMarkdown>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    </div>
  )
}

export default ExperienceCard