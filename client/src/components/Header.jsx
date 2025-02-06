import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {

  const navigate = useNavigate()
  const [toggle,setToggle] = useState(false)
  const profileRef = useRef()
 
  const {isLoggedIn,setIsLoggedIn,userData,setUserData, backendUrl} = useContext(AppContent)

  
  useEffect(()=>{

    const handleOutsideClick = (event)=>{
      if(profileRef.current && !profileRef.current.contains(event.target)){
        setToggle(false)
      }
    }

    if(toggle){
      document.addEventListener("mousedown",handleOutsideClick)
    }

    return ()=>{
      document.removeEventListener("mousedown",handleOutsideClick)
    }

  },[toggle])

  const sendOtp = async()=>{
    try {
      
      axios.defaults.withCredentials = true

      const {data} = await axios.post(backendUrl + "/api/auth/send-verify-otp")

      if(data.success){
        navigate("/verify-email")
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.message)
      
    }
  }

  const logout = async()=>{
    try {

      axios.defaults.withCredentials = true
      
      const {data} = await axios.get(backendUrl + "/api/auth/logout")

      if(data.success){
        setIsLoggedIn(false)
        setUserData(false)
        navigate("/")
      }else{
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.message)
      
    }
  }

  return (
    <div className="absolute top-0 p-5 sm:px-20 w-full max-w-[1500px] left-[50%] translate-x-[-50%]  m-auto flex justify-between items-center sm:px-20">
      <div className="flex items-center gap-4">
        <div className="">
          <img 
          src="/images/logo1.png" 
          alt="" 
          height={40} 
          width={40} 
          />
        </div>


        <h1 
        className="text-2xl font-semibold tracking-widest text-zinc-50 cursor-default"
        >
          SEESHA
        </h1>

      </div>
      {
        isLoggedIn ?(
          <div onClick={()=>setToggle(!toggle)} ref={profileRef} className="h-8 w-8 relative group bg-zinc-50 flex items-center justify-center rounded-full text-xl font-black text-[#FF625F] ring-2 cursor-pointer">
            {userData?.name?.[0]}
            <div className={!toggle ? "border-4 w-[8rem] absolute origin-top-right rounded-lg blur-2xl opacity-0 scale-0 transition-all text-sm bg-zinc-50 p-1 top-9 right-0" 
              : "w-[8rem] absolute origin-top-right rounded-lg blur-none opacity-100 scale-100 transition-all text-sm bg-zinc-50 p-1 top-9 right-0"}>
              {
              !userData.isAccVerified && <p onClick={sendOtp} className=" cursor-pointer p-2 hover:bg-[#FF625F] hover:text-white rounded-sm transition-colors font-normal">Verify Email</p>
              }
              
              <p 
              onClick={()=>navigate("/profile")} 
              className=" cursor-pointer p-2 hover:bg-[#FF625F] hover:text-white rounded-sm transition-colors font-normal"
              >
                Profile
              </p>

              <p 
              onClick={()=>navigate("/prev-results")} 
              className=" cursor-pointer p-2 hover:bg-[#FF625F] hover:text-white rounded-sm transition-colors font-normal"
              >
                Past Results
              </p>

              <p 
              onClick={logout} 
              className=" cursor-pointer p-2 hover:bg-[#FF625F] hover:text-white rounded-sm transition-colors font-normal"
              >
                Logout
              </p>

            </div>
          </div>
        ) :<button className=" py-2 px-4 ring-1 ring-white text-white rounded-full cursor-pointer hover:scale-103 hover:bg-white hover:text-[#FF625F] transition-all" onClick={()=>navigate("/login")}>Login <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
      }
      
    </div>
  );
};

export default Header;
