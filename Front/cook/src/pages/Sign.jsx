import Navbar from "../compo/Navbar/Navbar";
import SignUp from "../compo/SignUp/SignUp";

function Sign() {
  return (
    <div
      className="font-outfit min-h-screen flex flex-col "
      style={{
        background:
          "radial-gradient(circle at center,rgb(243, 198, 121),rgb(255, 214, 120))",
      }}
    >
      <Navbar />
      <SignUp />
    </div>
  );
}

export default Sign;
