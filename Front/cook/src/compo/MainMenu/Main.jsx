import React, { useState } from "react";

import { Items, Info } from "./Info";

function Main() {
  const [filter, setFilter] = useState(false);

  function handleFilter() {
    setFilter((set) => !set);
  }
  return (
    <div className="flex overflow-hidden opacity-90 relative">
      <div className=" min-h-screen md:w-60  hidden md:block">
        {Items.map((item, index) => (
          <div className="container my-6 " key={index}>
            <div className="flex flex-col mx-5">
              <h2 className="text-xl mb-4">{item.title}</h2>
              {item.spe.map((itemBis, i) => (
                <div className="flex " key={i}>
                  <input type="checkbox" className="mr-2" />
                  <label className="">{itemBis}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {filter && (
        <div className=" h-150 w-70 absolute top-20 left-12 bg-[#FF873C] rounded-lg md:hidden ">
          {Items.map((item, index) => (
            <div className="container my-6 " key={index}>
              <div className="flex flex-col justify-center items-center mx-5 text-white ">
                <h2 className="text-xl mb-4">{item.title}</h2>
                {item.spe.map((itemBis, i) => (
                  <div className="flex" key={i}>
                    <input type="checkbox" className="mr-2" />
                    <label className="">{itemBis}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex-1 bg-[#FFFAF0] ">
        <div className="flex justify-center items-center">
          <div className="flex m-6">
            <button className="mr-4 md:hidden" onClick={handleFilter}>
              BTN
            </button>
            <input className="p-2 outline-none w-60 h-10 border-1 border-stone-600 rounded-lg  md:w-120" />
            <button className="w-15 h-10 rounded-lg bg-[#FF873C] cursor-pointer text-white">
              search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
          {Info.map((info, index) => (
            <div className="flex flex-col">
              <div
                key={index}
                className="flex flex-col  rounded-lg p-4 max-w-sm justify-center items-center mx-auto md:mx-0 min-w-90 md:min-w-62 border-1 border-stone-400 "
              >
                <h1 className="text-[#FF873C] text-center text-xl">
                  {info.title}
                </h1>
                <div className="flex mt-2">
                  <img
                    src={info.image}
                    className="rounded-lg w-28 h-22  md:ml-2 mr-8 cursor-pointer md:w-20 md:h-16  "
                  />
                  <div className="flex justify-center items-center">
                    <div className="flex flex-col  ">
                      <p>{info.time[0]}</p>
                      <p>{info.time[1]}</p>
                    </div>
                    {!filter && (
                      <hr className="h-1 w-12 text-black rotate-90 " />
                    )}
                    <div className="flex flex-col ">
                      <p>{info.pers[0]}</p>
                      <p>{info.pers[1]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
