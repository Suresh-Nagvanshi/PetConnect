import React from 'react';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    
    <div className="w-full max-w-lg">
      
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
            {/* The Line*/}
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

     
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <p
            key={index}
            
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

