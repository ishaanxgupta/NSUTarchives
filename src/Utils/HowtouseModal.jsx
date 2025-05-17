// import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/clerk-react';

// const HowTouseModal = () => {
//   const [showModal, setShowModal] = useState(true);
//  const user= useUser();

//   useEffect(() => {
//     const dontShowAgain = localStorage.getItem('dontShowModal');
//     if (!dontShowAgain) {
//       setShowModal(true); 
//     }
//   }, []);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleDontShowAgain = () => {
//     localStorage.setItem('dontShowModal', 'true'); 
//     setShowModal(false);
//   };

//   return (
//     <>
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white rounded-lg p-8 max-w-4xl w-full shadow-2xl">
//           <h2 className="text-2xl font-medium text-teal-600 mb-6">Hey {user.user.firstName}! Ready to conquer some code today?</h2>
//           <p className="text-gray-800 mb-6 text-lg leading-relaxed">
//             Welcome to IntelliCode! Here’s how you can get one step closer to acing your dream job:
//             <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
//               <li>All questions, unless specified otherwise, take <b>input in a single line.</b></li>
//               <li>Input will always be in a single line, so code your <code>int main</code> to handle it accordingly.</li>
//               <li>The "Run" button will execute code for the test case you are currently working on.</li>
//               <li><b>This is an AI-powered code editor. Use AI at your own risk.</b></li>
//               <li>We advise against using AI to write the entire code, as it can lead to incorrect results.</li>
//               <li><b>Be cautious with the semicolon (";")</b>, as it triggers AI suggestions.</li>
//               <li>We recommend switching off AI suggestions, coding manually, and then switching AI back on before adding the semicolon.</li>
//             </ul>
//           </p>
//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
//               onClick={handleCloseModal}
//             >
//               Close
//             </button>
//             <button
//               className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
//               onClick={handleDontShowAgain}
//             >
//               Don&apos;t Show Again
//             </button>
//           </div>
//         </div>
//       </div>
      
//       )}
//     </>
//   );
// };

// export default HowTouseModal;
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const HowTouseModal = () => {
  const [showModal, setShowModal] = useState(true);
  const user = useUser();

  useEffect(() => {
    const dontShowAgain = localStorage.getItem('dontShowModal');
    if (dontShowAgain) {
      setShowModal(false);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('dontShowModal', 'true');
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md sm:max-w-4xl w-full shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-medium text-teal-600 mb-4 sm:mb-6">
              Hey {user.user.firstName}! Ready to conquer some code today?
            </h2>
            <p className="text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
              Welcome to IntelliCode! Here’s how you can get one step closer to acing your dream job:
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
                <li>All questions, unless specified otherwise, take <b>input in a single line.</b></li>
                <li>Input will always be in a single line, so code your <code>int main</code> to handle it accordingly.</li>
                <li>The "Run" button will execute code for the test case you are currently working on.</li>
                <li><b>This is an AI-powered code editor. Use AI at your own risk.</b></li>
                <li>We advise against using AI to write the entire code, as it can lead to incorrect results.</li>
                <li><b>Be cautious with the semicolon (";")</b>, as it triggers AI suggestions.</li>
                <li>We recommend switching off AI suggestions, coding manually, and then switching AI back on before adding the semicolon.</li>
              </ul>
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-teal-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors"
                onClick={handleDontShowAgain}
              >
                Don&apos;t Show Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HowTouseModal;
