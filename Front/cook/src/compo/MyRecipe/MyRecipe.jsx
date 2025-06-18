import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import defaultImage from "../../assets/images/img12.jpg";

function MyRecipe() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to view your recipes");
      }

      const response = await fetch(`${API_BASE_URL}/api/recipes/my-recipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handleEditClick = (e, recipeId) => {
    e.stopPropagation();
    navigate(`/edit/${recipeId}`);
  };

  const handleDeleteClick = async (e, recipeId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_BASE_URL}/api/recipes/${recipeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete recipe");
        }

        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        );
        setFilteredRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        );
      } catch (error) {
        console.error("Error deleting recipe:", error);
        setError(error.message);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
        <h1 className="text-3xl font-bold text-center mb-8">My Recipes</h1>

        <div className="flex justify-center items-center mb-8">
          <div className="flex m-6">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 outline-none w-60 h-10 border-1 border-stone-600 rounded-lg md:w-120"
            />
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center text-gray-500">
            {searchTerm
              ? "No recipes found matching your search."
              : "You haven't created any recipes yet."}
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
                  <div className="flex justify-center space-x-4 mt-2">
                    <button
                      onClick={(e) => handleEditClick(e, recipe._id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 opacity-30 hover:opacity-100 transition-opacity duration-200"
                    >
                      <FaEdit className="text-[#FF873C]" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, recipe._id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 opacity-30 hover:opacity-100 transition-opacity duration-200"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
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

export default MyRecipe;
