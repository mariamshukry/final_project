import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../context/counterContext'
import { userContext } from '../../context/TokenContext'
import { cartContext } from '../../context/cartContext';

export default function Navbar() {
let {userToken,setToken} = useContext(userContext);
let {cartNumber,getCart,setCartNumber}=useContext(cartContext)

let navigate = useNavigate()
function logout(){
localStorage.removeItem('userToken');
setToken(null);
navigate('/signin')
}
// break 8:50
useEffect(()=>{
  (async ()=>{
   let data = await getCart();
  //console.log(data.data.data)
  setCartNumber(data.data.numOfCartItems)
  //console.log(data.data.numOfCartItems)
  })()
  },[])

  return (
    <>
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"
    >
      <div className="container">
        <a className="navbar-brand" href="#">
        <i className="fa-solid  text-main fa-cart-shopping"></i><span className='fw-bold'>FreshCart</span></a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
        {userToken !== null ?
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="product">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="category">Categaries</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="brands">Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="wishlist">wish list</Link>
          </li>
        </ul>
        :''
        }
        
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
           {
            userToken == null ?
            <>
              <li className="nav-item">
              <Link className="nav-link" to="signup">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="signin">Login</Link>
            </li>
            </>
            : ''
           }
          
            {userToken !==null ?
            <>
             <li className="nav-item d-flex align-items-center">
             <i className="fa-brands fa-facebook mx-3"></i>
             <i className="fa-brands fa-twitter mx-3"></i>
             <i className="fa-brands fa-instagram mx-3"></i>
             <i className="fa-brands fa-linkedin mx-3"></i>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="cart">
            <i className='fa-solid fa-shopping-cart text-main'></i>
            <span className='badge bg-main text-light'>{cartNumber}</span>
            </Link>
            </li>
            <li onClick={()=>{logout()}} className="nav-item">
              <Link className="nav-link">Logout</Link>
            </li>
            </>:
            
            ''
            }
           
          </ul>
        </div>
      </div>
    </nav>
    
    
    
    </>
  )
}
