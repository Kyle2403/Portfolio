import React from 'react'
import NavigationBar from '@/app/components/NavigationBar'
import GameForm from '@/app/components/GameForm'
import Footer from '@/app/components/Footer'
import BreadCrumbs from '@/app/components/BreadCrumbs'
const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <BreadCrumbs links={[{text: "Games", href:"/games"},{text: "New Game", href:""} ]}></BreadCrumbs>
        {/* wrapper div controls flex-grow */}
        <main className="flex-grow bg-black/40">
            <GameForm />
        </main>

        <Footer />
    </div>
  )
}


export default Page