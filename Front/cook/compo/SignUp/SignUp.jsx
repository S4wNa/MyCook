import React from "react";

function SignUp() {
  const ids = ["Full Name", "Email Address", "Password"];
  return (
    <div className="container mx-auto  ">
      <div className="mx-8 bg-[#FFF3D8] rounded-lg opacity-80 flex flex-col justify- center items-center  h-170 md:w-130 md:mx-auto mb-5">
        <div className="flex justify-start ">
          <h1 className="text-4xl text-[rgb(0,0,0)] opacity-90  my-8 ">
            Sign Up
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          {ids.map((item, index) => {
            return (
              <div
                key={index}
                className=" border-1 border-[#B29F9F]  rounded-lg p-2 my-2"
              >
                <input
                  id="ids"
                  placeholder={item}
                  className=" text-[#000000] font-bold w-60 h-10 md:w-80 outline-none"
                />
              </div>
            );
          })}
        </div>
        <button className="rounded-lg w-70 h-15 bg-[#FF873C] text-3xl  mt-8 md:cursor-pointer md:w-90 md:h-20  ">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
