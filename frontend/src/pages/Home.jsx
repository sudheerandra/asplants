import React from 'react'
import LatestCollection from '../components/LatestCollection'
import LatestBanner from '../components/LatestBanner'
import DeliveryPromise from '../components/DeliveryPromise'
import Bestseller from "../components/Bestseller"

const Home = () => {
  return (
    <div>
      <LatestBanner/>
      <DeliveryPromise />
      <LatestCollection/>
      <Bestseller/>
    </div>
  )
}

export default Home