// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
// import Intern_home from "./components/Intern_home";
// import Fte_home from "./components/Fte_home";
// import Company_details from "./components/Company_details";
// import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn, afterSignUpUrl } from "@clerk/clerk-react";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/sign-up" />} />
        
//         {/* Auth Routes */}
//         <Route 
//           path="/sign-in" 
//           element={<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />} 
//         />
//         <Route 
//           path="/sign-up" 
//           element={<SignUp routing="path" path="/sign-up" afterSignUpUrl="/intern" />} 
//         />

//         {/* Protect these routes */}
//         <Route
//           path="/intern"
//           element={
//             <SignedIn>
//               <Intern_home />
//             </SignedIn>
//           }
//         />
//         <Route
//           path="/fte"
//           element={
//             <SignedIn>
//               <Fte_home />
//             </SignedIn>
//           }
//         />
//         <Route
//           path="/intern/details/:id"
//           element={
//             <SignedIn>
//               <Company_details />
//             </SignedIn>
//           }
//         />

//         {/* Redirect to sign in if not signed in */}
//         <Route
//           path="*"
//           element={
//             <SignedOut>
//               <RedirectToSignIn />
//             </SignedOut>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Intern_home from "./components/Intern_home";
// import Fte_home from "./components/Fte_home";
// import Company_details from "./components/Company_details";
// import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
// import AuthWrapper from "./AuthWrapper";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <SignedOut>
//               <Navigate to="/sign-up" />
//             </SignedOut>
//           }
//         />

//         <Route 
//           path="/sign-in" 
//           element={<SignIn routing="path" path="/sign-in"  />} 
//         />
//         <Route 
//           path="/sign-up" 
//           element={<SignUp routing="path" path ="/sign-up"  />} 
//         />

//         {/* <Route
//           path="/intern"
//           element={
//             <AuthWrapper>
//               <SignedIn>
//                 <Intern_home />
//               </SignedIn>
//             </AuthWrapper>
//           }
//         />
//         <Route
//           path="/fte"
//           element={
//             <AuthWrapper>
//               <SignedIn>
//                 <Fte_home />
//               </SignedIn>
//             </AuthWrapper>
//           }
//         />
//         <Route
//           path="intern/details/:id"
//           element={
//             <AuthWrapper>
//               <SignedIn>
//                 <Company_details />
//               </SignedIn>
//             </AuthWrapper>
//           }
//         /> */}

// <Route path="/intern" element={<Intern_home />} />
// <Route path = "/intern/details/:id" element={<Company_details />}/>

//         <Route
//           path="*"
//           element={
//             <SignedOut>
//               <Navigate to="/sign-in" />
//             </SignedOut>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Intern_home from "./components/Intern_home";
import Fte_home from "./components/Fte_home";
// import Upsolve_home from "./components/Upsolve_home";
// import Codecast_home from "./components/Codecast_home";
import Company_details from "./components/Company_details";
import Landing_page from './components/Landing_page';

import { SignIn, SignUp, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useAuth(); // Check if user is signed in

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to="/home" /> // Redirect to home if signed in
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/sign-in"
          element={
            isSignedIn ? (
              <Navigate to="/home" /> // Redirect to home if already signed in
            ) : (
              <SignIn routing="path" path="/sign-in" />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            isSignedIn ? (
              <Navigate to="/home" /> // Redirect to home if already signed up
            ) : (
              <SignUp routing="path" path="/sign-up" />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <SignedIn>
              <Landing_page />
            </SignedIn>
          }
        />

        {/* Feature Routes */}
        <Route
          path="/intern"
          element={
            <SignedIn>
              <Intern_home />
            </SignedIn>
          }
        />
        <Route
          path="/fte"
          element={
            <SignedIn>
              <Fte_home />
            </SignedIn>
          }
        />
        {/* <Route
          path="/upsolve"
          element={
            <SignedIn>
              <Upsolve_home />
            </SignedIn>
          }
        />
        <Route
          path="/codecast"
          element={
            <SignedIn>
              <Codecast_home />
            </SignedIn>
          }
        /> */}
        <Route
          path="/intern/details/:id"
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
      </Routes>
    </Router>
  );
}

export default App;
