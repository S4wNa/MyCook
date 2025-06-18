import MyRecipe from "../compo/MyRecipe/MyRecipe";
import Navbar from "../compo/Navbar/Navbar";

function MyRecipePage() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8] ">
      <Navbar />
      <MyRecipe />
    </div>
  );
}

export default MyRecipePage;
