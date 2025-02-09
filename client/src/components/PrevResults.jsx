import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../context/AppContext'
import Markdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const PrevResults = () => {

    const {userData} = useContext(AppContent)

    const navigate = useNavigate()


  return (
    <div className='flex justify-center min-h-[100dvh] bg-gradient-to-br from-[#A8377F] to-[#281574] '>
        <div className=""></div>


        {/* -------------home button  */}
        <div onClick={()=>navigate("/")} 
        className="grid place-items-center rounded h-10 w-10 bg-red-400 text-white fixed bottom-5 right-8 cursor-pointer scale-80 lg:opacity-30 hover:opacity-100 hover:scale-100 transition-all "
        >
            <i className="fa-solid fa-house"></i>
        
        </div>


        {/* -----------------logo */}

        <Logo/>

        {
            userData?.prevResult?.length > 0  ?(
                <div className="px-5 sm:px-20 mt-24 mb-10 ">

                    <h2 
                    className=' text-center text text-white font-black tracking-wider sm:text-2xl bg-white/20 p-5 rounded-lg '
                    >
                        🎯 Your Health Insights & 📋 Previous Reports
                    </h2>

                    {
                        [...userData?.prevResult].reverse().map((data, index)=>(
                            <div className="bg-zinc-50 p-5 rounded-lg max-w-[1000px] mt-5" key={index}>
                                {
                                    data ?
                                    <Markdown className="result">{data}</Markdown>
                                    :
                                    <h1>You don't have any previous Reports</h1>
                                }
                                
                                </div>
                        ))
                    }
                </div>
            ):(
                <div className="px-5 sm:px-20 mt-24 mb-10 ">
                    
                    <div className=" grid place-items-center bg-zinc-50 p-5 rounded-lg max-w-[1000px] mt-5">
                            <h1>🔍 "No previous records found! Start fresh and explore now." 🚀</h1>
                            <button onClick={()=>navigate("/questions")} className='btn-primary px-5 mt-10 cursor-pointer text-sm'>Start Now</button>   
                    </div>     
                </div>
            )
        }
    </div>
  )
}

export default PrevResults