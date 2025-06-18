import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(email, password);
    if (!error) {
      navigate("/");
    }
  }

  const inputs = [
    {
      placeholder: "Email Address",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      placeholder: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <form className="container mx-auto" onSubmit={handleSubmit}>
      <div
        className="mx-8 bg-[#FFF3D8] rounded-lg opacity-80 flex flex-col 
      justify-center items-center h-130 md:w-130 md:mx-auto mb-5"
      >
        <div className="flex justify-start">
          <h1 className="text-4xl text-[rgb(0,0,0)] opacity-90 my-8">
            Sign Up
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          {inputs.map((input, index) => (
            <div
              key={index}
              className="border-1 border-[#B29F9F] rounded-lg p-2 my-2"
            >
              <input
                value={input.value}
                onChange={input.onChange}
                type={input.type}
                placeholder={input.placeholder}
                className="text-[#000000] font-bold w-60 h-10 md:w-80 outline-none"
              />
            </div>
          ))}
          <button
            disabled={isLoading}
            className="bg-[#ff873c] text-white rounded-md px-8 py-2 my-4"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          {error && (
            <div className="text-red-500 mt-2 text-center">{error}</div>
          )}
        </div>
      </div>
    </form>
  );
}

export default SignUp;
