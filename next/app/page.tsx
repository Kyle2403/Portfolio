import Link from 'next/link'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'
import ExperienceCard from './components/ExperienceCard'
import { FaFilePdf, FaEnvelope, FaPhone,FaLinkedin, FaUser, FaRobot, FaAddressCard, FaCode, FaBriefcase,FaGraduationCap, FaChevronUp  } from 'react-icons/fa';
import { FaMap } from 'react-icons/fa'
import { GiGamepad } from 'react-icons/gi'




export default async function Home() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5271";
  fetch(`${backendUrl}/game`, { cache: "no-store" }).catch(() => {});
  return (
    
    // flex grow + flex flex col min-h-screen on parent to make the main take up rest of content after footer is set
    <div className="flex flex-col text-white ">
      <NavigationBar/>
     
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <main id="main" className = "min-h-screen flex flex-col items-center pt-[30vh] snap-start">
          <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 animate-fadeIn text-white'>Good day</h1>
          <h2 className='hidden md:block text-xl sm:text-2xl lg:text-3xl text-gray-300 font-medium mb-4 lg:mb-7'>Welcome to my portfolio website!</h2>
          <h2 className="px-2 font-extrabold md:hidden text-gray-300 mb-4 lg:mb-7">
            For the best experience, please view on a laptop or iPad. Mobile layout is not styled yet.
          </h2>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Link href="#about-me" className="btn btn-primary hover:bg-transparent btn-md sm:btn-lg lg:btn-xl text-white"><FaAddressCard className="mr-1 text-2xl" />About Me</Link>
            <Link title="View and chat with my resume in real time" href="https://about.kyle24.com/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary hover:scale-105 btn-md sm:btn-lg lg:btn-xl text-white"><FaRobot className="mr-1 text-2xl" />Resume Bot</Link>
            <Link title="Upload a PDF to generate a searchable version with text you can copy and search" href="/ocr" className="btn btn-accent hover:animate-pulse btn-md sm:btn-lg lg:btn-xl text-white"><FaFilePdf className="mr-1 text-xl" /> OCR PDF</Link>
            <Link title="Play the classic FizzBuzz game or create your own custom versions" href="/games" className="btn btn-info  hover:scale-95 btn-md sm:btn-lg lg:btn-xl text-white"><GiGamepad className="mr-1 text-3xl" />FizzBuzz</Link>
            

          </div>
        </main>

        <section id="about-me" className="p-20 lg:p-52 lg:pt-24 min-h-screen flex flex-col items-center xl:flex-row bg-black/40 snap-start">
            <img src="/metransparent.png" className=" bg-blue-900/40 xl:hidden w-64 h-auto rounded-full shadow-2xl my-12"/>
            <div className='pl-20'>
                <h1 className="text-5xl font-bold">Ky Le</h1>
                <p className="py-4 xl:pr-36 font-semibold">
                  I&apos;m a software developer and data scientist passionate about creating meaningful technology solutions.
                  I enjoy working at the intersection of AI, web development, and data science.
                </p>
                <div className='space-x-3'>
                    <Link href="#skills" className="btn bg-emerald-500 hover:bg-emerald-600 hover:scale-105 btn-sm sm:btn-md lg:btn-md text-white"><FaCode className="mr-1 text-lg"/>My Skills</Link>
                    <Link href="#experience" className="btn bg-amber-600 hover:bg-amber-700 hover:scale-105 btn-sm sm:btn-md lg:btn-md text-white"><FaBriefcase className="mr-1 text-lg"/>My Experience</Link>
                    <Link href="#education" className="btn bg-purple-500 hover:bg-purple-600 hover:scale-105 btn-sm sm:btn-md lg:btn-md text-white"><FaGraduationCap className="mr-1 text-xl"/>My Education</Link>
                </div>
            </div>
            <img src="/metransparent.png" className="mt-8 hidden bg-blue-900/40 xl:block w-96 h-auto rounded-full shadow-2xl "/>        
        </section>

        
        <section id="skills" className="px-10 pt-24 min-h-screen bg-black/40 flex flex-col items-center snap-start">
            <p className='font-semibold text-4xl pb-9'>Technical Skills</p>
            <div className="flex w-full flex-col ">
              {/* Languages */}
              <div className="card rounded-box grid h-32 grow place-items-center mb-16">
                <div className='flex flex-col items-center'> 
                  <p className='font-light text-2xl'>Languages</p>
                  <div className="flex gap-8 items-center mt-5">
                    <img src="/icons/python.svg" alt="Python" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                    <img src="/icons/csharp.svg" alt="C#" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                    <img src="/icons/typescript.svg" alt="TypeScript" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                    <img src="/icons/java.svg" alt="Java" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                    <img src="/icons/r.svg" alt="R" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                    <img src="/icons/sql.svg" alt="SQL" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                  </div>
                </div>
              </div>


              {/* Frameworks */}
              <div className="card rounded-box grid h-32 grow place-items-center mb-16">
                <div className='flex flex-col items-center'>
                    <p className='font-light text-2xl'>Frameworks</p>
                    <div className="flex gap-8 items-center mt-4">
                      <img src="/icons/react.svg" alt="React" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                      <img src="/icons/nextjs.svg" alt="NextJs" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                      <img src="/icons/flask.svg" alt="Flask" className="h-12 w-auto transform transition duration-300 hover:scale-110 "/>
                      <img src="/icons/pytorch.svg" alt="PyTorch" className="h-12 w-auto transform transition duration-300 hover:scale-110 "/>
                      <img src="/icons/llamaindex.svg" alt="LLama Index" className="h-12 w-auto transform transition duration-300 hover:scale-110 "/>
                      <img src="/icons/dotnet2.svg" alt=".NET" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                      <img src="/icons/expressjs.svg" alt="ExpressJs" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                    
                    </div>
                </div>
              </div>

              {/* Deployment / DevOps */}
              <div className="card rounded-box grid h-32 grow place-items-center">
                <div className='flex flex-col items-center'>
                    <p className='font-light text-2xl'>Deployment / DevOps</p>
                    <div className="flex gap-8 items-center mt-4">
                      <img src="/icons/docker.svg" alt="Docker" className="h-20 w-auto transform transition duration-300 hover:scale-110"/>
                      <img src="/icons/aws.svg" alt="AWS" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                      <img src="/icons/github.svg" alt="GitHub" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                      <img src="/icons/vercel.svg" alt="Vercel" className="h-12 w-auto transform transition duration-300 hover:scale-110"/>
                      <img src="/icons/render.svg" alt="Render" className="h-12 w-auto transform transition duration-300 hover:scale-110 "/>
                    </div>
                </div>
            
              </div>
            </div>
        </section>


        <section id="experience" className="pt-20 min-h-screen bg-black/40 flex flex-col items-center snap-start">
            <p className='font-semibold text-4xl pb-8'>Experience</p>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-7 lg:gap-14 px-20 lg:px-44'>
                <ExperienceCard
                  imageUrl="/companies/ambersoft.png"
                  company="Ambersoft"
                  role="Software Developer"
                  time="06/2024 – Present"
                  description={[
                    "Built **AI-powered** document search app with **Flask**, **LlamaIndex** and **.NET**, cutting query time from **5–10 min to <30 sec**",
                    "Designed frontend with **Next.js**, **React**, **TypeScript** for a smooth user experience",
                    "Deployed on **AWS** with autoscaling, supporting **5×** traffic spikes",
                  ]}
                />
                
                <ExperienceCard
                  imageUrl='/companies/lifeskillsgroup.png'
                  company='Life Skills Group'
                  role="Backend Developer Intern"
                  time = "08/2024 – 10/2024"
                  description={[
                    "Built **Node.js/Express** backend for a wellbeing report system, automating workflows.",
                    "Optimized **MySQL** queries and integrated data visualization for actionable insights.",
                    "Collaborated on a microsite and rigorously tested APIs for performance."
                  ]}
                />
                
                <ExperienceCard
                  imageUrl='/companies/nswstudy.png'
                  company='Study NSW'
                  role="Technology Analyst"
                  time = "06/2025 – 07/2025"
                  description={[
                    "Evaluated SSI tech for Indigenous entrepreneurs.",
                    "Created a phased SSI adoption roadmap and identified strategic partners.",
                    "Developed a framework for equitable tech access and Indigenous-led governance."
                  ]}
                />

                <ExperienceCard
                  imageUrl='/companies/selfemployed.jpeg'
                  company=''
                  role="Computer Science Tutor"
                  time = "02/2024 – 06/2025"
                  description={[
                    "Tutored Computer Science and Machine Learning, helping a student rank top in assignments.",
                    "Simplified complex topics and designed personalized study plans.",
                    "Encouraged critical thinking and independent learning."
                  ]}
                />

            </div>
        </section>

        <section id="education" className="pt-20 px-36 min-h-screen bg-black/40 flex flex-col items-center snap-start">
          <p className='font-semibold text-4xl pb-2 '>Education</p>
          <div className="max-w-3xl text-white px-4 text-center md:text-left space-y-1 pb-1">
              <h3 className="text-2xl font-semibold">Bachelor of Advanced Computing (First Class Honours)</h3>
              <p className="italic">The University of Sydney</p>
              <ul className="list-disc list-inside mt-2 text-gray-100">
                <li>Major in Software Development and Data Science</li>
                <li>Overall WAM: 83</li>
                <li>Dean&apos; List of Excellence in Academic Performance (2024)</li>
              </ul>
            </div>
          <div className='flex flex-col w-full items-center'>
            <figure className="diff w-full max-w-2xl aspect-[3/2]" tabIndex={0}>
              <div className="diff-item-1">
                <img alt="Usyd Day" src="/usydDay.jpg" className="" />
              </div>
              <div className="diff-item-2">
                <img alt="Usyd Night" src="usydNight2.jpg" className=""/>
              </div>
              <div className="diff-resizer "></div>
            </figure>
            <p className='text-sm text-gray-200 italic font-light tracking-wide pt-1'>*Drag the slider in the middle of the image to compare day and night views</p>
            
          </div>
        </section>
        <div className="h-12 bg-black/40"></div>
        <footer className="snap-start">
          <Footer />
        </footer>
        
        <div className="fab fixed bottom-10 right-8 flex flex-col items-center">
          {/* Hidden toggle checkbox */}
          <input type="checkbox" id="fab-toggle" className="hidden peer" />

          <div className="fab-buttons flex-col gap-3 mb-2 hidden peer-checked:flex">
            <Link href="#main" title="Go to Top" className="btn btn-lg bg-cyan-400 hover:bg-cyan-800 text-white btn-circle"><FaChevronUp  className='text-xl'/></Link>
            <Link href="#about-me" title="About Me" className="btn btn-lg btn-primary hover:bg-indigo-900 btn-circle"><FaAddressCard  className='text-xl'/></Link>
            <Link href="#skills" title="Skills" className="btn btn-lg bg-emerald-500 hover:bg-emerald-700 btn-circle"><FaCode className='text-lg'/></Link>
            <Link href="#experience" title="Experience" className="btn btn-lg bg-amber-600 hover:bg-amber-800 btn-circle"><FaBriefcase  className='text-lg' /></Link>
            <Link href="#education" title="Education" className="btn btn-lg bg-purple-500 hover:bg-purple-700 btn-circle"><FaGraduationCap className='text-xl' /></Link>
          </div>

          <label
            htmlFor="fab-toggle"
            className="btn btn-xl btn-circle hover:bg-blue-900 border border-white/50 bg-blue-700 cursor-pointer"
            title="Navigation"
          >
            <FaMap className='text-3xl' />
          </label>
        </div>

        <div className="fab fixed bottom-10 left-8 flex flex-col items-center">
          <input type="checkbox" id="contact-fab-toggle" className="hidden peer" />

          {/* Contact buttons */}
          <div className="fab-buttons flex-col gap-3 mb-2 hidden peer-checked:flex">
            <a href="mailto:kyletan24003@gmail.com" title="Email Me" className="btn btn-lg bg-rose-600 hover:bg-rose-900 text-white btn-circle">
              <FaEnvelope className="text-xl" />
            </a>
            <a href="tel:+61404711829" title="Call Me" className="btn btn-lg bg-green-500 hover:bg-green-700 text-white btn-circle">
              <FaPhone className="text-xl -scale-x-100" />
            </a>
            <a href="https://www.linkedin.com/in/kyle24/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="btn btn-lg bg-blue-600 hover:bg-blue-800 text-white btn-circle">
              <FaLinkedin className="text-xl" />
            </a>

          </div>
          <label
            htmlFor="contact-fab-toggle"
            className="btn btn-xl btn-circle border border-white/50 bg-red-700 hover:bg-red-950 cursor-pointer"
            title="Contact Me"
          >
            <FaUser />
          </label>
        </div>


      </div>
    </div>
  )
}

// Avoid hardcoded sizes → use relative units (rem, Tailwind scale)
// sm:	640px	Small devices, larger phones, tablets in portrait
// md:	768px	Medium devices, tablets in landscape, small laptops
// lg:	1024px	Large devices, desktops and laptops
// xl:	1280px	Extra-large desktops, big monitors
// 2xl:	1536px	Very large screens, 4K monitors etc.
// since the utility classes default to mobile size (<640), it's best
// that i do lg: (covers my lap and monitor) for all classes and later come back and define a another
// size for smaller ones
// i think i would prefer size defined by class name rather than props