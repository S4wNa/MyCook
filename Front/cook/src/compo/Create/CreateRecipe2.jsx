import React, { useState, useEffect } from "react";
import img12 from "../../assets/images/img12.jpg";
import { Ingredients, Details } from "./Info";
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";

// Fonction pour déterminer la catégorie d'un ingrédient basée sur son nom
const determineIngredientCategory = (ingredientName) => {
  const name = ingredientName.toLowerCase().trim();

  // Protéines
  if (
    [
      "egg",
      "eggs",
      "œuf",
      "œufs",
      "tofu",
      "tempeh",
      "seitan",
      "quinoa",
      "lentils",
      "lentilles",
      "beans",
      "haricots",
      "chickpeas",
      "pois chiches",
    ].includes(name)
  ) {
    return "Proteins";
  }

  // Viandes
  if (
    [
      "beef",
      "bœuf",
      "pork",
      "porc",
      "chicken",
      "poulet",
      "lamb",
      "agneau",
      "turkey",
      "dinde",
      "duck",
      "canard",
      "veal",
      "veau",
      "ham",
      "jambon",
      "bacon",
    ].includes(name)
  ) {
    return "Meats";
  }

  // Poisson
  if (
    [
      "fish",
      "poisson",
      "salmon",
      "saumon",
      "tuna",
      "thon",
      "cod",
      "morue",
      "trout",
      "truite",
      "shrimp",
      "crevettes",
      "mussels",
      "moules",
      "oysters",
      "huîtres",
    ].includes(name)
  ) {
    return "Fish";
  }

  // Légumes
  if (
    [
      "spinach",
      "épinards",
      "carrot",
      "carotte",
      "onion",
      "oignon",
      "tomato",
      "tomate",
      "lettuce",
      "laitue",
      "cucumber",
      "concombre",
      "bell pepper",
      "poivron",
      "broccoli",
      "brocoli",
      "cauliflower",
      "chou-fleur",
      "zucchini",
      "courgette",
      "eggplant",
      "aubergine",
    ].includes(name)
  ) {
    return "Vegetables";
  }

  // Fruits
  if (
    [
      "apple",
      "pomme",
      "banana",
      "banane",
      "orange",
      "lemon",
      "citron",
      "lime",
      "strawberry",
      "fraise",
      "blueberry",
      "myrtille",
      "raspberry",
      "framboise",
      "grape",
      "raisin",
      "peach",
      "pêche",
      "pear",
      "poire",
    ].includes(name)
  ) {
    return "Fruits";
  }

  // Produits laitiers
  if (
    [
      "cheese",
      "fromage",
      "milk",
      "lait",
      "yogurt",
      "yaourt",
      "cream",
      "crème",
      "butter",
      "beurre",
      "sour cream",
      "crème aigre",
    ].includes(name)
  ) {
    return "Dairy";
  }

  // Céréales
  if (
    [
      "rice",
      "riz",
      "pasta",
      "pâtes",
      "bread",
      "pain",
      "flour",
      "farine",
      "wheat",
      "blé",
      "oats",
      "avoine",
      "corn",
      "maïs",
      "quinoa",
    ].includes(name)
  ) {
    return "Grains";
  }

  // Épices
  if (
    [
      "salt",
      "sel",
      "pepper",
      "poivre",
      "garlic",
      "ail",
      "ginger",
      "gingembre",
      "basil",
      "basilic",
      "oregano",
      "origan",
      "thyme",
      "thym",
      "rosemary",
      "romarin",
      "cumin",
      "curry",
      "paprika",
      "cinnamon",
      "cannelle",
      "nutmeg",
      "noix de muscade",
    ].includes(name)
  ) {
    return "Spices";
  }

  // Par défaut, retourner Vegetables
  return "Vegetables";
};

function CreateRecipe2() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeData, setRecipeData] = useState({
    name: "",
    duration: "",
    serving: "",
    speciality: "",
    status: "published",
    mainUrl: null,
  });
  const [steps, setSteps] = useState([
    { step: 1, description: "", image: null },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedIngredients = localStorage.getItem("selectedIngredients");
    if (savedIngredients) {
      setSelectedIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  function handleFilter() {
    setFilter((set) => !set);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const normalizedName = name.toLowerCase().replace(/\s+/g, "");
    setRecipeData((prev) => ({
      ...prev,
      [normalizedName]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRecipeData((prev) => ({
        ...prev,
        mainUrl: imageUrl,
        mainImage: file,
      }));
    }
  };

  const handleStepChange = (stepNumber, value) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.step === stepNumber ? { ...step, description: value } : step
      )
    );
  };

  const handleImageChange = async (stepNumber, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSteps((prev) =>
        prev.map((step) =>
          step.step === stepNumber
            ? { ...step, image: file, imagePreview: imageUrl }
            : step
        )
      );
    }
  };

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { step: prev.length + 1, description: "", image: null },
    ]);
    setCurrentStep((prev) => prev + 1);
  };

  const saveRecipe = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Vérifier l'authentification avant de sauvegarder
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to create a recipe");
        return;
      }

      // Vérification des champs requis avec logs
      console.log("Recipe Data:", recipeData);
      console.log("Steps:", steps);

      const missingFields = [];
      if (!recipeData.name) missingFields.push("Name");
      if (!recipeData.duration) missingFields.push("Duration");
      if (!recipeData.serving) missingFields.push("Serving");
      if (!recipeData.speciality) missingFields.push("Speciality");

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in the following fields: ${missingFields.join(", ")}`
        );
      }

      // Vérifier si au moins une étape a une description
      const hasStepDescription = steps.some(
        (step) => step.description.trim() !== ""
      );
      if (!hasStepDescription) {
        throw new Error("Please add at least one step with a description");
      }

      // Préparer les données de la recette
      const defaultImage = img12;
      const recipeDataToSend = {
        name: recipeData.name,
        duration: recipeData.duration,
        serving: recipeData.serving,
        speciality: recipeData.speciality,
        status: "published",
        mainUrl: recipeData.mainUrl || defaultImage,
      };

      console.log("Sending recipe data:", recipeDataToSend); // Debug log

      // 1. Créer la recette
      const recipeResponse = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeDataToSend),
      });

      if (!recipeResponse.ok) {
        const errorData = await recipeResponse.json();
        console.error("Error response:", errorData); // Debug log
        if (recipeResponse.status === 401) {
          throw new Error("Please log in to create a recipe");
        }
        throw new Error(errorData.message || "Failed to create recipe");
      }

      const recipe = await recipeResponse.json();
      console.log("Created recipe:", recipe); // Debug log
      const recipeId = recipe._id;

      // 2. Sauvegarder les ingrédients avec leurs quantités
      const ingredientsResponse = await fetch(
        `/api/recipes/${recipeId}/ingredients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ingredients: await Promise.all(
              selectedIngredients.map(async (ingredient) => {
                try {
                  // D'abord, chercher si l'ingrédient existe déjà
                  const searchResponse = await fetch(
                    `/api/ingredients/search?q=${encodeURIComponent(
                      ingredient.name.trim()
                    )}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  let ingredientId;
                  if (searchResponse.ok) {
                    const existingIngredients = await searchResponse.json();
                    if (existingIngredients.length > 0) {
                      // Utiliser l'ingrédient existant
                      ingredientId = existingIngredients[0]._id;
                    } else {
                      // Créer un nouvel ingrédient
                      const createResponse = await fetch("/api/ingredients", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                        body: JSON.stringify({
                          name: ingredient.name.trim(),
                          category: determineIngredientCategory(
                            ingredient.name.trim()
                          ),
                          imageUrl:
                            ingredient.image ||
                            "https://via.placeholder.com/200",
                        }),
                      });

                      if (!createResponse.ok) {
                        const errorData = await createResponse.json();
                        // Si l'ingrédient existe déjà, le chercher à nouveau
                        if (errorData.message === "Ingredient already exists") {
                          const retrySearch = await fetch(
                            `/api/ingredients/search?q=${encodeURIComponent(
                              ingredient.name.trim()
                            )}`,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          );
                          if (retrySearch.ok) {
                            const retryIngredients = await retrySearch.json();
                            if (retryIngredients.length > 0) {
                              ingredientId = retryIngredients[0]._id;
                            } else {
                              throw new Error(
                                "Failed to find existing ingredient"
                              );
                            }
                          } else {
                            throw new Error("Failed to search for ingredient");
                          }
                        } else {
                          throw new Error(
                            errorData.message || "Failed to create ingredient"
                          );
                        }
                      } else {
                        const newIngredient = await createResponse.json();
                        ingredientId = newIngredient._id;
                      }
                    }
                  } else {
                    throw new Error("Failed to search for ingredient");
                  }

                  // Retourner l'objet avec l'ID de l'ingrédient
                  return {
                    name: ingredient.name,
                    ingredientId: ingredientId,
                    quantity: parseFloat(ingredient.quantity) || 0,
                    unit: ingredient.unit || "g",
                    optional: false,
                  };
                } catch (error) {
                  console.error("Error processing ingredient:", error);
                  throw error;
                }
              })
            ),
          }),
        }
      );

      if (!ingredientsResponse.ok) {
        const errorData = await ingredientsResponse.json();
        throw new Error(errorData.message || "Failed to save ingredients");
      }

      // 3. Sauvegarder les étapes
      const stepsResponse = await fetch(`/api/recipes/${recipeId}/steps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          steps: steps.map((step) => ({
            step: step.step,
            description: step.description,
            imageUrl: step.image ? "https://via.placeholder.com/200" : null,
          })),
        }),
      });

      if (!stepsResponse.ok) {
        const errorData = await stepsResponse.json();
        throw new Error(errorData.message || "Failed to save steps");
      }

      // Nettoyer le localStorage
      localStorage.removeItem("selectedIngredients");

      // Rediriger vers la page de succès
      navigate("/myrecipe", {
        state: {
          message: "Recipe created successfully!",
          recipeId: recipeId,
        },
      });
    } catch (error) {
      console.error("Error saving recipe:", error);
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex overflow-hidden opacity-80 relative">
      <div className="min-h-screen md:70 lg:w-80 hidden md:block">
        <h2 className="text-xl mb-4 p-4">Selected Ingredients:</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2">
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={index}
              className="w-30 h-15 p-2 flex border-1 rounded-lg justify-center items-center mb-4 mx-2"
            >
              <img src={ingredient.image} className="w-10 h-10 mr-2" />
              <div>
                <p>{ingredient.name}</p>
                <p className="text-sm text-gray-600">
                  {ingredient.quantity} {ingredient.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {filter && (
        <div
          className="h-150 w-70 absolute top-22 left-12 bg-[#FFFAF0]
         rounded-lg md:hidden mx-auto min-w-80 border-1 border-stone-400"
        >
          <h2 className="text-xl mb-4 p-4">Selected Ingredients:</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2">
            {selectedIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="w-30 h-15 p-2 flex border-1 rounded-lg justify-center items-center mb-4 mx-2"
              >
                <img src={ingredient.image} className="w-10 h-10 mr-2" />
                <div>
                  <p>{ingredient.name}</p>
                  <p className="text-sm text-gray-600">
                    {ingredient.quantity} {ingredient.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 bg-[#FFFAF0] min-h-screen">
        <div className="flex justify-center items-center">
          <div className="flex m-6">
            <button
              className="mr-4 md:hidden border-1 rounded-lg p-4 border-[#FF873C]"
              onClick={handleFilter}
            >
              Ingredients
            </button>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-center text-3xl lg:text-4xl">
            Create your own Recipe
          </h1>
        </div>
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row rounded-lg p-4 justify-start 2xl:justify-center items-center xl:w-370 xl:h-120 md:w-180 lg:w-200 md:h-120 ml-4">
              <label className="cursor-pointer">
                <div className="rounded-lg w-48 h-38 md:ml-4 mr-8 cursor-pointer md:w-100 md:h-80 xl:w-150 xl:h-110 lg:mr-16 xl:ml-0 border-2 border-dashed border-gray-300 flex flex-col justify-center items-center">
                  {recipeData.mainUrl ? (
                    <img
                      src={recipeData.mainUrl}
                      alt="Recipe"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaImage className="text-4xl text-gray-400 mb-2" />
                      <span className="text-gray-500">Click to add image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                </div>
              </label>
              <div>
                {Details.map((field) => (
                  <div
                    key={field}
                    className="my-4 flex flex-col justify-center"
                  >
                    <label className="text-left lg:text-xl">
                      {field === "name" && "Recipe Name"}
                      {field === "serving" && "Number of serving"}
                      {field === "duration" && "Cook duration"}
                      {field === "speciality" && "Speciality"}
                    </label>
                    <input
                      name={field}
                      value={recipeData[field] || ""}
                      onChange={handleInputChange}
                      className="border-1 border-stone-400 rounded-lg outline-none p-2"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="border-1 border-stone-400 rounded-lg xl:max-w-300 mb-4 p-4"
            >
              <h4 className="mb-2">Step {step.step}</h4>
              <textarea
                value={step.description}
                onChange={(e) => handleStepChange(step.step, e.target.value)}
                className="w-full p-2 border-1 border-stone-400 rounded-lg mb-4"
                rows="3"
                placeholder={`Enter step ${step.step} description`}
                required
              />
              <div className="flex flex-col items-center">
                {step.imagePreview && (
                  <img
                    src={step.imagePreview}
                    alt={`Step ${step.step}`}
                    className="w-48 h-48 object-cover rounded-lg mb-2"
                  />
                )}
                <label className="cursor-pointer bg-[#FF873C] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B1A]">
                  {step.image ? "Change Image" : "Add Image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(step.step, e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ))}
          <button
            onClick={addStep}
            className="rounded-full border-1 border-stone-400 text-xl w-30 h-10 my-4 bg-[#FF873C] text-white"
          >
            Add Step
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={saveRecipe}
            disabled={isSaving}
            className={`rounded-full border-1 border-stone-400 text-2xl w-30 h-10 my-8 bg-[#FF873C] text-white ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe2;
