import egg from "../../assets/images/oeuf.png";
import spinach from "../../assets/images/spinach.png";
import pork from "../../assets/images/pork.png";
import salt from "../../assets/images/salt.jpg";
import rice from "../../assets/images/rice.png";
import pepper from "../../assets/images/pepper.jpg";
import pasta from "../../assets/images/pasta.jpg";
import ginger from "../../assets/images/ginger.png";
import garlic from "../../assets/images/garlic.jpg";
import cheese from "../../assets/images/cheese.jpg";
import chicken from "../../assets/images/chicken.jpg";
import blackPepper from "../../assets/images/black-pepper.jpg";
import beef from "../../assets/images/beef.jpg";
import basil from "../../assets/images/basil.jpg";

export const Ingredients = [
  {
    title: "All",
    ingre: [
      { name: "egg", image: egg },
      { name: "spinach", image: spinach },
      { name: "pork", image: pork },
      { name: "pasta", image: pasta },
      { name: "cheese", image: cheese },
      { name: "ginger", image: ginger },
      { name: "pepper", image: pepper },
      { name: "garlic", image: garlic },
      { name: "rice", image: rice },
      { name: "salt", image: salt },
      { name: "beef", image: beef },
      { name: "chicken", image: chicken },
      { name: "black pepper", image: blackPepper },
      { name: "basil", image: basil },
    ],
  },
  {
    title: "Vegetables",
    ingre: [{ name: "spinach", image: spinach }],
  },
  {
    title: "Meats",
    ingre: [
      { name: "pork", image: pork },
      { name: "beef", image: beef },
      { name: "chicken", image: chicken },
    ],
  },
  {
    title: "Proteins",
    ingre: [
      { name: "egg ", image: egg },
      { name: "pork", image: pork },
      { name: "beef", image: beef },
      { name: "chicken", image: chicken },
    ],
  },
  {
    title: "Grains",
    ingre: [
      { name: "pasta", image: pasta },
      { name: "rice", image: rice },
    ],
  },
  {
    title: "Dairy",
    ingre: [{ name: "cheese", image: cheese }],
  },
  {
    title: "Spices",
    ingre: [
      { name: "ginger", image: ginger },
      { name: "pepper", image: pepper },
      { name: "garlic", image: garlic },
      { name: "salt", image: salt },
      { name: "balck pepper", image: blackPepper },
      { name: "basil", image: basil },
    ],
  },
];

export const Details = ["name", "serving", "duration", "speciality"];

export const categories = [
  { value: "all", label: "All", icon: "🍽️" },
  { value: "vegetables", label: "Vegetables", icon: "🥬" },
  { value: "meats", label: "Meats", icon: "🥩" },
  { value: "fish", label: "Fish", icon: "🐟" },
  { value: "dairy-products", label: "Dairy", icon: "🥛" },
  { value: "spices", label: "Spices", icon: "🌶️" },
  { value: "grains", label: "Grains", icon: "🌾" },
  { value: "fruits", label: "Fruits", icon: "🍎" },
  { value: "proteins", label: "Proteins", icon: "🥚" },
];
