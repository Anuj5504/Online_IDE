import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import DemoSection from '../components/DemoSection'
import Footer from '../components/Footer'


const HomePage = () => {
  return (
   <div className=''>
         <Navbar/>  
         <HeroSection/>
         <DemoSection/>
         <Footer/>
    </div>
  )
}

export default HomePage