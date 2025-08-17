import React, { useState } from 'react';

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const Step1 = () => (
    <div className="step-container">
      <h2>Step 1</h2>
      <div className="step-content">
        <p>This is step 1 content. Content will be updated later.</p>
      </div>
      <div className="step-buttons">
        <button disabled>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="step-container">
      <h2>Step 2</h2>
      <div className="step-content">
        <p>This is step 2 content. Content will be updated later.</p>
      </div>
      <div className="step-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="step-container">
      <h2>Step 3</h2>
      <div className="step-content">
        <p>This is step 3 content. Content will be updated later.</p>
      </div>
      <div className="step-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={() => alert('Form completed!')}>Finish</button>
      </div>
    </div>
  );

  return (
    <div className="multi-step-form">
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
    </div>
  );
}

export default MultiStepForm;
