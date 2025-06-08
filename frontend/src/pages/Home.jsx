import React from 'react'
import Hero from '../components/Hero'
import LatestCurrency from '../components/LatestCurrency'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero   />
      <LatestCurrency />
      <BestSeller />
      <OurPolicy />
      <Newsletter />
    </div>
  )
}

export default Home