import React from 'react';

// The final, perfectly aligned ProgressBar component.
const ProgressBar = ({ steps, currentStep }) => {
  return (
    // This main container will hold our two rows.
    <div className="w-full max-w-lg">
      
      {/* --- ROW 1: The Visuals (Circles and Lines) --- */}
      {/* This flex container's only job is to align the circles and lines. */}
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* The Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${
                index === currentStep
                  ? 'bg-blue-600 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            {/* The Line (but not after the last circle) */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-1 transition-colors duration-300 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* --- ROW 2: The Text Labels --- */}
      {/* This container's only job is to space out the text labels. */}
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <p
            key={index}
            // We give each label a width that's a bit wider than the circle
            // to handle longer text, and center the text within that space.
            className={`w-20 text-center text-sm font-semibold transition-colors duration-300 ${
              index === currentStep ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            {step.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

