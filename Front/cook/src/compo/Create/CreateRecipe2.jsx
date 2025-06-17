import React, { useState } from "react";
import img12 from "../../assets/images/img12.jpg";
import { Ingredients, Details } from "./Info";

function CreateRecipe2() {
  const [filter, setFilter] = useState(false);

  function handleFilter() {
    setFilter((set) => !set);
  }
  return (
    <div className="flex overflow-hidden opacity-80 relative">
      <div className=" min-h-screen  md:70 lg:w-80  hidden md:block">
        {Ingredients.map((item, index) => (
          <div className="container my-6 " key={index}>
            <div className="flex flex-col mx-5">
              <h2 className="text-xl mb-4">{item.title}</h2>
              <div className="grid  md:grid-cols-1 lg:grid-cols-2">
                {item.ingre.map((ingredients) => (
                  <div className="w-30 h-15 p-2 flex border-1 rounded-lg justify-center items-center mb-4 ">
                    <img src={ingredients.image} className="w-10 h-10 mr-2" />
                    {ingredients.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filter && (
        <div className=" h-150 w-70 absolute top-22 left-12 bg-[#FFFAF0] rounded-lg md:hidden mx-auto min-w-80 border-1 border-stone-400">
          {Ingredients.map((item, index) => (
            <div className="container my-6 " key={index}>
              <div className="flex flex-col mx-5">
                <h2 className="text-xl mb-4 text-center">{item.title}</h2>
                <div className="grid  md:grid-cols-1 lg:grid-cols-2">
                  {item.ingre.map((ingredients) => (
                    <div className="w-30 h-15 p-2 flex border-1 rounded-lg justify-center items-center mb-4 ">
                      <img src={ingredients.image} className="w-10 h-10 mr-2" />
                      {ingredients.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex-1 bg-[#FFFAF0] min-h-screen ">
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
        <div className="w-full ">
          <h1 className="text-center text-3xl lg:text-4xl">
            Create you own Recipe
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="container mx-auto ">
            <div className="flex flex-col  md:flex-row rounded-lg p-4 justify-start 2xl:justify-center  items-center xl:w-370 xl:h-120   md:w-180 lg:w-200  md:h-120 ml-4">
              <img
                src={img12}
                className="rounded-lg w-48 h-38   md:ml-4 mr-8  cursor-pointer md:w-100 md:h-80 xl:w-150 xl:h-110 lg:mr-16 xl:ml-0"
              />
              <div>
                {Details.map((item) => (
                  <div className="my-4 flex flex-col justify-center">
                    <label className="text-left lg:text-xl">{item}</label>
                    <input className="border-1 border-stone-400 rounded-lg outline-none" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col "></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto border-1 border-stone-400 rounded-lg xl:max-w-300 h-30">
          <h4 className="p-4">Step 1</h4>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe2;
