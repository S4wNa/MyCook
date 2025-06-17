import React, { useState } from "react";
import { Ingredients, categories } from "./Info";

function CreateRecipe() {
  const [filter, setFilter] = useState(false);

  function handleFilter() {
    setFilter((set) => !set);
  }
  return (
    <div className="container mx-auto opacity-80 flex-col flex overflow-hidden min-h-screen">
      <div className="relative flex flex-col">
        <div className=" grid grid-cols-3 md:grid-cols-1 ">
          <button className="md:hidden" onClick={handleFilter}>
            BTN
          </button>
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
              className="flex rounded-full border-1 border-stone-400 w-30 p-2 m-2 cursor-pointer hover:bg-[#FF873C] active:bg-[#FF873C] justify-center items-center"
              key={i}
            >
              <span>{item.icon}</span>
              <p>{item.label}</p>
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
                        <img
                          src={ingredients.image}
                          className="w-10 h-10 mr-2"
                        />
                        {ingredients.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-center my-8 mx-2">
        {Ingredients.map((item, ind) => (
          <div
            key={ind}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
          >
            {item.ingre.map((ingredients) => (
              <div className="border-1 border-stone-400 rounded-lg w-30 h-25 flex  justify-center items-center flex-col">
                <img src={ingredients.image} className="w-15 h-15 " />
                <div>
                  <p>{ingredients.name}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <button className="rounded-full border-1 border-stone-400 text-2xl w-30 h-10 my-8">
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;
