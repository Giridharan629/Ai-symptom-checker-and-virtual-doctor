import React from "react";

const Logo = () => {
  return (
    <div
      onClick={() => navigate("/")}
      className="logo w-full max-w-[1500px] left-[50%] translate-x-[-50%] text-2xl font-semibold tracking-widest gap-3 flex items-center absolute top-0 left-0 px-5 sm:px-20 text-zinc-50 mt-5 cursor-pointer"
    >
      <img src="/images/logo1.png" width={40} alt="" />
      SEESHA
    </div>
  );
};

export default Logo;
