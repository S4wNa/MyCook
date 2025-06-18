import Home from "./pages/Home";
import Log from "./pages/Log";
import Sign from "./pages/Sign";
import About from "./pages/About";
import Speciality from "./pages/Speciality";
import MainMenu from "./pages/MainMenu";
import MyRecipe from "./pages/MyRecipe";
import SpecificRecipe from "./pages/SpecificRecipe";
import CreateRecipe from "./pages/CreateRecipe";
import CreateRecipeComplete from "./pages/CreateRecipeComplete";
import EditRecipe from "./compo/Edit/EditRecipe";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./index.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Log />} />
      <Route path="/signup" element={<Sign />} />
      <Route path="/about" element={<About />} />
      <Route path="/speciality" element={<Speciality />} />
      <Route path="/main" element={<MainMenu />} />
      <Route
        path="/myrecipe"
        element={
          <ProtectedRoute>
            <MyRecipe />
          </ProtectedRoute>
        }
      />
      <Route path="/specific/:id" element={<SpecificRecipe />} />
      <Route
        path="/ingredients"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipe"
        element={
          <ProtectedRoute>
            <CreateRecipeComplete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-recipe"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditRecipe />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
