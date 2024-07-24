import { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import {useNavigate} from 'react-router-dom'
function Form(
  {
    isSignInPage=true,
  }
) {

  const navigate=useNavigate();
const [data,setdata]=useState({
   ...(isSignInPage&& {fullName:''}),
   email:'',
   password:''
})

  return (
    <div className=' bg-[#e1edff] h-screen flex justify-center items-center'>

   
    <div className=" bg-white shadow-lg  w-[600px] h-[800px]  rounded-lg flex  flex-col  justify-center items-center">
     <div className=" text-4xl font-extrabold">Welcome {isSignInPage&&'Back'}</div>
     <div className=" text-4xl font-light mb-14">{isSignInPage?"Sign in to get explore":"Sign up now to get Started"}</div>
     <form onSubmit={()=>{
      console.log("data",data);
     }} className="flex flex-col w-full items-center">
     {!isSignInPage&&<Input label="Full Name" name="name" placeholder="Enter Your Full Name" className=" mb-6" value={data.fullName} onChange={(e)=>setdata({...data,fullName:e.target.value})}></Input>}
     <Input label="Email" type="email" name="email" placeholder="Enter Your Email" className=" mb-6" value={data.email} onChange={(e)=>setdata({...data,email:e.target.value})}></Input>
     <Input label="Password" type="password" name="password" placeholder="Enter Your Password" className=" mb-14" value={data.password} onChange={(e)=>setdata({...data,password:e.target.value})}></Input>
    <Button label={ isSignInPage?"Sign in":"Sign up"} type='submit' className=" w-full  mb-4"></Button>
    </form>
    <div>{isSignInPage?"Didn't have an account":"Already have an account?"}<span className=" text-primary cursor-pointer underline ml-2" onClick={()=>navigate(`/api/${isSignInPage?"Signup":"Signin"}`)}>{isSignInPage?"Sign up":"Sign in"}</span></div>
    </div>
    </div>
  )
}

export default Form
