import React, { useState } from "react";
import { specialties } from "./img";

function Spe() {
  const [rotation, setRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const quantity = specialties.length;

  const handlePrev = () => {
    setRotation((prev) => prev + 36);
  };

  const handleNext = () => {
    setRotation((prev) => prev - 36);
  };

  const handleSpecialtyClick = (specialty) => {
    window.location.href = "/about";
  };

  const getSliderDimensions = () => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      if (isMobile) {
        return {
          width: "120px",
          height: "160px",
          translateZ: "200px",
          perspective: "600px",
        };
      } else if (isTablet) {
        return {
          width: "160px",
          height: "200px",
          translateZ: "280px",
          perspective: "800px",
        };
      }
    }
    return {
      width: "208px",
      height: "256px",
      translateZ: "350px",
      perspective: "1000px",
    };
  };

  const dimensions = getSliderDimensions();

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-center items-center  text-[#ff873c] ">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8 text-center mt-10">
          Choose your Speciality
        </h1>

        <div className="w-full h-100 md:h-150 text-center overflow-hidden relative">
          <div
            className="absolute top-[15%] md:top-[12%] lg:top-[10%] left-1/2 -translate-x-1/2 z-10"
            style={{
              width: dimensions.width,
              height: dimensions.height,
              transformStyle: "preserve-3d",
              transform: `perspective(${dimensions.perspective}) rotateX(-16deg) rotateY(${rotation}deg)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {specialties.map((specialty, index) => (
              <div
                key={specialty.id}
                className="absolute inset-0 cursor-pointer group"
                style={{
                  "--position": index + 1,
                  "--quantity": quantity,
                  transform: `rotateY(${
                    index * (360 / quantity)
                  }deg) translateZ(${dimensions.translateZ})`,
                }}
                onClick={() => handleSpecialtyClick(specialty)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full h-full overflow-hidden rounded-md md:rounded-lg shadow-md md:shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={specialty.image}
                    alt={specialty.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                      <h3 className="text-white text-xs md:text-sm font-semibold text-center">
                        {specialty.title}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 md:gap-4 mt-4 md:mt-6 lg:mt-8">
          <button
            onClick={handlePrev}
            className="w-16 h-10 md:w-20 md:h-12 text-sm md:text-base rounded-full bg-[#ff873c] text-white hover:bg-[#f36e1c] transition-colors active:scale-95"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="w-16 h-10 md:w-20 md:h-12 text-sm md:text-base rounded-full bg-[#ff873c] text-white hover:bg-[#f36e1c] transition-colors active:scale-95"
          >
            Next
          </button>
        </div>

        <div className="block md:hidden mt-4 text-sm text-gray-500 text-center">
          Tap images or buttons to navigate
        </div>
      </div>
    </div>
  );
}

export default Spe;
