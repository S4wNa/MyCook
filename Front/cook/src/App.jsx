import Home from "./pages/Home";
import Log from "./pages/Log";
import Sign from "./pages/Sign";
import About from "./pages/About";
import Speciality from "./pages/Speciality";
import MainMenu from "./pages/MainMenu";
import MyRecipe from "./pages/MyRecipe";
import SpecificRecipe from "./pages/SpecificRecipe";
import CreateRecipe from "./pages/CreateRecipe";
import CreateIngredient from "./pages/CreateIngredient";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./index.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Log />} />
      <Route path="/signup" element={<Sign />} />
      <Route path="/about" element={<About />} />
      <Route path="/speciality" element={<Speciality />} />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <MainMenu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myrecipe"
        element={
          <ProtectedRoute>
            <MyRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/specific"
        element={
          <ProtectedRoute>
            <SpecificRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ingredients"
        element={
          <ProtectedRoute>
            <CreateIngredient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipe"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
