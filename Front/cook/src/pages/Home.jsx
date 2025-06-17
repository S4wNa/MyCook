import React from "react";
import Navbar from "../compo/Navbar/Navbar";
import Middle from "../compo/Home/Middle";

function Home() {
  return (
    <div
      className="font-outfit min-h-screen flex flex-col "
      style={{
        background:
          "radial-gradient(circle at center,rgb(243, 198, 121),rgb(255, 214, 120))",
      }}
    >
      <Navbar />
      <Middle />
    </div>
  );
}

export default Home;
