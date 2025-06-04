import React from "react";
import CreateRecipe2 from "../compo/Create/CreateRecipe2";
import Navbar from "../compo/Home/Navbar";

function CreateEnd() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8]">
      <Navbar />
      <CreateRecipe2 />
    </div>
  );
}

export default CreateEnd;
