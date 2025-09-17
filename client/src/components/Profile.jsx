import React, { useContext, useState } from 'react'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Logo from './Logo'

const Profile = () => {

    const {userData, backendUrl, getUserData} = useContext(AppContent)
    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false)
    const [name, setName ] = useState(userData.name)
    const [age, setAge ] = useState(userData.age)
    const [gender, setGender ] = useState(userData.gender)
    const [height, setHeight] = useState(userData.height)
    const [weight, setWeight] = useState(userData.weight) 

    const handleUpdate = async()=>{
        axios.defaults.withCredentials = true

        try {

            const {data} = await axios.post(backendUrl + "/api/user/update-data",{
                name, age, gender, height, weight
            })

            if(data.success){
                toast.success(data.message)
                getUserData()
                setEditMode(false)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {

            toast.error(error.message)
            
        }
    }

  return (
    <div className="profile min-h-[100dvh] text-center grid place-items-center">

        {/* ============ header ============= */}

        <Logo/>

        <div className=" w-[80%] sm:min-w-[400px] translate-y-10 max-w-[500px] bg-white rounded-lg relative p-5 sm:p-10">

        {/* ========== edit ============ */}

            <div className="absolute top-5 right-5 cursor-pointer text-2xl hover:scale-102 transition-transform">
            <i onClick={()=>setEditMode(!editMode)} className="fa-solid fa-pen-to-square"></i>
            </div>

            {/* -----------profileimg------------ */}
                <img 
                src="/images/userImg.png" 
                className='absolute w-25 sm:w-44  -top-13 left-[50%] translate-x-[-50%] shadow-2xl border-3 border-white rounded-full'
                alt="" />

            {/* ============== text =========== */}

            <div className='mt-13 sm:mt-30'>
                {
                    editMode ? (
                        <>
                            <h3 className=" text-lg sm:text-3xl text-zinc-700 font-black"><input type="text" onChange={(e)=>setName(e.target.value)} className='border-b-2 px-2 py-2 outline-0 w-[80%] sm:max-w-50  rounded mt-3' value={name} /> <i className="fa-solid fa-pen text-lg"></i></h3>
                            <div className="more mt-5">

                                <table className='w-fit mx-auto'>
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg w-full">Age </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                             <div>
                                                <span className='pr-5'>:</span>
                                                <input type="number" onChange={(e)=>setAge(e.target.value)} className='border-b-2 px-2 py-2 outline-0 w-15 sm:max-w-15 rounded' value={age} />  <i className="fa-solid fa-pen text-xs"></i>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* ===================== */}
                                    
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg"> Gender </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                            <div>
                                                <span className='pr-5'>:</span>
                                                <input type="number" onChange={(e)=>setAge(e.target.value)} className='border-b-2 px-2 py-2 outline-0 w-15 sm:max-w-15 rounded' value={age} />  <i className="fa-solid fa-pen text-xs"></i>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* ================= */}
                                    
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg"> Height </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                            <div>
                                                <span className='pr-5'>:</span>
                                                <input type="number" onChange={(e)=>setHeight(e.target.value)} className='border-b-2 px-2 py-2 outline-0 w-[50%] sm:max-w-30 rounded mt-3' value={height} placeholder='in cm' />  <i className="fa-solid fa-pen text-xs"></i>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* ================= */}
                                    
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg"> Weight </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                            <div>
                                                <span className='pr-5'>:</span>
                                                <input type="number" onChange={(e)=>setWeight(e.target.value)} className='border-b-2 px-2 py-2 outline-0 w-[50%] sm:max-w-30 rounded mt-3' value={weight} placeholder='in kg' />  <i className="fa-solid fa-pen text-xs"></i>
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <div className=" flex justify-between mt-10">
                                    <button onClick={()=>setEditMode(false)} className='border-2 px-5 py-2 rounded-xl bg-zinc-700 text-white cursor-pointer hover:scale-102 transition-transform'>Cancel</button>
                                    <button onClick={handleUpdate} className='border-2 px-5 py-2 rounded-xl bg-[#FF625F] text-white cursor-pointer hover:scale-102 transition-transform '>Update</button>
                                </div>
                            </div>
                        </>
                    ):(
                        <>
                            <h3 className="text-3xl text-zinc-700 font-black">{userData?.name}</h3>
                            <table className='w-fit mx-auto mt-5'>
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg w-full">Age </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                             <div>
                                                <span className='pr-5'>:</span>
                                                {userData?.age}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* ===================== */}
                                    
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg"> Gender </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                            <div>
                                                <span className='pr-5'>:</span>
                                                {userData?.gender}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* ================= */}
                                    
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg"> Height </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                            <div>
                                                <span className='pr-5'>:</span>
                                                {userData?.height || "Edit to set"} {userData?.height && " cm"}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* ================= */}
                                    
                                    <tr>
                                        <td className='text-left'>
                                            <div className=" text-zinc-600 text-sm sm:text-lg"> Weight </div>
                                        </td>
                                        <td className='text-left pl-5'>
                                            <div>
                                                <span className='pr-5'>:</span>
                                                {userData?.weight || "Edit to set"} {userData?.height && " kg"}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                        </>
                    )
                }
            </div>

            {
                !editMode && 
                <>
                    <div className=" mt-5 ">
                        <h3 className='text-2xl text-zinc-700 font-black'>
                            {userData?.prevResult?.length}
                        </h3>
                        <h3 className='text-zinc-600'>Reports Generated</h3>
                    </div>

                    <div className="mt-5 flex flex-col items-center text-[#FF625F]  ">

                        <button 
                        onClick={()=>navigate("/prev-results")} 
                        className='flex items-center gap-2 cursor-pointer hover:tracking-wide transition-all'
                        >
                            <p>View past Reports</p> 
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </button>

                        <button 
                        onClick={()=>navigate("/")} 
                        className='border-2 mt-5 wl-[80%] px-5 py-2 rounded-xl bg-zinc-700 text-white cursor-pointer hover:scale-102 transition-transform hover:tracking-wide transition-all'
                        >
                            Back
                        </button>

                    </div>
                </>
            }


        </div>
    </div>
  )
}

export default Profile