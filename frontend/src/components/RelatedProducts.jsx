import React, { useContext, useEffect, useState } from 'react'
import Title from "../components/Title";
import { ShopContext } from '../context/ShopContext';
import ProductItems from "../components/ProductItems";

const RelatedProducts = ({category, subCategory}) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(()=>{
        if(products.length > 0){
            let _products = products.slice();
            _products = _products.filter((item)=> category === item.category);
            _products = _products.filter((item)=> subCategory === item.subCategory)
            setRelated(_products.slice(0,5));
            
        }
    },[products])
 
  return (
    <div className='my-15'>
      <div className='text-center text-2xl'>
        <Title text1="RELATED" text2="PRODUCTS"/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
    {
        related.map((item, index)=>(
          <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image} scrollToTop = {true}/>
        ))
    }
      </div>
    </div>
  )
}

export default RelatedProducts