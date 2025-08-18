import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  Camera as CameraIcon,
  Assignment as AssignmentIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
 
const OrdersStep = ({ onBack, onComplete }) => {
  const [techCoPilotOpen, setTechCoPilotOpen] = useState(false);
 
  // Work order data for Tech Co-Pilot
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
 
  const handleTechCoPilotOpen = () => {
    setTechCoPilotOpen(true);
  };
 
  const handleTechCoPilotClose = () => {
    setTechCoPilotOpen(false);
  };
  // POs & invoices data
  const purchaseOrders = [
    {
      po: 'PO-000341',
      vendor: 'Bharat Mining Supply',
      amount: '₹1,81,000',
      status: 'Open',
      invoiceMatch: '—',
      notes: 'Filters + Hoses'
    },
    {
      po: 'PO-000342',
      vendor: 'EastPort Spares',
      amount: '₹48,000',
      status: 'Open',
      invoiceMatch: '—',
      notes: 'Seal Kit'
    },
    {
      po: 'PO-000343',
      vendor: 'QuarryParts Co.',
      amount: '₹5,90,800',
      status: 'Open',
      invoiceMatch: '—',
      notes: 'Oil + Fan (freight incl.)'
    }
  ];
 
  // Shipments data
  const shipments = [
    {
      po: 'PO-000341',
      carrier: 'RoadRunner',
      tracking: 'RR-987231',
      milestone: 'Dispatched',
      eta: '18-Aug 00:30',
      delayRisk: 'Low',
      progress: 85
    },
    {
      po: 'PO-000342',
      carrier: 'BlueDart',
      tracking: 'BD-552901',
      milestone: 'Label created',
      eta: '19-Aug 09:00',
      delayRisk: 'Low',
      progress: 20
    },
    {
      po: 'PO-000343',
      carrier: 'SwiftFreight',
      tracking: 'SF-771020',
      milestone: 'In hub',
      eta: '18-Aug 03:30',
      delayRisk: 'Amber (+2h possible)',
      progress: 65
    }
  ];
 
  // Maintenance schedule data
  const maintenanceSchedule = [
    {
      workOrder: 'WO-CM-11284',
      status: 'Planned',
      tech: 'A. Rao',
      partsStaged: '100%',
      permits: 'Requested',
      preChecks: 'Spill kit ready'
    },
    {
      workOrder: 'WO-CM-11285',
      status: 'Planned',
      tech: 'S. Khan',
      partsStaged: '100%',
      permits: 'Approved',
      preChecks: 'Oil drums at Bay-1'
    },
    {
      workOrder: 'WO-CM-11292',
      status: 'Planned',
      tech: 'P. Nair',
      partsStaged: '60%',
      permits: 'Requested',
      preChecks: 'Coolant queued'
    }
  ];
 
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'primary';
      case 'dispatched': return 'success';
      case 'in hub': return 'warning';
      case 'planned': return 'info';
      case 'approved': return 'success';
      case 'requested': return 'warning';
      default: return 'default';
    }
  };
 
  const getRiskColor = (risk) => {
    if (risk.includes('Low')) return '#4caf50';
    if (risk.includes('Amber')) return '#ff9800';
    if (risk.includes('High') || risk.includes('Red')) return '#d32f2f';
    return '#757575';
  };
 
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
  };
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Step 4: Orders, Logistics & Scheduling (post-approval)
      </Typography>
 
      {/* POs & invoices */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            POs & invoices
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>PO</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Invoice Match</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseOrders.map((po, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {po.po}
                  </TableCell>
                  <TableCell>{po.vendor}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{po.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={po.status}
                      size="small"
                      color={getStatusColor(po.status)}
                    />
                  </TableCell>
                  <TableCell>{po.invoiceMatch}</TableCell>
                  <TableCell>{po.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Shipments */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Shipments
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>PO</TableCell>
                <TableCell>Carrier</TableCell>
                <TableCell>Tracking</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>ETA</TableCell>
                <TableCell>Delay Risk</TableCell>
                <TableCell>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((shipment, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {shipment.po}
                  </TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{shipment.tracking}</TableCell>
                  <TableCell>
                    <Chip
                      label={shipment.milestone}
                      size="small"
                      color={getStatusColor(shipment.milestone)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{shipment.eta}</TableCell>
                  <TableCell sx={{ color: getRiskColor(shipment.delayRisk), fontWeight: 'bold' }}>
                    {shipment.delayRisk}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={shipment.progress}
                        color={getProgressColor(shipment.progress)}
                        sx={{ width: 80, height: 8 }}
                      />
                      <Typography variant="body2">{shipment.progress}%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Maintenance schedule */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Maintenance schedule (live)
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Work Order</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tech</TableCell>
                <TableCell>Parts Staged</TableCell>
                <TableCell>Permits (LOTO)</TableCell>
                <TableCell>Pre-checks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {maintenanceSchedule.map((schedule, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {schedule.workOrder}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={schedule.status}
                      size="small"
                      color={getStatusColor(schedule.status)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{schedule.tech}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{
                        color: schedule.partsStaged === '100%' ? '#4caf50' : '#ff9800',
                        fontWeight: 'bold'
                      }}>
                        {schedule.partsStaged}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={schedule.permits}
                      size="small"
                      color={getStatusColor(schedule.permits)}
                    />
                  </TableCell>
                  <TableCell>{schedule.preChecks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
              3
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              POs Created
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total value: ₹8,19,800
            </Typography>
          </Paper>
        </Grid>
       
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800', mb: 1 }}>
              18-Aug
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Target Delivery
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Critical parts arriving
            </Typography>
          </Paper>
        </Grid>
       
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3', mb: 1 }}>
              3
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Work Orders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Scheduled for execution
            </Typography>
          </Paper>
        </Grid>
      </Grid>
 
      {/* Process completion message */}
      <Paper sx={{ mb: 4, p: 3, backgroundColor: '#e8f5e8', border: '2px solid #4caf50' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}>
          ✅ Process Complete
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          All purchase orders have been created and shipments are being tracked. Maintenance work orders are scheduled and parts staging is in progress.
        </Typography>
        <Typography variant="body2" sx={{ color: '#2e7d32' }}>
          <strong>Next steps:</strong> Monitor shipment progress and execute maintenance as per schedule. The system will skip to final execution phase.
        </Typography>
      </Paper>
 
      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="outlined" color="secondary">
          Reschedule
        </Button>
        <Button variant="outlined" color="warning">
          Raise issue
        </Button>
        <Button variant="outlined" color="info" onClick={handleTechCoPilotOpen}>
          Open Tech Co-Pilot
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
 
      {/* Tech Co-Pilot Dialog */}
      <Dialog
        open={techCoPilotOpen}
        onClose={handleTechCoPilotClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Technician Co-Pilot (Execution)
          </Typography>
          <Button onClick={handleTechCoPilotClose} size="small">
            <CloseIcon />
          </Button>
        </DialogTitle>
       
        <DialogContent>
          {/* Work Orders */}
          {workOrders.map((workOrder, index) => (
            <Paper key={index} sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
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
          <Paper sx={{ p: 3, backgroundColor: '#e8f5e8', border: '1px solid #4caf50' }}>
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
        </DialogContent>
 
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleTechCoPilotClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
 
export default OrdersStep;