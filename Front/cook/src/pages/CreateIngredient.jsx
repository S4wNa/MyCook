import Navbar from "../compo/Navbar/Navbar";
import CreateRecipe from "../compo/Create/CreateRecipe";

function CreateStart() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8]">
      <Navbar />
      <CreateRecipe />
    </div>
  );
}

export default CreateStart;
