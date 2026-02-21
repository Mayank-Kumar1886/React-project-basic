import React from 'react'
import HeroSection from '../components/HeroSection'
import Stats from '../components/Stats'
import HomeListing from '../components/HomeListing'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import SearchByLocation from '../components/SearchByLocation'
import DiscoverByAmenities from '../components/DiscoverByAmenities'
import Testimonials from '../components/Testimonials'
import HelpSection from '../components/HelpSection'
import InquireAboutListing from '../components/InquireAboutListing'
import BlogSection from '../components/BlogSection'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ/FAQ'

const Home = () => {
  return (
    <div >
      <HeroSection/>
      <Stats/>
      <HomeListing/>
      <Services/>
      <HowItWorks/>
      <SearchByLocation/>
      <DiscoverByAmenities/>
      <Testimonials/>
      <HelpSection/>
      <InquireAboutListing/>
      <BlogSection/>
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default Home