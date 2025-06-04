import React, { useState } from "react";
import img from "../../src/assets/Logo.svg";

function Navbar() {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu((change) => !change);
  }
  const mobile = ["Create", "All Recipe", "Speciality", "About"];
  const items = ["All Recipe", "Speciality", "About"];
  return (
    <div className="container mx-auto">
      <div className="flex justify-between relative mx-4 md:mx-0">
        <img src={img} alt="logo" className="cursor-pointer" />
        <div className="flex items-center justify-center ">
          <button className="rounded-md text-[#ff873c] bg-white px-4 py-1 cursor-pointer hidden md:inline">
            Create
          </button>
          {items.map((item, index) => {
            return (
              <div key={index} className="ml-6 hidden md:inline">
                <button className="cursor-pointer">{item}</button>
              </div>
            );
          })}
          <button className="text-white rounded-md bg-[#ff873c]  px-4 py-1 ml-6 cursor-pointer hidden md:inline">
            Sign In
          </button>
          <button className="text-white ml-6 cursor-pointer hidden md:inline">
            Login
          </button>
          <button className="md:hidden  " onClick={handleMenu}>
            BTN
          </button>
        </div>
      </div>
      {/*Mobile Part */}
      {menu && (
        <div className="absolute md:hidden container z-999">
          <div className="flex flex-col text-center items-center text-white bg-[#ff873c] mx-5 rounded-md h-80 p-4 z-999 ">
            {mobile.map((item, index) => {
              return (
                <div className="mb-4" key={index}>
                  <button>{item}</button>
                </div>
              );
            })}
            <hr className="w-[80%] h-2 text-white" />
            <button className="mt-2 mb-4">Login</button>
            <button className="rounded-full bg-[#FFD779] w-70 h-10 ">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
