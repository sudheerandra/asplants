import React from 'react'
import LatestCollection from '../components/LatestCollection'
import LatestBanner from '../components/LatestBanner'
import Bestseller from '../components/BestSeller'
import DeliveryPromise from '../components/DeliveryPromise'

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