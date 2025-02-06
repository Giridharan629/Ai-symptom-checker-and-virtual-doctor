import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const [msgVisibility, setMsgVisibility] = useState(false)

  const {userData, isLoggedIn} = useContext(AppContent)

  return (
    <>
    <Header/>
        <div className="p-5 pt-[150px] max-w-[1500px] mx-auto sm:px-20 grid gap-5 ">
          <h3 className=" text-2xl sm:text-4xl tracking-widest text-zinc-50/60 font-thin">
            Hello {userData ? userData.name : "User"}
          </h3>
          <h2 className="font-bold text-zinc-50 text-3xl sm:text-5xl sm:w-[60%] tracking-wider">
            Worried About Your Symptoms?
          </h2>
          <p className=" sm:w-[60%] text-sm sm:text-s lg:text-lg text-zinc-50/90 tracking-wider">
            Let AI assist you in understanding your health. Simply enter your
            symptoms, and our smart system will analyze them to suggest possible
            conditions.
          </p>
          <ul className="list-disc p-4 text-zinc-50/70">
            <li> Fast & Easy</li>
            <li> AI-Powered Symptom Analysis</li>
            <li> Secure & Private</li>
          </ul>

          {
            msgVisibility && <p className="text-red-500 animate-bounce">Please login to get access <span><i class="fa-solid fa-down-long"></i></span></p>
          }

          <div className="flex gap-6">
            <button 

              className={`btn-primary px-8 ${isLoggedIn ? "cursor-pointer" :"cursor-not-allowed"} `}
              onClick={() => isLoggedIn ? navigate("/questions") : setMsgVisibility(true)}
            >
              Start Now
            </button>
            <button onClick={()=>navigate("/learn-more")} className="btn-secondary px-6 cursor-pointer">Learn More</button>
            </div>
        </div>
    </>
  );
};

export default Home;
