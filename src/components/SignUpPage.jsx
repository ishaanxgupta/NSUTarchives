// SignInPage.js
import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side with Professional Design */}
      <div className="flex-1 flex flex-col basis-3/5 justify-center items-center bg-black">
        <h6
          className="text-2xl sm:text-2xl lg:text-5xl font-bold mb-4 animate-fade-in"
          style={{
            background: "linear-gradient(to right, #007BFF, #20C997)", // Blue to Teal gradient
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Welcome to Our Website
        </h6>
        <p className="text-lg text-white text-center animate-fade-in">
          Access exclusive resources, connect with peers, and unlock new opportunities.
        </p>
      </div>
      
      {/* Right Side with Clerk Sign-In and Blur Background */}
      <div className="flex-1 flex basis-2/5 justify-center items-center bg-teal-600 p-8 backdrop-blur-sm">
        <SignUp
          routing="path"
          path="/sign-up"
          appearance={{
            elements: {
              formButtonPrimary: "bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold py-2 px-4 rounded-md",
                // formFieldRow: "border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500",
              // formField: "text-gray-700 text-sm font-medium",
              // formFieldErrorText: "text-yellow-600 text-xs mt-1",
              // cardBox: "shadow-lg border border-gray-200 rounded-lg p-6 w-full max-w-md",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;