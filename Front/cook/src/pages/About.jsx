import AboutPage from "../compo/About/AboutPage";
import Navbar from "../compo/Navbar/Navbar";

function About() {
  return (
    <div className="font-outfit min-h-screen flex flex-col bg-[#FFF3D8]">
      <Navbar />
      <AboutPage />
    </div>
  );
}

export default About;
