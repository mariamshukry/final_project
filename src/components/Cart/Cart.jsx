import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
const [data,setData]=useState([])
const [cartPrice,setPrice]=useState([])
let {getCart,deleteCart,setCartNumber,updateCart}=useContext(cartContext);

useEffect(()=>{
(async ()=>{
 let data = await getCart();
//  console.log(data.data.data)
 setData(data.data.data.products)
 setPrice(data.data.data.totalCartPrice)
})()
},[])

async function removeProcduct(id){
let data =await deleteCart(id)
setData(data.data.data.products)
setCartNumber(data.data.numOfCartItems)
}

async function updateProcduct(id,count){
if(count == 0){
deleteCart(id)
}else{
  let data =await updateCart(id,count)
  setData(data.data.data.products)
  setCartNumber(data.data.numOfCartItems)
}
}

  return (
    <div className='container'> 
    <h2>Shopping Cart</h2>
    <Link to="/checkout">
    <button class="btn bg-main text-light">onlinePayment</button>
    </Link>
      <div className="row">
        <div className="col-md-11 bg-main-light shadow p-5 m-auto my-5">
        <h3><span className='text-main fw-bold'>ToTal Price </span>{cartPrice}</h3>
         {data.map((product)=>{
         return <>
         {/* {product.count !==0 ? */}
          <div className="row border-bottom py-5" key={product._id}>
          <div className="col-md-1">
          <img src={product.product.imageCover} className='w-100' alt="cover"/>
          </div>
          <div className="col-md-11 d-flex justify-content-between align-items-center">
            <div>
            <h5>{product.product.title}</h5>
            <p>{product.price}</p>
            <button onClick={()=>{removeProcduct(product.product._id)}} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can'></i>Remove</button>
            </div>
            <div>
            <button onClick={()=>{updateProcduct(product.product._id,product.count+1)}} className='btn btn-outline-success'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=>{updateProcduct(product.product._id,product.count-1)}} className='btn btn-outline-success'>-</button>
            </div>
          </div>
          </div>
          {/* :
          ''
         } */}
         </>
        
         })}
        
        </div>
      </div>
    </div>
  )
}
