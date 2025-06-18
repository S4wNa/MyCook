import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Ingredients } from "../Create/Info";

function Specific() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileIngredients, setShowMobileIngredients] = useState(false);

  // Fonction pour trouver l'image locale d'un ingrédient
  const getLocalImage = (ingredientName) => {
    const allIngredients = Ingredients.flatMap((cat) => cat.ingre);
    const ingredient = allIngredients.find(
      (ing) => ing.name.toLowerCase() === ingredientName.toLowerCase()
    );
    return ingredient ? ingredient.image : null;
  };

  useEffect(() => {
    console.log("Recipe ID from URL:", id);
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      console.log("Fetching recipe details for ID:", id);
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/recipes/${id}`;
      const response = await fetch(apiUrl);

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to fetch recipe details");
      }

      const data = await response.json();
      console.log("Received data:", data);

      setRecipe(data.recipe);
      setIngredients(data.ingredients);
      setSteps(data.steps);
    } catch (err) {
      console.error("Error in fetchRecipeDetails:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center p-4">Recipe not found</div>;
  }

  return (
    <div className="flex min-h-screen opacity-80">
      <aside className="hidden md:block w-64 lg:w-80 xl:w-96 flex-shrink-0 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Ingredients:</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {ingredients.map((ingredient, index) => {
            const localImage = getLocalImage(ingredient.ingredientId.name);
            return (
              <div
                key={index}
                className="flex items-center p-3 border border-stone-400 rounded-lg hover:shadow-md transition-shadow bg-[#FFF3D8]/50"
              >
                <img
                  src={
                    ingredient.ingredientId.imageUrl ||
                    localImage ||
                    "https://via.placeholder.com/200"
                  }
                  className="w-12 h-12 mr-3 object-cover rounded"
                  alt={ingredient.ingredientId.name}
                  onError={(e) => {
                    if (localImage) {
                      e.target.src = localImage;
                    }
                  }}
                />
                <div className="flex-1">
                  <p className="font-medium">{ingredient.ingredientId.name}</p>
                  <p className="text-sm text-gray-600">
                    {ingredient.quantity} {ingredient.unit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      <main className="flex-1 bg-[#FFFAF0] overflow-y-auto opacity-90">
        <div className="container mx-auto p-6">
          <div className="rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-auto">
                <button
                  onClick={() =>
                    setShowMobileIngredients(!showMobileIngredients)
                  }
                  className="md:hidden w-full bg-[#FF873C] text-white px-4 py-2 rounded-lg shadow-lg mb-4"
                >
                  Ingredients
                </button>

                <div className="relative">
                  {showMobileIngredients && (
                    <div className="md:hidden absolute inset-0 z-20 bg-[#FFFAF0] rounded-lg shadow-xl overflow-hidden">
                      <div className="p-4 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold">Ingredients</h3>
                          <button
                            onClick={() => setShowMobileIngredients(false)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="space-y-3">
                          {ingredients.map((ingredient, index) => {
                            const localImage = getLocalImage(
                              ingredient.ingredientId.name
                            );
                            return (
                              <div
                                key={index}
                                className="flex items-center p-3 border border-stone-400 rounded-lg bg-[#FFF3D8]/50"
                              >
                                <img
                                  src={
                                    ingredient.ingredientId.imageUrl ||
                                    localImage ||
                                    "https://via.placeholder.com/200"
                                  }
                                  className="w-10 h-10 mr-3 object-cover rounded"
                                  alt={ingredient.ingredientId.name}
                                  onError={(e) => {
                                    if (localImage) {
                                      e.target.src = localImage;
                                    }
                                  }}
                                />
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {ingredient.ingredientId.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {ingredient.quantity} {ingredient.unit}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <img
                    src={recipe.mainUrl || "https://via.placeholder.com/400"}
                    className="w-full md:w-64 lg:w-80 xl:w-96 h-64 lg:h-80 xl:h-96 object-cover rounded-lg shadow-md"
                    alt={recipe.name}
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#FF873C] mb-8">
                  {recipe.name}
                </h1>
                <div className="flex justify-center md:justify-start gap-8">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm uppercase">time</p>
                    <p className="text-xl font-semibold">
                      {recipe.duration} min
                    </p>
                  </div>
                  <div className="w-px bg-stone-400"></div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm uppercase">Pers</p>
                    <p className="text-xl font-semibold">{recipe.serving}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Steps</h2>
            {steps.map((step) => (
              <div
                key={step._id}
                className="border border-stone-400 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-3 text-[#FF873C]">
                  Step {step.step}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {step.description}
                </p>
                {step.imageUrl && (
                  <img
                    src={step.imageUrl}
                    alt={`Step ${step.step}`}
                    className="w-full max-w-md h-64 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Specific;
