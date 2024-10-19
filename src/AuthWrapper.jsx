// import React from 'react';
// import { useSignIn, useSignUp, useUser } from '@clerk/clerk-react';
// import { Navigate } from 'react-router-dom';

// const AuthWrapper = ({ children }) => {
//   const { isSignedIn } = useUser();
//   const { isLoaded } = useSignIn();
//   const { isSignUpLoaded } = useSignUp();

//   if (isLoaded && isSignUpLoaded) {
//     if (isSignedIn) {
//       return <Navigate to="/intern" />;
//     }
//   }

//   return children;
// };

// export default AuthWrapper;
