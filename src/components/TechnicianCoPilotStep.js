import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  Camera as CameraIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
 
const TechnicianCoPilotStep = ({ onComplete, onBack }) => {
  // Work order data for each truck
  const workOrders = [
    {
      truck: 'TK-203',
      workOrder: 'WO-CM-11285',
      title: 'Oil pressure remediation',
      steps: [
        {
          id: 1,
          description: 'Safety: Isolate battery; LOTO applied; confirm zero oil pressure.',
          completed: true,
          icon: <SecurityIcon />
        },
        {
          id: 2,
          description: 'Remove filter canisters; capture photos before/after.',
          completed: true,
          icon: <CameraIcon />
        },
        {
          id: 3,
          description: 'Replace sensor HP360-ENG-OPS-009 (Torque 35 N·m).',
          completed: true,
          icon: <BuildIcon />
        },
        {
          id: 4,
          description: 'Fit new filter kit HP360-ENG-OFK-014 (Torque 22 N·m per cap).',
          completed: true,
          icon: <BuildIcon />
        },
        {
          id: 5,
          description: 'Refill 15W-40 180 L; record Batch# OIL-BCH-A16-203.',
          completed: true,
          icon: <AssignmentIcon />
        },
        {
          id: 6,
          description: 'Start & warm idle 10 min; log oil pressure 420 kPa.',
          completed: true,
          icon: <CheckCircleIcon />
        },
        {
          id: 7,
          description: 'Close: Capture part serials, upload photos, sign off.',
          completed: true,
          icon: <CameraIcon />
        }
      ]
    },
    {
      truck: 'TK-117',
      workOrder: 'WO-CM-11284',
      title: 'Hydraulics leak',
      steps: [
        {
          id: 1,
          description: 'Replace 2× hoses (Torque 80 N·m each end, JIC 37°)',
          completed: true,
          icon: <BuildIcon />
        },
        {
          id: 2,
          description: 'Install HY-SEAL-MAN-KIT',
          completed: true,
          icon: <BuildIcon />
        },
        {
          id: 3,
          description: 'Refill ISO-68 300 L',
          completed: true,
          icon: <AssignmentIcon />
        },
        {
          id: 4,
          description: 'Pressure test 5 min @ 3000 psi',
          completed: true,
          icon: <CheckCircleIcon />
        }
      ]
    },
    {
      truck: 'TK-342',
      workOrder: 'WO-CM-11292',
      title: 'Drive cooling',
      steps: [
        {
          id: 1,
          description: 'Replace fan module (Torque 55 N·m)',
          completed: true,
          icon: <BuildIcon />
        },
        {
          id: 2,
          description: 'Bleed & refill coolant 120 L',
          completed: true,
          icon: <AssignmentIcon />
        },
        {
          id: 3,
          description: 'Log sensor reading 85°C under load',
          completed: true,
          icon: <CheckCircleIcon />
        }
      ]
    }
  ];
 
  const getStepIcon = (step) => {
    return step.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />;
  };
 
  const getStepColor = (step) => {
    return step.completed ? '#4caf50' : '#757575';
  };
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Step 5: Technician Co-Pilot (execution)
      </Typography>
 
      {/* Work Orders */}
      {workOrders.map((workOrder, index) => (
        <Paper key={index} sx={{ mb: 4 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {workOrder.truck} ({workOrder.workOrder})
              </Typography>
              <Typography variant="h6" sx={{ color: '#d32f2f' }}>
                — {workOrder.title}
              </Typography>
              <Chip
                label="Completed"
                color="success"
                size="small"
                sx={{ ml: 'auto', fontWeight: 'bold' }}
              />
            </Box>
          </Box>
 
          <Box sx={{ p: 2 }}>
            {workOrder.truck === 'TK-203' ? (
              // Detailed stepper for TK-203
              <Stepper orientation="vertical">
                {workOrder.steps.map((step) => (
                  <Step key={step.id} active={true} completed={step.completed}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Box sx={{ color: getStepColor(step), mr: 1 }}>
                          {getStepIcon(step)}
                        </Box>
                      )}
                      sx={{
                        '& .MuiStepLabel-label': {
                          color: step.completed ? '#4caf50' : '#757575',
                          fontWeight: step.completed ? 'bold' : 'normal'
                        }
                      }}
                    >
                      {step.description}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            ) : (
              // Simplified list for other trucks
              <List dense>
                {workOrder.steps.map((step) => (
                  <ListItem key={step.id} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <Box sx={{ color: getStepColor(step) }}>
                        {getStepIcon(step)}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={step.description}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: step.completed ? '#4caf50' : '#757575',
                          fontWeight: step.completed ? 'bold' : 'normal'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Paper>
      ))}
 
      {/* Summary */}
      <Paper sx={{ mb: 4, p: 3, backgroundColor: '#e8f5e8' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2e7d32' }}>
          Execution Summary
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Work Orders Completed:
            </Typography>
            <Typography variant="body2">
              3 of 3 (100%)
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Total Execution Time:
            </Typography>
            <Typography variant="body2">
              8 hours 45 minutes
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Parts Used:
            </Typography>
            <Typography variant="body2">
              HP360-ENG-OPS-009, HP360-ENG-OFK-014, HY-SEAL-MAN-KIT, Fan Module
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Fluids Consumed:
            </Typography>
            <Typography variant="body2">
              180L Oil, 300L Hydraulic, 120L Coolant
            </Typography>
          </Box>
        </Box>
      </Paper>
 
      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onComplete}
          sx={{ fontWeight: 'bold' }}
        >
          Complete FMSO Process
        </Button>
      </Box>
    </Box>
  );
};
 
export default TechnicianCoPilotStep;