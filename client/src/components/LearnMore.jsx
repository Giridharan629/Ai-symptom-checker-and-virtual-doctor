import React from "react";
import Header from "./Header";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {

  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-br from-[#A8377F] to-[#281574]">
      <div class=" text-gray-800 flex items-center justify-center min-h-[100dvh] p-6">
        <div class="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h1 class="text-3xl font-bold text-[#FF625F] mb-4">
            🤖 Learn More About Our AI Symptom Checker
          </h1>
          <p class="text-lg mb-4">
            Our 🌟 AI-powered symptom checker helps you analyze your health
            symptoms quickly and efficiently. Using cutting-edge machine
            learning 🧠, it suggests possible conditions based on your inputs.
          </p>

          <h2 class="text-2xl font-semibold text-[#FF625F] mt-6 mb-2">
            🔍 How It Works
          </h2>
          <ul class="list-disc list-inside space-y-2">
            <li>📝 Enter your symptoms in the interactive form.</li>
            <li>
              ⚡ Our AI processes your input and matches it with medical
              databases.
            </li>
            <li>
              📊 Get an instant preliminary analysis with possible conditions.
            </li>
            <li>
              🩺 Take the next steps with suggested precautions or consult a
              doctor.
            </li>
          </ul>

          <h2 class="text-2xl font-semibold text-[#FF625F] mt-6 mb-2">
            💡 Why Use Our Tool?
          </h2>
          <ul class="list-disc list-inside space-y-2">
            <li>🚀 Fast & convenient health insights.</li>
            <li>🤖 AI-powered accuracy and efficiency.</li>
            <li>🔒 Privacy-focused – your data stays secure.</li>
            <li>🆓 Completely free and easy to use.</li>
          </ul>

          <div class="mt-6 flex">
            <Button
              onClick={()=>navigate("/")}
              class="grid place-items-center bg-[#FF625F] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#ff7878] transition"
            >
              🚀 Get Started
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
