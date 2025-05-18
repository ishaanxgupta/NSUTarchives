import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Intern_home from "./components/Intern_home";
import Fte_home from "./components/Fte_home";
import Company_details from "./components/Company_details";
import Landing_page from './components/Landing_page';

import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import Questions_page from "./components/Questions_page";
import Upsolve from "./components/Upsolve";
import User_profile from "./components/User_profile";
function App() {
  const { isSignedIn } = useAuth(); 

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/user_profile" element={<User_profile/>} />
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to="/home" /> 
            ) : (
              <Navigate to="/sign-up" />
            )
          }
        />
        <Route
          path="/sign-in"
          element={
            isSignedIn ? (
              <Navigate to="/home" /> 
            ) : (
              <SignInPage />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            isSignedIn ? (
              <Navigate to="/home" /> // Redirect to home if already signed up
            ) : (
              // <SignUp routing="path" path="/sign-up" />
              <SignUpPage />
            )
          }
        />
        <Route
          path="/patakaro"
          element={
            isSignedIn ? (
              <Intern_home /> // Redirect to home if already signed up
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/home"
          element={
            isSignedIn ? (
              <Landing_page /> // Redirect to home if already signed up
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        {/* Protected Routes */}
        {/* <Route
          path="/home"
          element={
            <SignedIn>
              <Landing_page />
            </SignedIn>
          }
        /> */}

        {/* Feature Routes */}
        {/* <Route
          path="/intern"
          element={
            <SignedIn>
              <Intern_home />
            </SignedIn>
          }
        /> */}

        <Route
          path="/fte"
          element={
            <SignedIn>
              <Fte_home />
            </SignedIn>
          }
        />
        <Route
          path="/upsolve/:id"
          element={
            <SignedIn>
              <Upsolve />
            </SignedIn>
          }
        />
        <Route
          path="/intellicode"
          element={
            <SignedIn>
              <Questions_page />
            </SignedIn>
          }
        />
        <Route
          path="/patakaro/details/:id"
          element={
            <SignedIn>
              <Company_details />
            </SignedIn>
          }
        />

        {/* Redirect unauthenticated users */}
        <Route
          path="*"
          element={
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          }
        />
        <Route path="/questions" element  ={<Questions_page />} />
      </Routes>
    </Router>
  );
}

export default App;
