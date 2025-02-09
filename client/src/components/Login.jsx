import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Logo from './Logo'


const Login = () => {

    const navigate = useNavigate()

    const {backendUrl,setIsLoggedIn, getUserData} = useContext(AppContent)


    const [state,setState] = useState("signup")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [age,setAge] = useState("")
    const [gender,setGender] = useState("")

    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true

            if(state==="sign up"){
                const {data} = await axios.post(backendUrl + "/api/auth/register",
                        {
                            name, email, password, age, gender
                        })

                        console.log(data)

                if(data.success){
                    setIsLoggedIn(true)
                    getUserData()
                    navigate("/")
                }else{
                    toast.error(data.message)
                }
            }else{

                const {data} = await axios.post(backendUrl + "/api/auth/login",
                    {
                        email, password
                    })

            if(data.success){
                setIsLoggedIn(true)
                getUserData()
                navigate("/")
            }else{
                toast.error(data.message)
            }

            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const sendOtp = async()=>{
        try {
            axios.defaults.withCredentials = true

            const {data} = await axios.post
        } catch (error) {
            toast.error(error.message)
            
        }
    }


  return (
    <>
    <div  className='flex items-center justify-center h-[100dvh]'>
        
        <Logo/>

        <div className="bg-white p-5 rounded-lg w-[90%]  sm:max-w-96">
            <div className="text-center">
                {
                    state === "sign up" ?
                    <>
                        <h2 className="text-3xl mb-2 font">Create Account</h2>
                        <h3 className="text-gray-600 mb-4">Create your account</h3>
                    </>:
                    <>
                        <h2 className="text-3xl ">Login</h2>
                        <h3 className="text-gray-600 mb-4">Login to your account</h3>
                    </>
                }
            </div>

            <form onSubmit={onSubmitHandler} >


                {
                    state ==="sign up" && <div className="flex items-center gap-3 mt-3 bg-zinc-200/70 p-4 rounded-full group">
                    <i className="fa-regular fa-user"></i>
                    <input 
                    type="text" 
                    name='name' 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                    className='w-full h-full outline-0' placeholder='Full Name' 
                    />
                    </div>
                }
            
            <div className="flex items-center gap-3 mt-3 bg-zinc-200/70 p-4 rounded-full group">
                <i className="fa-regular fa-envelope"></i>
                <input 
                type="text" 
                name='email' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                className='w-full h-full outline-0' placeholder='Email id' 
                />
            </div>
            <div className="flex items-center gap-3 mt-3 bg-zinc-200/70 p-4 rounded-full group">
                <i className="fa-solid fa-lock"></i>
                <input 
                type="text" 
                name='password' 
                value={password}onChange={(e)=>setPassword(e.target.value)} 
                className='w-full h-full outline-0' placeholder='Password'
                />
            </div>

            {
                state ==="sign up" &&
                <>
                <div className="flex items-center gap-3 mt-3 bg-zinc-200/70 p-4 rounded-full group">
                    <i className="fa-regular fa-calendar-days"></i> 
                    <input 
                    type="number" 
                    name='age' 
                    value={age} 
                    onChange={(e)=>setAge(e.target.value)} 
                    className='w-full h-full outline-0' placeholder='Age' 
                    />
                 </div>
                 <div className="flex items-center gap-3 mt-3 bg-zinc-200/70 p-4 rounded-full group">
                    <i className="fa-solid fa-venus-mars"></i>
                    <input 
                    type="text" 
                    name='gender' 
                    value={gender} 
                    onChange={(e)=>setGender(e.target.value)} 
                    className='w-full h-full outline-0' placeholder='Gender' 
                    />
                </div>

                </>
            }

                {
                    state !== "sign up" &&
                    <div  className="mt-4 w-fit hover:text-[#FF625F] hover:underline">
                    <a onClick={()=>navigate("/reset-password")}>Forgot password?</a>
                </div>
                }

                <button type='submit' className='mt-4 py-3 cursor-pointer bg-gradient-to-r from-[#FF625F] to-[#ff3a37] rounded-full text-zinc-50 w-full hover:opacity-90'>
                    {
                        state === "sign up" ? "Sign up" : "Login" 
                    }
                </button>

                <div className="text-center mt-4">
                    {
                        state === "sign up" ?
                        <> 
                            Already have an account?<span onClick={()=>setState("login")} className='text-[#FF625F] cursor-pointer'>Login here</span>
                        </> :
                        <>
                        Don't have an account?<span onClick={()=>setState("sign up")} className='text-[#FF625F] cursor-pointer'>Sign up</span> 
                        </>
                    }
                    
                </div>

            </form>

        </div>
    </div>
    </>
  )
}

export default Login