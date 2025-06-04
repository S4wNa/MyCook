import React from "react";
import Recipe from "../compo/MyRecipe/Recipe";
import Navbar from "../compo/Home/Navbar";

function MyRecipe() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8] ">
      <Navbar />
      <Recipe />
    </div>
  );
}

export default MyRecipe;
