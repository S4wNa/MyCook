import CreateRecipe2 from "../compo/Create/CreateRecipe2";
import Navbar from "../compo/Navbar/Navbar";

function CreateRecipeComplete() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8]">
      <Navbar />
      <CreateRecipe2 />
    </div>
  );
}

export default CreateRecipeComplete;
