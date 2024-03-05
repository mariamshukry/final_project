import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { userContext } from '../../context/TokenContext';

export default function Signin() {
let {userToken,setToken}=useContext(userContext)
const [isLoading,setLoading] = useState(false)
const [errMsg,setErr]= useState(null)

let navigate =useNavigate()
// Yup
let validationSchema = Yup.object({
email:Yup.string().required('email is required').email('enter avalid email'),
password:Yup.string().required('this password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter avalid password'),
})

async function signIn(val){
setLoading(true)
// console.log(val) object 
let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err)=>{
setErr(err.response.data.message)
setLoading(false)
})
if(data.message == 'success'){
navigate('/home')
localStorage.setItem('userToken',data.token)
setToken(data.token)
setLoading(false)
}
}

let formik =useFormik({
initialValues:{
email:'',
password:'',
},
validationSchema:validationSchema
,
onSubmit:signIn
})

  return (
    <div className='my-5'>
    <h1 className='text-main text-center'>Login Form</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
      <div className="col-md-8 m-auto  bg-light shadow p-4">
      <div className="row  gy-4">
      <div className="col-md-12">
        <label htmlFor='userEmail'>email</label>
        <input type='email' id='userEmail' onBlur={formik.handleBlur} value={formik.values.email} name="email" onChange={formik.handleChange}  className='form-control'/>
        {formik.errors.email && formik.touched.email?
       <p className='text-danger'>{formik.errors.email}</p> : ''
       }
      </div>
   
      <div className="col-md-12">
        <label htmlFor='userPassword'>password</label>
        <input type='password' id='userPassword' onBlur={formik.handleBlur} value={formik.values.password} name="password" onChange={formik.handleChange}  className='form-control'/>
        {formik.errors.password && formik.touched.password?
       <p className='text-danger'>{formik.errors.password}</p> : ''
       }
      </div>
    
      {errMsg !==null ?
      <p className='text-danger'>{errMsg}</p>:''
      }
      <div className="col-md-12 text-end my-2">
      <button  disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login
      {isLoading ?
       <span>
       <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
       </span>
      :
      ''
      }
      </button>
      </div>
      <p className='text-muted'>I have account <Link to="/signin" className='text-main fw-bold'>Register</Link></p>
      </div>
      </div>
     
      </div>
    </form>
    </div>
  )
}
