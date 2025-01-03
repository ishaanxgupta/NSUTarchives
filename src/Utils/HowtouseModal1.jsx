import React from 'react';

const HowTouseModal1 = ({ isModalOpen, closeModal }) => {
  if (!isModalOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full shadow-2xl">
          <h2 className="text-2xl font-medium text-teal-600 mb-6">You are Back! A long road ahead, but you're on the right track!</h2>
          <p className="text-gray-800 mb-6 text-lg leading-relaxed">
            Welcome to IntelliCode! Here's a few things to know before you start coding:
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
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
  );
};

export default HowTouseModal1;
