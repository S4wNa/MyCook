import Home from "../pages/Home";
import Log from "../pages/Log";
import Sign from "../pages/Sign";
import About from "../pages/About";
import Speciality from "../pages/Speciality";
import MainMenu from "../pages/MainMenu";
import MyRecipe from "../pages/MyRecipe";
import SpecificRecipe from "../pages/SpecificRecipe";
import CreateRecipe from "../pages/CreateRecipe";
import CreateIngredient from "../pages/CreateIngredient";
import "./index.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Log />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/about" element={<About />} />
      <Route path="/speciality" element={<Speciality />} />
      <Route path="/main" element={<MainMenu />} />
      <Route path="/myrecipe" element={<MyRecipe />} />
      <Route path="/specific" element={<SpecificRecipe />} />
      <Route path="/ingredients" element={<CreateIngredient />} />
      <Route path="/recipe" element={<CreateRecipe />} />
    </Routes>
  );
}

export default App;
