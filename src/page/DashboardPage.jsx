import React, { useState } from 'react';
import Headers from '../component/Headers'; // Adjust import based on your file structure
import { RegisterDashboard } from './RegisterDashboard'; // Import the RegisterDashboard component
import { PredictionData } from './PredictionDashboard'; // Import the PredictionData component
import { Footer } from '../component/Footer'; // Import the Footer component

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {/* Header */}
      <Headers isAdmin={true} /> {/* Pass isAdmin to Headers */}

      {/* Main Content */}
      <div className="flex flex-col h-screen mt-[4.5rem] bg-gray-100">
        <header className="bg-white shadow-md flex items-center justify-center px-4 py-2">
          {/* Navigation Buttons */}
          <nav className="flex gap-6">
            <button
              onClick={() => handleButtonClick('register')}
              className="bg-blue-500 text-white py-3 px-6 text-xl rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Register Data
            </button>
            <button
              onClick={() => handleButtonClick('prediction')}
              className="bg-blue-500 text-white py-3 px-6 text-xl rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Prediction Data
            </button>
          </nav>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {/* Render Data Based on Active Section */}
          {activeSection === 'register' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <RegisterDashboard />
            </div>
          )}
          {activeSection === 'prediction' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <PredictionData /> {/* Render PredictionData component */}
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer /> {/* Add the Footer component here */}
      </div>
    </>
  );
};

export default DashboardPage; // Ensure default export
