import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

function Fte_home() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
    <Header/>
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-gray-400 mt-4">
        This section is under construction. Stay tuned for updates!
      </p>

      {/* Under Construction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative w-[90%] max-w-md">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Under Construction</h2>
              <p className="text-gray-400">
                This page is still being built. We’ll be live soon!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-white shadow"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Fte_home;
