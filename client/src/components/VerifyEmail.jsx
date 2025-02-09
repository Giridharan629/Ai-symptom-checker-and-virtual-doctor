import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const VerifyEmail = () => {

    const {backendUrl,getUserData,isLoggedIn, userData} = useContext(AppContent)
    const navigate = useNavigate()
    const inputRefs = useRef([])


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

    const SubmitHandler = async(e)=>{
        e.preventDefault()
        try {
            axios.defaults.withCredentials = true

            const otpArray = inputRefs.current.map((e)=>e.value)
            const otp = otpArray.join("")

            const {data} = await axios.post(backendUrl + "/api/auth/verify-otp",{otp})

            if(data.success){
                getUserData()
                toast.success(data.message)
                navigate("/")

            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        isLoggedIn && userData && userData.isAccVerified && navigate("/")
    })

  return (
    <div className="grid min-h-[100dvh] place-items-center p-5 ">
      
      {/* ---------logo------------ */}

      <Logo/>

      <form onSubmit={SubmitHandler}>
        <div className="bg-zinc-50 p-5 rounded-lg max-w-[400px]">
            <h2 className="text-2xl font-semibold text-center mb-4">
            Email Verify OTP
            </h2>

            <p className="text-zinc-700 text-center mb-2">Enter the 6-digit code sent to your email id.</p>

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
                        className="bg-zinc-300 focus:ring-1 focus:outline-0 focus:ring-[#FF625F] h-10 w-10 rounded-md place-items-center "
                        />
                    ))
                }
            </div>

            <div className="grid place-items-center mt-4">
                <button type="submit" className="btn-primary tracking-wider px-5">Verify Email</button>
            </div>
                
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
