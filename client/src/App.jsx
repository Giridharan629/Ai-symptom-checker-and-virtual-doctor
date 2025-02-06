import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Questions from "./components/Questions";
import Result from "./components/Result";
import Login from "./components/Login";
import Home from "./components/Home";



import { ToastContainer } from 'react-toastify';
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import PrevResults from "./components/PrevResults";
import Profile from "./components/Profile";
import LearnMore from "./components/LearnMore";

const App = () => {

  const [response,setResponse] = useState(null)

  return (

    <div className="">

    <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reset-password" element={<ForgotPassword/>} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/questions" element={<Questions/>} />
        <Route path="/result" element={<Result/>} />
        <Route path="/prev-results" element={<PrevResults/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/learn-more" element={<LearnMore/>} />
      </Routes>

    </div>

  );
};

export default App;
