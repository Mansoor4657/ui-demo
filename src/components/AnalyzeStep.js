import React from 'react';
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
  Divider,
} from '@mui/material';
 
const AnalyzeStep = ({ selectedTrucks, onSendRFQs, onBack }) => {
  // All truck issues data (complete dataset)
  const allTruckIssues = [
    {
      truck: 'TK-203',
      faults: 'EH-OP-221: Oil pressure low',
      severity: 'High',
      rul: 14,
      downtime: 3,
      deadline: '17-Aug 14:00',
      confidence: 0.86
    },
    {
      truck: 'TK-117',
      faults: 'HY-LK-105: Manifold leak',
      severity: 'Critical',
      rul: 8,
      downtime: 6,
      deadline: '17-Aug 06:00',
      confidence: 0.91
    },
    {
      truck: 'TK-342',
      faults: 'DRV-TEMP-330: Wheel motor temp high',
      severity: 'High',
      rul: 20,
      downtime: 5,
      deadline: '18-Aug 10:00',
      confidence: 0.78
    },
    {
      truck: 'TK-289',
      faults: 'BRK-ACC-412: Low accumulator pressure',
      severity: 'Medium',
      rul: 40,
      downtime: 4,
      deadline: '19-Aug 08:00',
      confidence: 0.83
    },
    {
      truck: 'TK-156',
      faults: 'ELE-ALT-208: Alternator charging low',
      severity: 'Medium',
      rul: 50,
      downtime: 2,
      deadline: '19-Aug 16:00',
      confidence: 0.88
    }
  ];
 
  // Filter issues based on selected trucks
  const selectedIssues = allTruckIssues.filter(issue =>
    selectedTrucks.includes(issue.truck)
  );
 
  // All parts recommendations data
  const allPartsRecommendations = [
    {
      truck: 'TK-203',
      parts: [
        'HP360-ENG-OPS-009 (Oil Pressure Sensor), Qty 1, Supersession: OPS-009B, Alternates: OPS-009X',
        'HP360-ENG-OFK-014 (Engine Oil Filter Kit), Qty 1, Alternates: AM-OFK-014A',
        'GSK-ENG-SEAL-KIT (Engine Gasket Kit), Qty 1'
      ],
      consumables: 'ENG-OIL-15W40-200L (15W-40 CJ-4), 180 L required'
    },
    {
      truck: 'TK-117',
      parts: [
        'HY-HOS-1P5-6000 (Hyd Hose 1.5" 6,000 psi, 2.5 m), Qty 2, Alt: HY-HOS-1P5-6000-ALT',
        'HY-SEAL-MAN-KIT (Manifold Seal Kit), Qty 1',
        'OR-PK-NBR-90 (O-Ring Pack, NBR-90), Qty 1'
      ],
      consumables: 'HYD-OIL-ISO68-200L, 300 L required; SPILL-KIT-HEAVY Qty 1'
    },
    {
      truck: 'TK-342',
      parts: [
        'DRV-TMP-SNS-450 (Drive Temp Sensor), Qty 1',
        'DRV-FAN-MOD-450 (Cooling Fan Module), Qty 1'
      ],
      consumables: 'COOLANT-50-20L (50/50 Premix), 120 L required'
    },
    {
      truck: 'TK-289',
      parts: [
        'BRK-ACC-10L-330B (Brake Accumulator 10 L 330 bar), Qty 1',
        'BRK-SEAL-KIT-289 (Brake Seal Kit), Qty 1'
      ],
      consumables: 'BRK-FLUID-DOT4-5L, 8 L required'
    },
    {
      truck: 'TK-156',
      parts: [
        'ELE-ALT-208-24V (Alternator 24V 120A), Qty 1, Core return required',
        'ELE-BELT-FAN-156 (Fan Belt), Qty 1'
      ],
      consumables: 'ELE-CONTACT-SPRAY, 2 cans required'
    }
  ];
 
  // Filter parts recommendations based on selected trucks
  const partsRecommendations = allPartsRecommendations.filter(rec =>
    selectedTrucks.includes(rec.truck)
  );
 
  // Inventory availability data
  const inventoryAvailability = [
    {
      partNo: 'HP360-ENG-OFK-014',
      desc: 'Oil Filter Kit',
      siteOnHand: 6,
      reserved: 4,
      atp: 2,
      nearestDepot: 'Depot-East (38)',
      transferETA: '6 h',
      substitutes: 'AM-OFK-014A'
    },
    {
      partNo: 'HY-HOS-1P5-6000',
      desc: 'Hyd Hose 2.5 m',
      siteOnHand: 1,
      reserved: 0,
      atp: 1,
      nearestDepot: 'Depot-East (38)',
      transferETA: '6 h',
      substitutes: 'HY-HOS-1P5-6000-ALT'
    },
    {
      partNo: 'HY-SEAL-MAN-KIT',
      desc: 'Seal Kit',
      siteOnHand: 0,
      reserved: 0,
      atp: 0,
      nearestDepot: 'Depot-Central (142)',
      transferETA: '18 h',
      substitutes: '—'
    },
    {
      partNo: 'DRV-FAN-MOD-450',
      desc: 'Fan Module',
      siteOnHand: 0,
      reserved: 0,
      atp: 0,
      nearestDepot: 'Depot-West (210)',
      transferETA: '24 h',
      substitutes: '—'
    },
    {
      partNo: 'ENG-OIL-15W40-200L',
      desc: 'Engine Oil Drum',
      siteOnHand: 2,
      reserved: 1,
      atp: 1,
      nearestDepot: '—',
      transferETA: '—',
      substitutes: '—'
    }
  ];
 
  // Buy-plan aggregation data
  const buyPlanBundles = [
    {
      bundle: 'Oil & Filters',
      items: 'HP360-ENG-OFK-014 + ENG-OIL-15W40-200L',
      batchQty: '3 kits + 2 drums',
      split: 'Allowed',
      batchBenefit: '-5% unit price',
      leadTimeImpact: 'None'
    },
    {
      bundle: 'Hydraulics',
      items: 'HY-HOS-1P5-6000 + HY-SEAL-MAN-KIT + HYD-OIL-ISO68-200L',
      batchQty: '2 hoses + 1 kit + 2 drums',
      split: 'Hose split OK',
      batchBenefit: '-7% freight',
      leadTimeImpact: '+0.5 day if consolidated'
    },
    {
      bundle: 'Cooling',
      items: 'DRV-FAN-MOD-450 + COOLANT-50-20L',
      batchQty: '1 + 6',
      split: 'No',
      batchBenefit: '—',
      leadTimeImpact: 'None'
    }
  ];
 
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#d32f2f';
      case 'High': return '#ff9800';
      case 'Medium': return '#2196f3';
      default: return '#757575';
    }
  };
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Step 1: Analyze
      </Typography>
 
      {/* Context chips */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip label={`Selected trucks: ${selectedTrucks.join(', ')}`} color="primary" />
        <Chip label="Severity mix: High/Critical" color="warning" />
        <Chip label="Next feasible windows: 18 Aug 02:00–06:00, 19 Aug 14:00–18:00" color="info" />
      </Box>
 
      {/* Issue intake & triage */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Issue intake & triage (read-only)
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Truck</TableCell>
                <TableCell>Faults</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>RUL (h)</TableCell>
                <TableCell>Req. Downtime (h)</TableCell>
                <TableCell>Deadline (UTC)</TableCell>
                <TableCell>Confidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedIssues.map((issue, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{issue.truck}</TableCell>
                  <TableCell>{issue.faults}</TableCell>
                  <TableCell>
                    <Chip
                      label={issue.severity}
                      size="small"
                      sx={{
                        backgroundColor: getSeverityColor(issue.severity),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  <TableCell>{issue.rul}</TableCell>
                  <TableCell>{issue.downtime}</TableCell>
                  <TableCell>{issue.deadline}</TableCell>
                  <TableCell>{issue.confidence}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Parts & consumables recommendations */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Parts & consumables recommendations (per truck)
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          {partsRecommendations.map((rec, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f', mb: 1 }}>
                {rec.truck}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                BOM (Bill of Materials) lines:
              </Typography>
              {rec.parts.map((part, partIndex) => (
                <Typography key={partIndex} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                  • {part}
                </Typography>
              ))}
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1, mb: 0.5 }}>
                Consumables:
              </Typography>
              <Typography variant="body2" sx={{ ml: 2 }}>
                {rec.consumables}
              </Typography>
              {index < partsRecommendations.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Box>
      </Paper>
 
      {/* Inventory availability */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Inventory availability (site + depots)
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Part No</TableCell>
                <TableCell>Desc</TableCell>
                <TableCell>Site On-hand</TableCell>
                <TableCell>Reserved</TableCell>
                <TableCell>ATP</TableCell>
                <TableCell>Nearest Depot (km)</TableCell>
                <TableCell>Transfer ETA</TableCell>
                <TableCell>Substitutes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryAvailability.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.partNo}</TableCell>
                  <TableCell>{item.desc}</TableCell>
                  <TableCell>{item.siteOnHand}</TableCell>
                  <TableCell>{item.reserved}</TableCell>
                  <TableCell sx={{
                    color: item.atp === 0 ? '#d32f2f' : 'inherit',
                    fontWeight: item.atp === 0 ? 'bold' : 'normal'
                  }}>
                    {item.atp}
                  </TableCell>
                  <TableCell>{item.nearestDepot}</TableCell>
                  <TableCell>{item.transferETA}</TableCell>
                  <TableCell>{item.substitutes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Buy-plan aggregation */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Buy-plan aggregation
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Bundle</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Batch Qty</TableCell>
                <TableCell>Split?</TableCell>
                <TableCell>Batch Benefit</TableCell>
                <TableCell>Lead-time Impact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buyPlanBundles.map((bundle, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>{bundle.bundle}</TableCell>
                  <TableCell>{bundle.items}</TableCell>
                  <TableCell>{bundle.batchQty}</TableCell>
                  <TableCell>{bundle.split}</TableCell>
                  <TableCell sx={{ color: bundle.batchBenefit !== '—' ? '#4caf50' : 'inherit' }}>
                    {bundle.batchBenefit}
                  </TableCell>
                  <TableCell>{bundle.leadTimeImpact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
 
      {/* Risk & cost preview */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Risk & cost preview
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Downtime cost basis:</strong> ₹14,00,000 / hour (crusher-linked).
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#d32f2f', fontWeight: 'bold' }}>
            <strong>Est. downtime if deferred to 19 Aug window:</strong> TK-117 +6 h, TK-203 +3 h, TK-342 +5 h → ₹19.6 Cr risk if slips beyond windows.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Warranty:</strong> Oil pressure sensor and fan module require OEM (Original Equipment Manufacturer); hose can be OES (Original Equipment Supplier).
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Single-source risk:</strong> Fan module (only 2 approved suppliers in region).
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Silent pre-flight (auto):</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2, mb: 1, color: '#4caf50' }}>
            ✓ Pass: Sanctions/geo - Vendor certifications ok (except SteelVale Spares expiring 30-Aug-2025)
          </Typography>
          <Typography variant="body2" sx={{ ml: 2, color: '#ff9800' }}>
            ⚠ Flag: Budget cap may trigger dual approval if fan module &gt; ₹5,50,000
          </Typography>
        </Box>
      </Paper>
 
      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onBack}>
          Back to Dashboard
        </Button>
        <Button variant="outlined" color="secondary">
          Save Draft
        </Button>
        <Button variant="outlined" color="info">
          Export PDF/CSV
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSendRFQs}
          sx={{ fontWeight: 'bold' }}
        >
          Send RFQs
        </Button>
      </Box>
    </Box>
  );
};
 
export default AnalyzeStep;