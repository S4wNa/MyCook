import React, { useState } from "react";
import { Ingredients, categories } from "./Info";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const [filter, setFilter] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [quantities, setQuantities] = useState({});
  const [units, setUnits] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  function handleFilter() {
    setFilter((set) => !set);
  }

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredient.name]: !prev[ingredient.name],
    }));

    // Initialiser les valeurs par défaut si l'ingrédient est sélectionné
    if (!selectedIngredients[ingredient.name]) {
      setQuantities((prev) => ({
        ...prev,
        [ingredient.name]: "",
      }));
      setUnits((prev) => ({
        ...prev,
        [ingredient.name]: "g",
      }));
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleQuantityChange = (ingredientName, value) => {
    setQuantities((prev) => ({
      ...prev,
      [ingredientName]: value,
    }));
  };

  const handleUnitChange = (ingredientName, value) => {
    setUnits((prev) => ({
      ...prev,
      [ingredientName]: value,
    }));
  };

  const getIngredientsByCategory = (category) => {
    if (category === "all") {
      return Ingredients.filter((item) => item.title === "All");
    }

    // Mapping des catégories du bouton vers les titres des ingrédients
    const categoryMapping = {
      vegetables: "Vegetables",
      meats: "Meats",
      fish: "Fish",
      "dairy-products": "Dairy",
      spices: "Spices",
      grains: "Grains",
      fruits: "Fruits",
      proteins: "Proteins",
    };

    const targetTitle = categoryMapping[category];

    // Retourner les ingrédients de la catégorie sélectionnée
    return Ingredients.filter((item) => item.title === targetTitle);
  };

  const handleNext = () => {
    // Vérifier qu'au moins un ingrédient est sélectionné
    const selectedCount =
      Object.values(selectedIngredients).filter(Boolean).length;

    if (selectedCount === 0) {
      alert("Veuillez sélectionner au moins un ingrédient avant de continuer.");
      return;
    }

    const selectedWithQuantities = Object.entries(selectedIngredients)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => ({
        name,
        quantity: parseFloat(quantities[name]) || 0,
        unit: units[name] || "g",
        image: Ingredients.flatMap((cat) => cat.ingre).find(
          (ing) => ing.name === name
        )?.image,
      }));

    // Stocker les ingrédients sélectionnés dans localStorage
    localStorage.setItem(
      "selectedIngredients",
      JSON.stringify(selectedWithQuantities)
    );
    navigate("/recipe");
  };

  const filteredIngredients = getIngredientsByCategory(selectedCategory);

  return (
    <div className="container mx-auto opacity-80 flex-col flex overflow-hidden min-h-screen">
      <div className="relative flex flex-col">
        <div className=" grid grid-cols-3 md:grid-cols-1 ">
          <div className="md:hidden flex flex-col items-center">
            <button className="mb-2" onClick={handleFilter}>
              {Object.keys(selectedIngredients).filter(
                (key) => selectedIngredients[key]
              ).length > 0
                ? `${
                    Object.keys(selectedIngredients).filter(
                      (key) => selectedIngredients[key]
                    ).length
                  } ingredients`
                : "Select"}
            </button>
            <button
              className="text-xs bg-[#FF873C] text-white px-3 py-1 rounded-full hover:bg-[#e6762a] transition-colors"
              onClick={handleFilter}
            >
              See
            </button>
          </div>
          <h1
            className="text-center text-3xl md:text-4xl lg:text-5xl  my-4
          lg:my-8"
          >
            Ingredients
          </h1>
        </div>
        <div className="flex m-6 justify-center items-center">
          <input className="p-2 outline-none w-60 h-10 border-1 border-stone-600 rounded-lg  md:w-120" />
          <button className="w-15 h-10 rounded-lg bg-[#FF873C] cursor-pointer text-white">
            search
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 ">
          {categories.map((item, i) => (
            <div
              className={`flex rounded-full border-1 border-stone-400 w-30 p-2 m-2 cursor-pointer hover:bg-[#FF873C] active:bg-[#FF873C] justify-center items-center ${
                selectedCategory === item.value ? "bg-[#FF873C] text-white" : ""
              }`}
              key={i}
              onClick={() => handleCategoryClick(item.value)}
            >
              <span>{item.icon}</span>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        {filter && (
          <div
            className="absolute top-22 left-12 bg-[#FFFAF0] rounded-lg md:hidden mx-auto min-w-80 border-1 border-stone-400"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <div className="container p-4">
              <h2 className="text-xl mb-4 text-center">Selected ingredients</h2>
              {Object.keys(selectedIngredients).filter(
                (key) => selectedIngredients[key]
              ).length === 0 ? (
                <p className="text-center text-gray-500">
                  No ingredients selected
                </p>
              ) : (
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2">
                  {Object.entries(selectedIngredients)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([ingredientName]) => {
                      const ingredient = Ingredients.flatMap(
                        (cat) => cat.ingre
                      ).find((ing) => ing.name === ingredientName);
                      return (
                        <div key={ingredientName} className="mb-4">
                          <div className="w-full h-15 p-2 flex border-1 rounded-lg justify-center items-center bg-[#FF873C] text-white">
                            <img
                              src={ingredient?.image}
                              className="w-10 h-10 mr-2"
                            />
                            {ingredientName}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <input
                              type="number"
                              placeholder="Qty"
                              className="w-20 h-8 border-1 border-stone-400 rounded-lg p-1 text-sm"
                              value={quantities[ingredientName] || ""}
                              onChange={(e) =>
                                handleQuantityChange(
                                  ingredientName,
                                  e.target.value
                                )
                              }
                            />
                            <select
                              className="w-16 h-8 border-1 border-stone-400 rounded-lg p-1 text-sm"
                              value={units[ingredientName] || "g"}
                              onChange={(e) =>
                                handleUnitChange(ingredientName, e.target.value)
                              }
                            >
                              <option value="g">g</option>
                              <option value="kg">kg</option>
                              <option value="ml">ml</option>
                              <option value="l">l</option>
                              <option value="pcs">pcs</option>
                              <option value="tbsp">tbsp</option>
                              <option value="tsp">tsp</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="text-center my-8 mx-2">
        {filteredIngredients.map((item, ind) => (
          <div
            key={ind}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
          >
            {item.ingre.map((ingredients) => (
              <div key={ingredients.name} className="mb-4">
                <div
                  className={`border-1 border-stone-400 rounded-lg w-30 h-25 flex  justify-center items-center flex-col cursor-pointer ${
                    selectedIngredients[ingredients.name]
                      ? "border-[#FF873C] bg-[#FF873C] text-white"
                      : ""
                  }`}
                  onClick={() => handleIngredientClick(ingredients)}
                >
                  <img src={ingredients.image} className="w-15 h-15 " />
                  <div>
                    <p>{ingredients.name}</p>
                  </div>
                </div>
                {selectedIngredients[ingredients.name] && (
                  <div className="flex gap-2 mt-2 justify-center items-center">
                    <input
                      type="number"
                      placeholder="Qty"
                      className="w-16 h-8 border-1 border-stone-400 rounded-lg p-1 text-sm text-center"
                      value={quantities[ingredients.name] || ""}
                      onChange={(e) =>
                        handleQuantityChange(ingredients.name, e.target.value)
                      }
                    />
                    <select
                      className="w-14 h-8 border-1 border-stone-400 rounded-lg p-1 text-sm"
                      value={units[ingredients.name] || "g"}
                      onChange={(e) =>
                        handleUnitChange(ingredients.name, e.target.value)
                      }
                    >
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="l">l</option>
                      <option value="pcs">pcs</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <button
          className="rounded-full border-1 border-stone-400 text-2xl w-30 h-10 my-8 bg-[#FF873C] text-white"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;
