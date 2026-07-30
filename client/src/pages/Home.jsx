import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/hero'
import AITool from '../components/AITool'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <main className='pt-24'>
        <Hero />
        <AITool />
        <Testimonial />
        <Plan />
      </main>
      <Footer />
    </>
  )
}

export default Home
