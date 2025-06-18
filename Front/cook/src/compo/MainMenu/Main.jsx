import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import defaultImage from "../../assets/images/img12.jpg";

const SPECIALITIES = [
  "Italian",
  "French",
  "Japanese",
  "Indian",
  "Mexican",
  "Chinese",
  "Thai",
  "Turkish",
  "Korean",
];

function Main() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const specialityFromUrl = searchParams.get("speciality");
    if (specialityFromUrl) {
      setSelectedSpeciality(specialityFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpeciality) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.speciality.toLowerCase() === selectedSpeciality.toLowerCase()
      );
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedSpeciality, recipes]);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/recipes`);

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/specific/${recipeId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecialityChange = (e) => {
    const newSpeciality = e.target.value;
    setSelectedSpeciality(newSpeciality);
    setSearchParams(newSpeciality ? { speciality: newSpeciality } : {});
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex-1 bg-[#FFFAF0] min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">All Recipes</h1>

        <div className="flex flex-col items-center mb-8">
          <div className="w-full max-w-2xl mb-4">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 outline-none h-12 border-1 border-stone-600 rounded-lg"
            />
          </div>
          <div className="w-48">
            <select
              value={selectedSpeciality}
              onChange={handleSpecialityChange}
              className="w-full p-2 outline-none h-10 border-1 border-stone-600 rounded-lg bg-white text-sm"
            >
              <option value="">All Specialities</option>
              {SPECIALITIES.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center text-gray-500">
            {searchTerm || selectedSpeciality
              ? "No recipes found matching your criteria."
              : "No recipes available."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <div className="flex flex-col" key={recipe._id}>
                <div
                  className="flex flex-col rounded-lg p-4 max-w-sm justify-center items-center mx-auto md:mx-0 min-w-90 md:min-w-62 border-1 border-stone-400 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => handleRecipeClick(recipe._id)}
                >
                  <h2 className="text-[#FF873C] text-center text-xl">
                    {recipe.name}
                  </h2>
                  <div className="mt-2 flex">
                    <img
                      src={recipe.mainUrl || defaultImage}
                      alt={recipe.name}
                      className="rounded-lg w-28 h-22 md:ml-2 mr-8 cursor-pointer md:w-20 md:h-16"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                    <div className="flex justify-center items-center">
                      <div className="flex flex-col">
                        <p className="text-sm">Duration</p>
                        <p>{recipe.duration}</p>
                      </div>
                      <hr className="h-1 w-12 text-black rotate-90" />
                      <div className="flex flex-col">
                        <p className="text-sm">Serving</p>
                        <p>{recipe.serving}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
