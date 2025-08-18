import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Button,
} from "@mui/material";
import {
  Schedule as ScheduleIcon,
  LocalShipping as TruckIcon,
  TrendingDown as TrendingDownIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
 
const FleetDashboard = ({ onAnalyze }) => {
  const [selectedTrucks, setSelectedTrucks] = useState([]);
 
  // Summary card component
  const SummaryCard = ({
    title,
    value,
    subtitle,
    icon,
    color = "#1976d2",
    bgColor = "#white",
  }) => (
    <Card
      sx={{
        height: "100%",
        backgroundColor: bgColor,
        borderRadius: "10px !important",
        borderLeft: "2px solid var(--Red, #da291c)",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ color, mr: 1, fontSize: "1.5rem" }}>{icon}</Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
 
  // Truck issues data
  const truckIssues = [
    {
      id: "TK-203",
      model: "HaulPro 360",
      category: "Engine → Oil pressure low",
      faultCodes: "EH-OP-221",
      severity: "High",
      rul: 14,
      downtime: 3,
      detected: "18-Aug 10:22",
      confidence: '86%',
      tags: "warranty",
    },
    {
      id: "TK-117",
      model: "HaulPro 360",
      category: "Hydraulics → Manifold leak",
      faultCodes: "HY-LK-105",
      severity: "Critical",
      rul: 8,
      downtime: 6,
      detected: "18-Aug 08:11",
      confidence: '91%',
      tags: "safety-critical",
    },
    {
      id: "TK-342",
      model: "HaulPro 450",
      category: "Drive → Wheel motor temp high",
      faultCodes: "DRV-TEMP-330",
      severity: "High",
      rul: 20,
      downtime: 5,
      detected: "17-Aug 23:47",
      confidence: '78%',
      tags: "—",
    },
    {
      id: "TK-289",
      model: "HaulPro 360",
      category: "Brakes → Low accumulator pressure",
      faultCodes: "BRK-ACC-412",
      severity: "Medium",
      rul: 40,
      downtime: 4,
      detected: "17-Aug 17:09",
      confidence: '83%',
      tags: "—",
    },
    {
      id: "TK-156",
      model: "HaulPro 320",
      category: "Electrical → Alternator charging low",
      faultCodes: "ELE-ALT-208",
      severity: "Medium",
      rul: 50,
      downtime: 2,
      detected: "17-Aug 14:35",
      confidence: '88%',
      tags: "—",
    },
  ];
 
  // Inventory alerts data
  const inventoryAlerts = [
    {
      partNo: "HP360-ENG-OFK-014",
      description: "Engine Oil Filter Kit",
      site: "Pit-A Store",
      onHand: 6,
      reserved: 4,
      atp: 2,
      reorderPt: 8,
      expiry: "—",
      substitutes: "Yes (AM-OFK-014A)",
    },
    {
      partNo: "HY-HOS-1P5-6000",
      description: 'Hyd Hose 1.5" 6,000 psi 2.5 m',
      site: "Pit-A Store",
      onHand: 1,
      reserved: 0,
      atp: 1,
      reorderPt: 3,
      expiry: "—",
      substitutes: "Yes (HY-HOS-1P5-6000-ALT)",
    },
    {
      partNo: "BRK-ACC-10L-330B",
      description: "Brake Accumulator 10 L 330 bar",
      site: "Central Depot",
      onHand: 0,
      reserved: 0,
      atp: 0,
      reorderPt: 2,
      expiry: "—",
      substitutes: "No",
    },
    {
      partNo: "ENG-OIL-15W40-200L",
      description: "15W-40 CJ-4 Engine Oil 200 L drum",
      site: "Pit-A Store",
      onHand: 2,
      reserved: 1,
      atp: 1,
      reorderPt: 3,
      expiry: "12-2026",
      substitutes: "Yes",
    },
  ];
 
  // Procurement watchlist data
  const procurementWatchlist = [
    {
      item: "PO-000327",
      vendor: "QuarryParts Co.",
      risk: "Amber",
      reason: "Carrier delay, ETA slipped by 1 day",
      action: "Offer expedite (₹18,000)",
    },
    {
      item: "RFQ-2025-0816-02",
      vendor: "Bharat Mining Supply",
      risk: "Green",
      reason: "Awaiting clarif. on hose spec",
      action: "Reply sent 16-Aug 16:00",
    },
  ];
 
  const handleTruckSelection = (truckId) => {
    setSelectedTrucks((prev) =>
      prev.includes(truckId)
        ? prev.filter((id) => id !== truckId)
        : [...prev, truckId]
    );
  };
 
  const handleAnalyze = () => {
    if (selectedTrucks.length > 0) {
      onAnalyze(selectedTrucks);
    }
  };
 
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "#d32f2f";
      case "High":
        return "#ff9800";
      case "Medium":
        return "#2196f3";
      default:
        return "#757575";
    }
  };
 
  const getRiskColor = (risk) => {
    switch (risk) {
      case "Amber":
        return "#ff9800";
      case "Green":
        return "#4caf50";
      case "Red":
        return "#d32f2f";
      default:
        return "#757575";
    }
  };
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Fleet Dashboard
      </Typography>
 
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Fleet Status"
            value="42"
            subtitle="Total - Down 5 - At-risk 7 (RUL < 24h)"
            icon={<TruckIcon />}
            color="#757575"
          />
        </Grid>
 
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Today's Impact"
            value="28h"
            subtitle="Est. downtime - Throughput delta -4,200 t"
            icon={<TrendingDownIcon />}
            color="#d32f2f"
          />
        </Grid>
 
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Procurement"
            value="4"
            subtitle="RFQs pending - Offers 9 - POs open 6"
            icon={<AssignmentIcon />}
            color="#ff9800"
          />
        </Grid>
 
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Production Windows"
            value="9"
            subtitle="Next 7 days: Mon(4), Tue(3), Thu(2)"
            icon={<ScheduleIcon />}
            color="#4caf50"
          />
        </Grid>
      </Grid>
 
      {/* Truck Issues Table */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Truck Issues (grouped by failure type)
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Select</TableCell>
                <TableCell>Truck ID</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Failure Category</TableCell>
                <TableCell>Fault Codes</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>RUL (h)</TableCell>
                <TableCell>Req. Downtime (h)</TableCell>
                <TableCell>First Detected</TableCell>
                <TableCell>Confidence</TableCell>
                <TableCell>Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {truckIssues.map((truck) => (
                <TableRow key={truck.id} hover>
                  <TableCell>
                    <Checkbox
                      checked={selectedTrucks.includes(truck.id)}
                      onChange={() => handleTruckSelection(truck.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{truck.id}</TableCell>
                  <TableCell>{truck.model}</TableCell>
                  <TableCell>{truck.category}</TableCell>
                  <TableCell>{truck.faultCodes}</TableCell>
                  <TableCell>
                    <Chip
                      label={truck.severity}
                      size="small"
                      sx={{
                        backgroundColor: getSeverityColor(truck.severity),
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </TableCell>
                  <TableCell>{truck.rul}</TableCell>
                  <TableCell>{truck.downtime}</TableCell>
                  <TableCell>{truck.detected}</TableCell>
                  <TableCell>{truck.confidence}</TableCell>
                  <TableCell>
                    {truck.tags !== "—" ? (
                      <Chip
                        label={truck.tags}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAnalyze}
            disabled={selectedTrucks.length === 0}
            sx={{ fontWeight: "bold" }}
          >
            Start Analysis ({selectedTrucks.length})
          </Button>
        </Box>
      </Paper>
 
      {/* Inventory Alerts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper>
            <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Inventory Alerts
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>Part No</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Site</TableCell>
                    <TableCell>On-hand</TableCell>
                    <TableCell>Reserved</TableCell>
                    <TableCell>ATP</TableCell>
                    <TableCell>Reorder Pt.</TableCell>
                    <TableCell>Expiry</TableCell>
                    <TableCell>Substitutes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryAlerts.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {item.partNo}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.site}</TableCell>
                      <TableCell>{item.onHand}</TableCell>
                      <TableCell>{item.reserved}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            item.atp <= item.reorderPt ? "#d32f2f" : "inherit",
                          fontWeight:
                            item.atp <= item.reorderPt ? "bold" : "normal",
                        }}
                      >
                        {item.atp}
                      </TableCell>
                      <TableCell>{item.reorderPt}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                      <TableCell>{item.substitutes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
 
        <Grid item xs={12} lg={4}>
          <Paper>
            <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Procurement Watchlist
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>Item</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Risk</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {procurementWatchlist.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {item.item}
                      </TableCell>
                      <TableCell>{item.vendor}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.risk}
                          size="small"
                          sx={{
                            backgroundColor: getRiskColor(item.risk),
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {item.reason}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {item.action}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
 
export default FleetDashboard;