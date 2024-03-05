import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function Signup() {

const [isLoading,setLoading] = useState(false)
const [errMsg,setErr]= useState(null)

let navigate =useNavigate()
// Yup
let validationSchema = Yup.object({
name:Yup.string().min(3,'minlength is 3').max(15,'maxlength is 15').required('This name is required'),
email:Yup.string().required('email is required').email('enter avalid email'),
phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone is required'),
password:Yup.string().required('this password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter avalid password'),
rePassword:Yup.string().required('this confirm password is required').oneOf([Yup.ref('password')],'not matched'),
})

// custom validation
// function validate(values){
// let errors={}
// if(!values.name){
// errors.name='name is required'
// }else if(values.name.length < 3){
// errors.name ='minlength 3 char'
// }else if(values.name.length > 10 ){
// errors.name ='maxlength is 10 chars'
// }

// if(!values.phone){
// errors.phone = 'phone is required'
// }else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
// errors.phone='enter availd phone number '
// }

// if(!values.email){
// errors.email ='email is required';
// }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
// errors.email='enter avalid email'
// }

// if(!values.password){
// errors.password ='password is required'
// } else if(!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)){
// errors.password ='enter avalid password'
// }

// if(!values.rePassword){
// errors.rePassword ='confirm password is required'
// }else if(values.password !== values.rePassword){
// errors.rePassword ='not matched'
// }

// return errors
// }


async function signUp(val){
setLoading(true)
// console.log(val) object 
let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
setErr(err.response.data.message)
setLoading(false)
})
if(data.message == 'success'){
navigate('/signin')
setLoading(false)
}
}

let formik =useFormik({
initialValues:{
name:'',
email:'',
password:'',
rePassword:'',
phone:''
},
validationSchema:validationSchema
,
onSubmit:signUp
})

  return (
    <div className='my-5'>
    <h1 className='text-main text-center'>Register Form</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
      <div className="col-md-8 m-auto  bg-light shadow p-4">
      <div className="row  gy-4">
     
      <div className="col-md-12">
        <label htmlFor='userName'>name</label>
        <input type='text' id='userName' onBlur={formik.handleBlur} value={formik.values.name} name="name" onChange={formik.handleChange} className='form-control'/>
       {formik.errors.name && formik.touched.name?
       <p className='text-danger'>{formik.errors.name}</p> : ''
       }
      </div>
      <div className="col-md-12">
        <label htmlFor='userEmail'>email</label>
        <input type='email' id='userEmail' onBlur={formik.handleBlur} value={formik.values.email} name="email" onChange={formik.handleChange}  className='form-control'/>
        {formik.errors.email && formik.touched.email?
       <p className='text-danger'>{formik.errors.email}</p> : ''
       }
      </div>
      <div className="col-md-12">
        <label htmlFor='userPhone'>phone</label>
        <input type='tel' id='userPhone' onBlur={formik.handleBlur} value={formik.values.phone} name="phone" onChange={formik.handleChange}  className='form-control'/>
        {formik.errors.phone && formik.touched.phone?
       <p className='text-danger'>{formik.errors.phone}</p> : ''
       }
      </div>
      <div className="col-md-12">
        <label htmlFor='userPassword'>password</label>
        <input type='password' id='userPassword' onBlur={formik.handleBlur} value={formik.values.password} name="password" onChange={formik.handleChange}  className='form-control'/>
        {formik.errors.password && formik.touched.password?
       <p className='text-danger'>{formik.errors.password}</p> : ''
       }
      </div>
      <div className="col-md-12">
        <label htmlFor='userConfirm'>rePassword</label>
        <input type='password' id='userConfirm' onBlur={formik.handleBlur} value={formik.values.rePassword} name="rePassword" onChange={formik.handleChange}  className='form-control'/>
        {formik.errors.rePassword && formik.touched.rePassword?
       <p className='text-danger'>{formik.errors.rePassword}</p> : ''
       }
      </div>
      {errMsg !==null ?
      <p className='text-danger'>{errMsg}</p>:''
      }
      <div className="col-md-12 text-end my-2">
      <button  disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register
      {isLoading ?
       <span>
       <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
       </span>
      :
      ''
      }
      </button>
      </div>
      <p className='text-muted'>I have account <Link to="/signin" className='text-main fw-bold'>Login</Link></p>
      </div>
      </div>
     
      </div>
    </form>
    </div>
  )
  // break 9:00
}
