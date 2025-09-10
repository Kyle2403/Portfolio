import React from 'react'
import Link from 'next/link'
import {  FaArrowRight,  FaExternalLinkAlt} from 'react-icons/fa'
const ProjectCard = ({title,description,technologies,link,isExternal, color, icon:Icon, iconSize}: ProjectProps) => {
  return (
    <Link title ="View project" target={isExternal ? "_blank" : "_self"} rel={isExternal ? "noopener noreferrer" : ""} href={link} className={`group bg-gradient-to-br ${color} backdrop-blur-sm rounded-xl p-6 hover:brightness-110 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700/50 `}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white  transition-colors duration-300">
              <Icon className={iconSize} />{title}
            </h3>
            {isExternal ? (
              <FaExternalLinkAlt className="text-gray-400 group-hover:text-white transition-colors duration-300" />
            ) : (
              <FaArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            )}
          </div>
          
          <p className="text-white mb-4 leading-relaxed"> {description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-700/70 rounded-full text-sm text-gray-200 font-medium">
                {tech}
              </span>
            ))}
          </div>
          
        </Link>
  )
}

export default ProjectCard