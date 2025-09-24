import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import DemoSection from '../components/DemoSection'
import Footer from '../components/Footer'
import { CollaborationSection, FAQSection, FeaturesSection, PricingSection, SecuritySection, SolutionSection } from '../components/HomePageSections'


const HomePage = () => {
  return (
    <div className=''>
      <Navbar />
      <HeroSection />
      <DemoSection />
      <SolutionSection />
      <FeaturesSection />
      <CollaborationSection />
      <SecuritySection />
      {/* <PricingSection /> */}
      <FAQSection />
      <Footer />
    </div>
  )
}

export default HomePage