import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import defaultImage from "../../assets/images/img12.jpg";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipeData, setRecipeData] = useState({
    name: "",
    duration: "",
    serving: "",
    speciality: "",
    mainUrl: null,
  });
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
      }

      const data = await response.json();
      setRecipe(data.recipe);
      setRecipeData({
        name: data.recipe.name,
        duration: data.recipe.duration,
        serving: data.recipe.serving,
        speciality: data.recipe.speciality,
        mainUrl: data.recipe.mainUrl,
      });
      setSteps(data.steps);
      setIngredients(data.ingredients);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: value,
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

  const handleStepChange = (stepId, value) => {
    setSteps((prev) =>
      prev.map((step) =>
        step._id === stepId ? { ...step, description: value } : step
      )
    );
  };

  const handleStepImageChange = async (stepId, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSteps((prev) =>
        prev.map((step) =>
          step._id === stepId
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
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const recipeResponse = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: recipeData.name,
          duration: recipeData.duration,
          serving: recipeData.serving,
          speciality: recipeData.speciality,
          mainUrl: recipeData.mainUrl,
        }),
      });

      if (!recipeResponse.ok) {
        throw new Error("Failed to update recipe");
      }

      const stepsResponse = await fetch(
        `${API_BASE_URL}/api/recipes/${id}/steps`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            steps: steps.map((step) => ({
              step: step.step,
              description: step.description,
              imageUrl: step.image
                ? URL.createObjectURL(step.image)
                : step.imageUrl,
            })),
          }),
        }
      );

      if (!stepsResponse.ok) {
        throw new Error("Failed to update steps");
      }

      alert("Recette mise à jour avec succès !");
      navigate("/myrecipe");
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex-1 bg-[#FFFAF0] min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-center text-3xl lg:text-4xl mb-8">
          Modifier la recette
        </h1>
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
                <div className="my-4 flex flex-col justify-center">
                  <label className="text-left lg:text-xl">
                    Nom de la recette
                  </label>
                  <input
                    name="name"
                    value={recipeData.name}
                    onChange={handleInputChange}
                    className="border-1 border-stone-400 rounded-lg outline-none p-2"
                  />
                </div>
                <div className="my-4 flex flex-col justify-center">
                  <label className="text-left lg:text-xl">
                    Nombre de portions
                  </label>
                  <input
                    name="serving"
                    value={recipeData.serving}
                    onChange={handleInputChange}
                    className="border-1 border-stone-400 rounded-lg outline-none p-2"
                  />
                </div>
                <div className="my-4 flex flex-col justify-center">
                  <label className="text-left lg:text-xl">
                    Durée de cuisson
                  </label>
                  <input
                    name="duration"
                    value={recipeData.duration}
                    onChange={handleInputChange}
                    className="border-1 border-stone-400 rounded-lg outline-none p-2"
                  />
                </div>
                <div className="my-4 flex flex-col justify-center">
                  <label className="text-left lg:text-xl">Spécialité</label>
                  <input
                    name="speciality"
                    value={recipeData.speciality}
                    onChange={handleInputChange}
                    className="border-1 border-stone-400 rounded-lg outline-none p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <h2 className="text-2xl mb-4">Étapes de préparation</h2>
          {steps.map((step) => (
            <div
              key={step._id}
              className="border-1 border-stone-400 rounded-lg xl:max-w-300 mb-4 p-4"
            >
              <h4 className="mb-2">Étape {step.step}</h4>
              <textarea
                value={step.description}
                onChange={(e) => handleStepChange(step._id, e.target.value)}
                className="w-full p-2 border-1 border-stone-400 rounded-lg mb-4"
                rows="3"
                placeholder={`Entrez la description de l'étape ${step.step}`}
              />
              <div className="flex flex-col items-center">
                {(step.imagePreview || step.imageUrl) && (
                  <img
                    src={step.imagePreview || step.imageUrl}
                    alt={`Étape ${step.step}`}
                    className="w-48 h-48 object-cover rounded-lg mb-2"
                  />
                )}
                <label className="cursor-pointer bg-[#FF873C] text-white px-4 py-2 rounded-lg hover:bg-[#FF6B1A]">
                  {step.image ? "Changer l'image" : "Ajouter une image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleStepImageChange(step._id, e)}
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
            Ajouter une étape
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className={`rounded-full border-1 border-stone-400 text-2xl w-30 h-10 my-8 bg-[#FF873C] text-white ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
