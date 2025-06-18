import CreateRecipe from "../compo/Create/CreateRecipe";
import Navbar from "../compo/Navbar/Navbar";

function CreateStart() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8]">
      <Navbar />
      <CreateRecipe />
    </div>
  );
}

export default CreateStart;
