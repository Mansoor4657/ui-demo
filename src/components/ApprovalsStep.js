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
  Card,
  CardContent,
  Slider,
  FormControl,
  FormLabel,
} from '@mui/material';
 
const ApprovalsStep = ({ onCreatePOs, onBack }) => {
  const [weights, setWeights] = useState({
    price: 30,
    leadTime: 35,
    downtimeCost: 25,
    warranty: 5,
    risk: 5
  });
 
  // Recommendation scenarios
  const recommendations = [
    {
      type: 'Fastest',
      vendors: 'Bharat (filters + hoses), QuarryParts (fan, oil)',
      totalLanded: '₹8,41,300',
      earliestETA: '18-Aug (all lines)',
      downtimeAvoided: '-14 h vs next slot',
      risk: 'Low',
      warranty: '12 mo',
      scheduleFit: 'Yes → 18-Aug 02:00–06:00',
      color: '#2196f3',
      recommended: false
    },
    {
      type: 'Cheapest',
      vendors: 'EastPort (filters, seal kit, fan), Outback (hoses), QuarryParts (oil)',
      totalLanded: '₹7,96,900',
      earliestETA: '20-Aug (hoses) / 21-Aug (fan)',
      downtimeAvoided: '-0 h (misses early slot)',
      risk: 'Medium (schedule slip)',
      warranty: '6-12 mo',
      scheduleFit: 'No',
      color: '#4caf50',
      recommended: false
    },
    {
      type: 'Balanced',
      vendors: 'Bharat (filters + hoses), EastPort (seal kit), QuarryParts (oil), QuarryParts (fan)',
      totalLanded: '₹8,19,800',
      earliestETA: '18–19 Aug',
      downtimeAvoided: '-10 h',
      risk: 'Low-Medium',
      warranty: '12 mo',
      scheduleFit: 'Yes → 19-Aug 14:00–18:00',
      color: '#ff9800',
      recommended: true
    }
  ];
 
  // Detailed offer matrix
  const offerMatrix = [
    {
      partLine: 'HP360-ENG-OFK-014',
      qty: 2,
      selectedVendor: 'Bharat',
      price: '₹28,500 ea',
      leadTime: 1,
      altVendors: 'EastPort (₹26,900, 3d)',
      warranty: 12,
      local: 'Y',
      notes: 'Early delivery preserves window'
    },
    {
      partLine: 'ENG-OIL-15W40-200L',
      qty: 2,
      selectedVendor: 'QuarryParts',
      price: '₹24,000 ea',
      leadTime: 2,
      altVendors: '—',
      warranty: 6,
      local: 'N',
      notes: '—'
    },
    {
      partLine: 'HY-HOS-1P5-6000',
      qty: 2,
      selectedVendor: 'Bharat',
      price: '₹62,000 ea',
      leadTime: 2,
      altVendors: 'Outback (₹58,000, 4d)',
      warranty: 12,
      local: 'Y',
      notes: 'JIC 37° confirmed'
    },
    {
      partLine: 'HY-SEAL-MAN-KIT',
      qty: 1,
      selectedVendor: 'EastPort',
      price: '₹46,000',
      leadTime: 3,
      altVendors: '—',
      warranty: 12,
      local: 'N',
      notes: '—'
    },
    {
      partLine: 'DRV-FAN-MOD-450',
      qty: 1,
      selectedVendor: 'QuarryParts',
      price: '₹5,60,000',
      leadTime: 2,
      altVendors: 'EastPort (₹5,15,000, 5d)',
      warranty: 12,
      local: 'N',
      notes: 'Cap hit if > ₹5.5L'
    }
  ];
 
  // Schedule fit & work orders
  const workOrders = [
    {
      workOrder: 'WO-CM-11284',
      truck: 'TK-117',
      window: '18-Aug 02:00–08:00',
      bay: 'Bay-2',
      tech: 'A. Rao',
      duration: '6 h',
      fit: true
    },
    {
      workOrder: 'WO-CM-11285',
      truck: 'TK-203',
      window: '18-Aug 02:00–05:00',
      bay: 'Bay-1',
      tech: 'S. Khan',
      duration: '3 h',
      fit: true
    },
    {
      workOrder: 'WO-CM-11292',
      truck: 'TK-342',
      window: '19-Aug 14:00–19:00',
      bay: 'Bay-3',
      tech: 'P. Nair',
      duration: '5 h',
      fit: true
    }
  ];
 
  const handleWeightChange = (weight, value) => {
    setWeights(prev => ({
      ...prev,
      [weight]: value
    }));
  };
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Step 3: Recommendations & Approvals
      </Typography>
 
      {/* Decision context */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Decision context
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Trucks:</strong> TK-203, TK-117, TK-342 - <strong>Budget code:</strong> MNT-FLT-2025-08 (Balance ₹3.2 Cr) - <strong>Policy:</strong> Green (one spend-cap check on fan module)
        </Typography>
      </Paper>
 
      {/* Scenario weights */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Scenario weights (sliders)
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(weights).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={2.4} key={key}>
              <FormControl fullWidth>
                <FormLabel sx={{ mb: 1, textTransform: 'capitalize', fontWeight: 'bold' }}>
                  {key.replace(/([A-Z])/g, ' $1')} ({value})
                </FormLabel>
                <Slider
                  value={value}
                  onChange={(_, newValue) => handleWeightChange(key, newValue)}
                  min={0}
                  max={50}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                />
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </Paper>
 
      {/* Top recommendations */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Top recommendations (cards)
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ p: 2 }}>
          {recommendations.map((rec, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  border: rec.recommended ? `3px solid ${rec.color}` : '1px solid #e0e0e0',
                  position: 'relative'
                }}
              >
                {rec.recommended && (
                  <Chip
                    label="Recommended"
                    color="warning"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      fontWeight: 'bold'
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: rec.color, mb: 2 }}>
                    {rec.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Vendors:</strong> {rec.vendors}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f', mb: 1 }}>
                    {rec.totalLanded}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Earliest ETA:</strong> {rec.earliestETA}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Downtime avoided:</strong> {rec.downtimeAvoided}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Risk:</strong> {rec.risk} - <strong>Warranty:</strong> {rec.warranty}
                  </Typography>
                  <Typography variant="body2" sx={{ color: rec.scheduleFit.includes('Yes') ? '#4caf50' : '#d32f2f' }}>
                    <strong>Schedule fit:</strong> {rec.scheduleFit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
 
      {/* Detailed offer matrix */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Detailed offer matrix (editable)
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Part Line</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Selected Vendor</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Lead-time</TableCell>
                <TableCell>Alt Vendors</TableCell>
                <TableCell>Warranty</TableCell>
                <TableCell>Local (Y/N)</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offerMatrix.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.partLine}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {item.selectedVendor}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.price}</TableCell>
                  <TableCell>{item.leadTime}</TableCell>
                  <TableCell>{item.altVendors}</TableCell>
                  <TableCell>{item.warranty}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.local}
                      size="small"
                      color={item.local === 'Y' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem' }}>{item.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Schedule fit & work orders */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Schedule fit & work orders (preview)
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Work Order</TableCell>
                <TableCell>Truck</TableCell>
                <TableCell>Window</TableCell>
                <TableCell>Bay</TableCell>
                <TableCell>Tech</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Fit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workOrders.map((wo, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{wo.workOrder}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {wo.truck}
                  </TableCell>
                  <TableCell>{wo.window}</TableCell>
                  <TableCell>{wo.bay}</TableCell>
                  <TableCell>{wo.tech}</TableCell>
                  <TableCell>{wo.duration}</TableCell>
                  <TableCell>
                    <Chip
                      label={wo.fit ? '✅' : '❌'}
                      size="small"
                      color={wo.fit ? 'success' : 'error'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Policy & risk gate */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Policy & risk gate
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 2, color: '#ff9800', fontWeight: 'bold' }}>
            <strong>Spend-cap check:</strong> Fan module at ₹5,60,000 exceeds ₹5,50,000 → Finance co-approval required
          </Typography>
          <Typography variant="body2" sx={{ color: '#4caf50' }}>
            <strong>Warranty & geo:</strong> OK
          </Typography>
        </Box>
      </Paper>
 
      {/* Financials & budget */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Financials & budget
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Pre-spend balance:</strong> ₹3,20,00,000 - <strong>Order value (Balanced):</strong> ₹8,19,800 - <strong>Post-spend:</strong> ₹3,11,80,200
          </Typography>
          <Typography variant="body2" sx={{ color: '#4caf50' }}>
            <strong>Early-pay discount:</strong> 1.5% from QuarryParts if paid in 10 days → ₹8,400 potential saving
          </Typography>
        </Box>
      </Paper>
 
      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="outlined" color="secondary">
          Save pending
        </Button>
        <Button variant="outlined" color="info">
          Re-weight scenarios
        </Button>
        <Button variant="outlined" color="warning">
          Send for dual approval
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreatePOs}
          sx={{ fontWeight: 'bold' }}
        >
          Approve & Create POs
        </Button>
      </Box>
    </Box>
  );
};
 
export default ApprovalsStep;