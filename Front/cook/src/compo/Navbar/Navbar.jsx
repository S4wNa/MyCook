// import React, { useState } from "react";
// import img from "../../assets/Logo.svg";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const [menu, setMenu] = useState(false);
//   const { user, dispatch } = useAuthContext();
//   const navigate = useNavigate();

//   function handleMenu() {
//     setMenu((change) => !change);
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     dispatch({ type: "LOGOUT" });
//     navigate("/login");
//   };

//   const Items = [
//     user ? [{ items: "My Recipe", link: "myrecipe" }] : [],
//     { items: "All Recipe", link: "main" },
//     { items: "Speciality", link: "speciality" },
//     { items: "About", link: "about" },
//   ];
//   const Mobile = [
//     user ? [{ items: "My Recipe", link: "myrecipe" }] : [],
//     { items: "Create", link: "ingredients" },
//     { items: "All Recipe", link: "main" },
//     { items: "Speciality", link: "speciality" },
//     { items: "About", link: "about" },
//   ];

//   return (
//     <div className="container mx-auto">
//       <div className="flex justify-between relative mx-4 md:mx-0">
//         <Link to="/home">
//           <img src={img} alt="logo" className="cursor-pointer" />
//         </Link>
//         <div className="flex items-center justify-center ">
//           {user && (
//             <Link to="/ingredients">
//               <button className="rounded-md text-[#ff873c] bg-white px-4 py-1 cursor-pointer hidden md:inline">
//                 Create
//               </button>
//             </Link>
//           )}
//           {Items.map((item, index) => {
//             return (
//               <div key={index} className="ml-6 hidden md:inline">
//                 <Link to={`/${item.link}`}>
//                   <button className="cursor-pointer">{item.items}</button>
//                 </Link>
//               </div>
//             );
//           })}
//           {!user && (
//             <>
//               <Link to="/signup">
//                 <button className="text-white rounded-md bg-[#ff873c] px-4 py-1 ml-6 cursor-pointer hidden md:inline">
//                   Sign Up
//                 </button>
//               </Link>
//               <Link to="/login">
//                 <button className="text-white ml-6 cursor-pointer hidden md:inline">
//                   Login
//                 </button>
//               </Link>
//             </>
//           )}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="text-white ml-6 cursor-pointer hidden md:inline"
//             >
//               Logout
//             </button>
//           )}
//           <button className="md:hidden" onClick={handleMenu}>
//             BTN
//           </button>
//         </div>
//       </div>
//       {/*Mobile Part */}
//       {menu && (
//         <div className="absolute md:hidden container z-999">
//           <div className="flex flex-col text-center items-center text-white bg-[#ff873c] mx-5 rounded-md h-80 p-4 z-999">
//             {Mobile.map((item, index) => {
//               return (
//                 <div className="mb-4" key={index}>
//                   <Link to={`/${item.link}`}>
//                     <button>{item.items}</button>
//                   </Link>
//                 </div>
//               );
//             })}
//             <hr className="w-full  border-white" />
//             {!user ? (
//               <>
//                 <Link to="/signup">
//                   <button className="mb-4 mt-8">Sign Up</button>
//                 </Link>
//                 <Link to="/login">
//                   <button className="mb-4 w-60 h-10 rounded-full bg-[#F3C679] ">
//                     Login
//                   </button>
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="mb-4 flex justify-center items-center
//                p-4 rounded-full w-60 h-10 bg-[#F3C679] mt-8"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;
import React, { useState } from "react";
import img from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleMenu() {
    setMenu((change) => !change);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // Items pour le menu desktop
  const Items = [
    ...(user ? [{ items: "My Recipe", link: "myrecipe" }] : []),
    { items: "All Recipe", link: "main" },
    { items: "Speciality", link: "speciality" },
    { items: "About", link: "about" },
  ];

  const Mobile = [
    ...(user ? [{ items: "My Recipe", link: "myrecipe" }] : []),
    ...(user ? [{ items: "Create", link: "ingredients" }] : []),
    { items: "All Recipe", link: "main" },
    { items: "Speciality", link: "speciality" },
    { items: "About", link: "about" },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between relative mx-4 md:mx-0">
        <Link to="/home">
          <img src={img} alt="logo" className="cursor-pointer" />
        </Link>
        <div className="flex items-center justify-center ">
          {user && (
            <Link to="/ingredients">
              <button className="rounded-md text-[#ff873c] bg-white px-4 py-1 cursor-pointer hidden md:inline">
                Create
              </button>
            </Link>
          )}
          {Items.map((item, index) => {
            return (
              <div key={index} className="ml-6 hidden md:inline">
                <Link to={`/${item.link}`}>
                  <button className="cursor-pointer">{item.items}</button>
                </Link>
              </div>
            );
          })}
          {!user && (
            <>
              <Link to="/signup">
                <button className="text-white rounded-md bg-[#ff873c] px-4 py-1 ml-6 cursor-pointer hidden md:inline">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="text-white ml-6 cursor-pointer hidden md:inline">
                  Login
                </button>
              </Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="text-white ml-6 cursor-pointer hidden md:inline"
            >
              Logout
            </button>
          )}
          <button className="md:hidden" onClick={handleMenu}>
            BTN
          </button>
        </div>
      </div>
      {/*Mobile Part */}
      {menu && (
        <div className="absolute md:hidden container z-999">
          <div className="flex flex-col text-center items-center text-white bg-[#ff873c] mx-5 rounded-md h-80 p-4 z-999">
            {Mobile.map((item, index) => {
              return (
                <div className="mb-4" key={index}>
                  <Link to={`/${item.link}`}>
                    <button>{item.items}</button>
                  </Link>
                </div>
              );
            })}
            <hr className="w-full  border-white" />
            {!user ? (
              <>
                <Link to="/signup">
                  <button className="mb-4 mt-8">Sign Up</button>
                </Link>
                <Link to="/login">
                  <button className="mb-4 w-60 h-10 rounded-full bg-[#F3C679] ">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="mb-4 flex justify-center items-center
               p-4 rounded-full w-60 h-10 bg-[#F3C679] mt-8"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
