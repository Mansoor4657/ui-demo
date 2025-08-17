import React, { useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Chip,
} from '@mui/material';
import FleetDashboard from './FleetDashboard';
import AnalyzeStep from './AnalyzeStep';
import RFQStep from './RFQStep';
import ApprovalsStep from './ApprovalsStep';
import OrdersStep from './OrdersStep';
 
const FMSOApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTrucks, setSelectedTrucks] = useState([]);
 
  // Define the steps
  const steps = [
    'Fleet Dashboard',
    'Step 1: Analyze',
    'Step 2: RFQ Composer & Tracker',
    'Step 3: Recommendations & Approvals',
    'Step 4: Orders, Logistics & Scheduling'
  ];
 
  // Steps for the stepper (excluding dashboard)
  const stepperSteps = steps.slice(1); // Remove dashboard from stepper
 
  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);
 
  // Step navigation handlers
  const handleAnalyze = (trucks) => {
    setSelectedTrucks(trucks);
    setCurrentStep(1);
  };
 
  const handleSendRFQs = () => {
    setCurrentStep(2);
  };
 
  const handleApprove = () => {
    setCurrentStep(3);
  };
 
  const handleCreatePOs = () => {
    setCurrentStep(4);
  };
 
  const handleComplete = () => {
    // Reset to dashboard
    setCurrentStep(0);
    setSelectedTrucks([]);
  };
 
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
 
  // Get step status
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };
 
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <FleetDashboard onAnalyze={handleAnalyze} />;
      case 1:
        return (
          <AnalyzeStep
            selectedTrucks={selectedTrucks}
            onSendRFQs={handleSendRFQs}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <RFQStep
            onApprove={handleApprove}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ApprovalsStep
            onCreatePOs={handleCreatePOs}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <OrdersStep
            onComplete={handleComplete}
            onBack={handleBack}
          />
        );
      default:
        return <FleetDashboard onAnalyze={handleAnalyze} />;
    }
  };
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Progress Stepper */}
      {currentStep > 0 && (
        <Paper sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2 }}>
              Process Progress
            </Typography>
            <Chip
              label={`Step ${currentStep} of ${stepperSteps.length}`}
              color="primary"
              size="small"
            />
          </Box>
          <Stepper activeStep={currentStep - 1} alternativeLabel>
            {stepperSteps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontSize: '0.9rem',
                      fontWeight: getStepStatus(index + 1) === 'active' ? 'bold' : 'normal'
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
         
          {/* Selected trucks info */}
          {selectedTrucks.length > 0 && currentStep > 0 && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
                Selected Trucks:
              </Typography>
              {selectedTrucks.map((truck) => (
                <Chip
                  key={truck}
                  label={truck}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>
          )}
        </Paper>
      )}
 
      {/* Current Step Content */}
      {renderStepContent()}
    </Box>
  );
};
 
export default FMSOApp;