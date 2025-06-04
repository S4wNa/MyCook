import React from "react";
import Navbar from "../compo/Home/Navbar";
import Main from "../compo/MainMenu/Main";

function MainMenu() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8] ">
      <Navbar />
      <Main />
    </div>
  );
}

export default MainMenu;
