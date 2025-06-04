import React from "react";
import Login from "../compo/Login/Login";
import Navbar from "../compo/Home/Navbar";

function Log() {
  return (
    <div
      className="font-outfit min-h-screen flex flex-col "
      style={{
        background:
          "radial-gradient(circle at center,rgb(243, 198, 121),rgb(255, 214, 120))",
      }}
    >
      <Navbar />
      <Login />
    </div>
  );
}

export default Log;
