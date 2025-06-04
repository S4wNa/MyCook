import React from "react";
import img8 from "../../src/assets/images/img8.jpg";
import img12 from "../../src/assets/images/img12.jpg";
import img13 from "../../src/assets/images/img13.jpeg";
import img3 from "../../src/assets/images/img3.jpg";
import img6 from "../../src/assets/images/img6.jpeg";
import img9 from "../../src/assets/images/img9.jpg";
import img2 from "../../src/assets/images/img2.jpg";
import img15 from "../../src/assets/images/img15.avif";
import img14 from "../../src/assets/images/img14.avif";

function Middle() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center relative overflow-hidden ">
      <div className="flex flex-col justify-center items-center order-2  mb-50">
        <h1 className="text-white block text-center mx-auto w-80 text-4xl font-bold md:text-6xl md:w-120 z-100 ">
          Be your own cook and share your recipes with the world
        </h1>
        <button className="rounded-full bg-[#ff873c] text-white mx-auto w-48 h-16 mt-4 cursor-pointer">
          Get Started
        </button>
      </div>
      <div className="order-1 relative w-full max-w-6xl h-64 md:h-80 ">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative w-96 h-80 md:w-128 md:h-96">
            <img
              src={img8}
              alt="quiche lorraine"
              className="absolute rounded-lg w-48 h-32 md:w-56 md:h-40 top-20 md:right-22 right-6 z-130 shadow-lg"
            />
            <img
              src={img12}
              alt="pasta"
              className="absolute rounded-lg w-42 h-32 md:w-56 md:h-40  top-10 md:left-20 right-32 z-120 shadow-lg  "
            />
            <img
              src={img13}
              alt="entry salmon"
              className="absolute rounded-lg w-56 h-20 md:w-76 md:h-28 z-130 shadow-lg  rotate-270 -right-42  md:-right-90 top-65 "
            />
            <img
              alt="lasagna"
              src={img6}
              className="absolute rounded-lg w-42 h-28  md:w-60 md:h-40 -bottom-85 -right-35 md:-right-75 md:-bottom-100 z-120 shadow-lg "
            />
            <img
              alt="pie"
              src={img3}
              className="absolute rounded-lg w-48 h-32 md:w-62 md:h-42 -bottom-102 -right-15  z-130 shadow-lg md:-right-50 md:-bottom-120"
            />
            <img
              alt="salmon spinach"
              src={img9}
              className="absolute rounded-lg w-34 h-44  -bottom-55 -left-35  z-130 shadow-lg rotate-360  md:w-44 md:h-56 md:-left-75 md:-bottom-50"
            />
            <img
              alt="healthy breakfast"
              src={img2}
              className="absolute rounded-lg w-34 h-44  -bottom-25 -left-42  z-130 shadow-lg md:w-46 md:h-56 rotate-360 md:-left-90"
            />
            <img
              alt="blue & red berries"
              src={img15}
              className="absolute rounded-lg w-46 h-32 rotate-360 -bottom-120 -left-5  z-130 shadow-lg md:w-60 md:h-42 md:-left-40 md:-bottom-128"
            />
            <img
              alt="another healthy brakfeas"
              src={img14}
              className="absolute rounded-lg w-38 h-46 rotate-360 -bottom-115 -left-20  z-120 shadow-lg md:w-48 md:h-52 md:-left-55 md:-bottom-118"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Middle;
