import egg from "../../assets/images/oeuf.png";
import spinach from "../../assets/images/spinach.png";
import pork from "../../assets/images/pork.png";

export const Ingredients = [
  {
    title: "Ingredients",
    ingre: [
      { name: "egg ", image: egg },
      { name: "spinach", image: spinach },
      { name: "pork", image: pork },
    ],
  },
];

export const Details = [
  "Recipe Name: ",
  "Number of serving: ",
  "Cook duration: ",
  "Speciality: ",
];
export const categories = [
  { value: "vegetables", label: "Vegetables", icon: "🥬" },
  { value: "meats", label: "Meats", icon: "🥩" },
  { value: "fish", label: "Fish", icon: "🐟" },
  { value: "dairy-products", label: "Dairy", icon: "🥛" },
  { value: "spices", label: "Spices", icon: "🌶️" },
  { value: "grains", label: "Grains", icon: "🌾" },
  { value: "fruits", label: "Fruits", icon: "🍎" },
  { value: "proteins", label: "Proteins", icon: "🥚" },
  { value: "all", label: "All", icon: "🍽️" },
];
