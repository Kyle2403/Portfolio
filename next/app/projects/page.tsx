
import React from 'react'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { FaChartBar, FaLaptopCode, FaRobot, FaFilePdf, FaBug } from 'react-icons/fa'
import ProjectCard from '../components/ProjectCard'
import { GiGamepad } from 'react-icons/gi'

const page = () => {
  const softwareProjects = [
    {
      title: "Resume Bot",
      description: "Interactive AI chatbot that allows users to chat with and explore my resume in real-time. Built with modern AI integration.",
      technologies: ["Llama Index", "AI/ML", "Flask", "Next.js"],
      link: "https://about.kyle24.com/",
      isExternal: true,
      color: "from-indigo-500 to-purple-600",
      icon: FaRobot,
      iconSize: "text-2xl"
    },
    {
      title: "OCR PDF Tool",
      description: "Upload scanned PDF documents to generate searchable versions with copyable text using optical character recognition.",
      technologies: [ "OCR", "Python", "AWS Lambda", "Next.js"],
      link: "/ocr",
      isExternal: false,
      color: "from-green-600 to-emerald-600",
      icon: FaFilePdf,
      iconSize: "text-xl"
    },
    {
      title: "FizzBuzz Game",
      description: "Interactive game allowing users to create and play personalized FizzBuzz-style games.",
      technologies: [".NET", "Next.js", "Game Logic"],
      link: "/games",
      isExternal: false,
      color: "from-cyan-500 to-blue-500",
      icon: GiGamepad,
      iconSize: "text-3xl"
    }
  ];

  const dataProjects = [
    {
      title: "Fuzzing Visualization",
      description: "Data visualization project analyzing fuzzing test results with charts and insights.",
      technologies: ["Pandas", "AFL++", "Visualization"],
      link: "/fuzzing", // Update with actual link
      isExternal: false,
      color: "from-red-600 to-pink-600",
      icon: FaBug,
      iconSize: "text-xl"
    }
  ];

  

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
        <NavigationBar></NavigationBar>
        <div className='flex-grow mt-20 mx-auto px-6 sm:px-10 w-full max-w-7xl'>
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 mt-6">My Projects</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto"> Explore my work across software development and data science</p>
            </div>

            {/* Software Projects Section */}
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
                        <FaLaptopCode className="text-2xl text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Software Projects</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {softwareProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>

            {/* Data Projects Section */}
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-800 rounded-xl">
                        <FaChartBar className="text-2xl text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Data Projects</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>

            
        </div>
        
        <Footer/>
    </div>
  )
}

export default page