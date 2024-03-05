import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function Products() {
let {addToCart,setCartNumber}=useContext(cartContext)

const [productList,setProduct]=useState([])
async function getProducts(){
let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
// console.log(data.data);
setProduct(data.data)
}

async function addToMyCart(id){
let {data} = await addToCart(id)
if(data.status == 'success'){
  toast.success(data.message);
  setCartNumber(data.numOfCartItems)
  
}
}


useEffect(()=>{
getProducts()
},[])

  return (
    <div className='row'>
            <Helmet>
                <title>Products</title>
            </Helmet>
    {productList.length >0 ?
    <>
      {productList.map((product)=>{
       return <div className="col-md-3" key={product._id}>
          <div className="product p-5">
          <Link  to={`/details/${product._id}`}>
          <img src={product.imageCover} className='w-100' alt={product.title}/>
           <p className='text-main'>{product.category.name}</p>
           <h6>{product.title}</h6>
           <div className='d-flex justify-content-between'>
            <p>{product.price} EGp</p>
            <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></p>
           </div>
          </Link>
           <button onClick={()=>{addToMyCart(product._id)}} className='btn bg-main text-light w-100'>Add to cart</button>
          </div>
       </div>
      })
      }
    </>
    :
    <div className='vh-100 d-flex justify-content-center align-items-center'>
     <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
   
    
    }
    
    </div>
  )
}
