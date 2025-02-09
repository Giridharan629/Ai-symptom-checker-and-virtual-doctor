import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const ForgotPassword = () => {

    const [email, setEmail] =useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isEmailSent, setIsEmeailSent] = useState(false)
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
    const [otp, setOtp] = useState("")
    
    const inputRefs = useRef([])
    const navigate = useNavigate()

    const {backendUrl} = useContext(AppContent)

    axios.defaults.withCredentials = true


    const handleInput = (e,index)=>{
        if(e.target.value.length >0 && index < inputRefs.current.length -1 ){
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e,index)=>{
        if(e.key =="Backspace" && index>0 && e.target.value === ""){
            inputRefs.current[index-1].focus()
        }
    }

    const handlePaste = (e)=>{
        const paste = e.clipboardData.getData("text")
        const pastArray = paste.split("")

        pastArray.forEach((char,index)=>{
                if(inputRefs.current[index]){
                    inputRefs.current[index].value = char
                }
        })
    }

    const onSubmitEmail = async(e)=>{
        e.preventDefault()
        try {

            const {data} = await axios.post(backendUrl + "/api/auth/send-reset-otp",{email})

            if(data.success){

                toast.success(data.message)
                setIsEmeailSent(true)
            
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const onSubmitOtp = (e)=>{
        e.preventDefault()

        const otpArray = inputRefs.current.map((e)=>e.value)
        setOtp(otpArray.join(""))
        setIsOtpSubmitted(true)

    }

    const onSubmitNewPassword = async(e)=>{
        e.preventDefault()
        console.log("in submit new password")
        try {
            const {data} = await axios.post(backendUrl + "/api/auth/reset-password",{email, otp, newPassword})

            console.log(data)

            if(!data.success && data.message =="Invalid OTP"){
                setIsOtpSubmitted(false)
            }

            if(data.success){
                toast.success(data.message)
                navigate("/login")
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {

            toast.error(error.message)
            
        }
    }

  return (
    <div className="grid min-h-screen h-[-webkit-fil-available] place-items-center px-5 ">
      
      <Logo/>

      
      {/* --------------------email-------------- */}

      {!isEmailSent &&

        <form onSubmit={onSubmitEmail}>
            <div className="bg-zinc-50 p-5 rounded-lg  max-w-[400px]">
                <h2 className="text-2xl font-semibold text-center mb-4">
                Reset Password
                </h2>

                <p className="text-zinc-700 text-center mb-2">Please enter registered email id.</p>

                <div className="flex items-center gap-3 mt-3 group bg-zinc-300 p-4 rounded-full group">
                    <i className="fa-regular fa-envelope"></i>
                    <input 
                    type="text" 
                    name='email' 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className='w-full h-full outline-0' placeholder='Email id' 
                    />
                </div>

                
                <div className="grid place-items-center mt-4">
                    <button type="submit" className="btn-primary tracking-wider w-full cursor-pointer">Verify Email</button>
                </div>

            </div>
        </form>

      }

      {/* ------------------otp------------------ */}

      {isEmailSent && !isOtpSubmitted &&  
        <form onSubmit={onSubmitOtp}>
            <div className="bg-zinc-50 p-5 rounded-lg w-full sm:max-w-[400px]">
                <h2 className=" text-lg sm:text-2xl font-semibold text-center mb-4">
                Email Verify OTP
                </h2>

                <p className="text-zinc-700 text-sm sm:text-lg text-center mb-3">Enter the 6-digit code sent to your email id.</p>

                <div className=" flex justify-between items-center" onPaste={handlePaste}>
                    {
                        Array(6).fill(0).map((_,index)=>(
                            <input 
                            type="text" 
                            key={index}
                            required
                            inputMode="numeric"
                            maxLength="1"
                            ref={e=>inputRefs.current[index] = e}
                            onInput={(e)=>handleInput(e,index)}
                            onKeyDown={(e)=>handleKeyDown(e,index)}
                            className="bg-zinc-300 focus:ring-1 focus:outline-0 focus:ring-[#FF625F] h-8 w-8 text-sm sm:text-lg sm:h-10 sm:w-10 rounded-md place-items-center "
                            />
                        ))
                    }
                </div>

                <div className="grid place-items-center mt-4">
                    <button type="submit" className="btn-primary tracking-wider w-full">Enter OTP</button>
                </div>
                    <div onClick={()=>setIsEmeailSent(false)} className="grid place-items-center mt-4 cursor-pointer">
                        <p className="">Want to change Email?</p>
                    </div>
            </div>
        </form>
      }

      {/* -----------------------new password-------------- */}

      {isEmailSent && isOtpSubmitted &&
        <form onSubmit={onSubmitNewPassword}>
            <div className="bg-zinc-50 p-5 rounded-lg sm:max-w-[400px]">
                <h2 className="text-2xl font-semibold text-center mb-4">
                Reset Password
                </h2>

                <p className="text-zinc-700 text-center mb-2">Please Enter New Password.</p>

                <div className="flex items-center gap-3 mt-3 group max-sm:text-sm bg-zinc-300 p-4 rounded-full group">
                    <i className="fa-solid fa-lock"></i>
                    <input 
                    type="text" 
                    name='email' 
                    value={newPassword} 
                    onChange={(e)=>setNewPassword(e.target.value)} 
                    className='w-full h-full outline-0' placeholder='New Password' 
                    />
                </div>

                
                <div className="grid place-items-center mt-4">
                    <button type="submit" className="btn-primary tracking-wider w-full cursor-pointer">Change Password</button>
                </div>

            </div>
        </form>
      }
    </div>
  )
}

export default ForgotPassword