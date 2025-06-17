import Recipe from "../compo/MyRecipe/Recipe";
import Navbar from "../compo/Navbar/Navbar";

function MyRecipe() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8] ">
      <Navbar />
      <Recipe />
    </div>
  );
}

export default MyRecipe;
