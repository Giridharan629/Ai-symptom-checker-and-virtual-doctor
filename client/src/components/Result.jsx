import React, { useContext, useState } from 'react'
import Markdown from "react-markdown"
import Header from './Header'
import Loader from './Loader'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

const Result = () => {

  const {result, backendUrl,getUserData, setResult} = useContext(AppContent)
  const navigate = useNavigate()

  const [saved, setSaved] = useState("notSaved")

  const saveResult = async()=>{
    try {

      axios.defaults.withCredentials = true

      const {data} = await axios.post(backendUrl + "/api/result/data",{result})

      console.log(data)

      if(data.success){
        toast.success(data.message)
        getUserData()
        setSaved("saved")
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {

      toast.error(error.message)
      
    }
  }

  return (
    <div className='bg-gradient-to-br from-[#A8377F] to-[#281574]'>
    <Logo/>
    <div className='container min-h-screen grid justify-center px-5 pb-10 lg:px-20 w-full mx-auto pt-20 transition-transform '>

        <div className="bg-zinc-50 p-5 rounded-2xl max-w-[1000px]">

            <h2 className=" text-center text-3xl pb-5 font-bold text-[#FF625F]"> Here is your result...</h2>

            {
              result !== null ?(
                <>
                {
                  saved === "notSaved" ?(
                    <button onClick={saveResult}  className='px-4 py-2 rounded-full mb-5 bg-[#FF625F] text-white hover:scale-102 cursor-pointer'>Save result <i class="fa-regular fa-floppy-disk"></i></button>
                  ):(
                    <button   className='px-4 py-2 rounded-full mb-5 bg-green-500 text-white hover:scale-102 cursor-pointer'>Saved <i class="fa-solid fa-check"></i></button>
                  )
                }
                  <Markdown className='result'>{result}</Markdown>
                  <div className="flex justify-center my-5 ">
                    <button 
                    onClick={()=>{
                      navigate("/")
                      setResult(null)
                      }} 
                    className=' px-4 py-2 rounded-full hover:scale-102 cursor-pointer outline-2'
                    >
                      Back to Home
                    </button>
                  </div>
                </>
              ):(
                <div className="result w-full flex justify-center flex-col items-center h-96">
                  <p className='text-xl text-center'>
                  🔬 "Running tests... Your results will be ready shortly! 🏥"
                  </p>
                  <Loader/> 
                </div>
              )
            }


        </div>

    </div>
    </div>
  )
}

export default Result