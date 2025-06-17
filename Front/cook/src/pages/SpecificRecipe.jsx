import Specific from "../compo/SpecificRecipe/Specific";
import Navbar from "../compo/Navbar/Navbar";

function SpecificRecipe() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8] ">
      <Navbar />
      <Specific />
    </div>
  );
}

export default SpecificRecipe;
