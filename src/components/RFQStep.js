import React from "react";
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
  LinearProgress,
} from "@mui/material";

const RFQStep = ({ onApprove, onBack }) => {
  // Vendor data
  const vendors = [
    {
      name: "Bharat Mining Supply",
      certValidUntil: "31-Dec-2025",
      onTimePercent: "96%",
      warrantyTier: "Tier-A",
      region: "Odisha",
      approved: true,
      status: "✅",
    },
    {
      name: "EastPort Spares",
      certValidUntil: "30-Nov-2025",
      onTimePercent: "92%",
      warrantyTier: "Tier-B",
      region: "Andhra",
      approved: true,
      status: "✅",
    },
    {
      name: "Outback Equip Spares",
      certValidUntil: "15-Jan-2026",
      onTimePercent: "88%",
      warrantyTier: "Tier-B",
      region: "Karnataka",
      approved: true,
      status: "✅",
    },
    {
      name: "QuarryParts Co.",
      certValidUntil: "30-Sep-2025",
      onTimePercent: "90%",
      warrantyTier: "Tier-A",
      region: "Maharashtra",
      approved: true,
      status: "✅",
    },
    {
      name: "SteelVale Spares",
      certValidUntil: "30-Aug-2025",
      onTimePercent: "85%",
      warrantyTier: "Tier-C",
      region: "Chhattisgarh",
      approved: false,
      status: "⚠ (near expiry)",
    },
  ];

  // Live tracker data
  const liveTracker = [
    {
      rfqId: "RFQ-2025-0816-01",
      bundle: "Oil & Filters",
      vendorsContacted: 4,
      status: "Offers: 3/4",
      lastActivity: "16-Aug 17:10",
      slaCountdown: "18h 50m",
      progress: 75,
    },
    {
      rfqId: "RFQ-2025-0816-02",
      bundle: "Hydraulics",
      vendorsContacted: 5,
      status: "Clarifications with 2 vendors",
      lastActivity: "16-Aug 16:55",
      slaCountdown: "18h 05m",
      progress: 60,
    },
    {
      rfqId: "RFQ-2025-0816-03",
      bundle: "Cooling",
      vendorsContacted: 3,
      status: "Offers: 2/3",
      lastActivity: "16-Aug 16:40",
      slaCountdown: "19h 20m",
      progress: 67,
    },
  ];

  // Offers data
  const offers = [
    {
      rfq: "01",
      vendor: "Bharat Mining Supply",
      partBundle: "Oil Filter Kit (ea)",
      unitPrice: "₹28,500",
      moq: 1,
      leadTimeDays: 1,
      warrantyMonths: 12,
      freight: "₹3,000",
      totalLanded: "₹31,500",
      etaToSite: "18-Aug",
      certOk: true,
      geoOk: true,
    },
    {
      rfq: "01",
      vendor: "EastPort Spares",
      partBundle: "Oil Filter Kit (ea)",
      unitPrice: "₹26,900",
      moq: 2,
      leadTimeDays: 3,
      warrantyMonths: 12,
      freight: "₹4,200",
      totalLanded: "₹31,100",
      etaToSite: "20-Aug",
      certOk: true,
      geoOk: true,
    },
    {
      rfq: "01",
      vendor: "QuarryParts Co.",
      partBundle: "15W-40 200 L drum",
      unitPrice: "₹24,000",
      moq: 1,
      leadTimeDays: 2,
      warrantyMonths: 6,
      freight: "₹2,000",
      totalLanded: "₹26,000",
      etaToSite: "19-Aug",
      certOk: true,
      geoOk: true,
    },
    {
      rfq: "02",
      vendor: "Bharat Mining Supply",
      partBundle: 'Hose 1.5" 2.5 m',
      unitPrice: "₹62,000",
      moq: 1,
      leadTimeDays: 2,
      warrantyMonths: 12,
      freight: "₹3,500",
      totalLanded: "₹65,500",
      etaToSite: "18-Aug",
      certOk: true,
      geoOk: true,
    },
    {
      rfq: "03",
      vendor: "QuarryParts Co.",
      partBundle: "Fan Module",
      unitPrice: "₹5,60,000",
      moq: 1,
      leadTimeDays: 2,
      warrantyMonths: 12,
      freight: "₹8,000",
      totalLanded: "₹5,68,000",
      etaToSite: "18-Aug",
      certOk: true,
      geoOk: true,
    },
    {
      rfq: "03",
      vendor: "EastPort Spares",
      partBundle: "Fan Module",
      unitPrice: "₹5,15,000",
      moq: 1,
      leadTimeDays: 5,
      warrantyMonths: 6,
      freight: "₹9,500",
      totalLanded: "₹5,24,500",
      etaToSite: "21-Aug",
      certOk: true,
      geoOk: true,
    },
  ];

  const handleSendRFQs = () => {
    // RFQ sending logic would go here
    console.log("RFQs sent");
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return "success";
    if (progress >= 50) return "warning";
    return "error";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Step 2: RFQ Composer & Tracker
      </Typography>

      {/* RFQ Setup Section */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            RFQ Setup
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
            Scope: Parts & consumables for TK-203, TK-117, TK-342 (bundles
            above)
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Vendors (approved shortlist):
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Cert Valid-Until</TableCell>
                  <TableCell>On-Time % (90d)</TableCell>
                  <TableCell>Warranty Tier</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Approved</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.map((vendor, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {vendor.name}
                    </TableCell>
                    <TableCell>{vendor.certValidUntil}</TableCell>
                    <TableCell>{vendor.onTimePercent}</TableCell>
                    <TableCell>{vendor.warrantyTier}</TableCell>
                    <TableCell>{vendor.region}</TableCell>
                    <TableCell>{vendor.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Commercial terms:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>INCOTERMS:</strong> DAP Site-A - <strong>Payment:</strong>{" "}
              Net-30 - <strong>Tax:</strong> GST 18% -{" "}
              <strong>Core return:</strong> Alternator only (not in this RFQ)
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, mt: 3 }}>
              Technical package:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Drawings:</strong> HP360-ENG-OPS-009-DWG.pdf,
              HY-MAN-SEAL-KIT-Spec.pdf
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Photos:</strong> TK117_ManifoldLeak.jpg
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Lots:</strong> Split by bundle allowed; alternates allowed
              only for hoses & filters.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Response deadline:</strong> 17-Aug 12:00 IST
              (auto-reminders at T-12h and T-2h)
            </Typography>
            <Typography variant="body2">
              <strong>Safety/warranty clauses:</strong> Standard OEM warranty
              required for fan module; hoses must meet SAE 100R15.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Live Tracker */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Live Tracker
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>RFQ ID</TableCell>
                <TableCell>Bundle</TableCell>
                <TableCell>Vendors Contacted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Activity</TableCell>
                <TableCell>SLA Countdown</TableCell>
                <TableCell>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {liveTracker.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {item.rfqId}
                  </TableCell>
                  <TableCell>{item.bundle}</TableCell>
                  <TableCell>{item.vendorsContacted}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.lastActivity}</TableCell>
                  <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>
                    {item.slaCountdown}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        color={getProgressColor(item.progress)}
                        sx={{ width: 80, height: 8 }}
                      />
                      <Typography variant="body2">{item.progress}%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Message Center */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Message center
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>16-Aug 16:30</strong> Bharat Mining Supply: "Confirm hose
            end fittings are JIC 37°?"
          </Typography>
          <Typography variant="body2" sx={{ ml: 2, color: "#4caf50" }}>
            → Broadcast clarif: "Yes, JIC 37°, 1.5" both ends."
          </Typography>
        </Box>
      </Paper>

      {/* Offers */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Offers (normalized view)
          </Typography>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>RFQ</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Part/Bundle</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>MOQ</TableCell>
                <TableCell>Lead-time (days)</TableCell>
                <TableCell>Warranty (months)</TableCell>
                <TableCell>Freight</TableCell>
                <TableCell>Total Landed</TableCell>
                <TableCell>ETA to Site</TableCell>
                <TableCell>Cert OK</TableCell>
                <TableCell>Geo OK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontWeight: "bold" }}>{offer.rfq}</TableCell>
                  <TableCell>{offer.vendor}</TableCell>
                  <TableCell>{offer.partBundle}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {offer.unitPrice}
                  </TableCell>
                  <TableCell>{offer.moq}</TableCell>
                  <TableCell>{offer.leadTimeDays}</TableCell>
                  <TableCell>{offer.warrantyMonths}</TableCell>
                  <TableCell>{offer.freight}</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    {offer.totalLanded}
                  </TableCell>
                  <TableCell>{offer.etaToSite}</TableCell>
                  <TableCell>
                    <Chip
                      label={offer.certOk ? "✅" : "❌"}
                      size="small"
                      color={offer.certOk ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={offer.geoOk ? "✅" : "❌"}
                      size="small"
                      color={offer.geoOk ? "success" : "error"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Action buttons */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="outlined" color="secondary">
          Re-issue RFQ
        </Button>
        <Button variant="outlined" color="info">
          Export CSV
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onApprove}
          sx={{ fontWeight: "bold" }}
        >
          Close & Move to Recommendations
        </Button>
      </Box>
    </Box>
  );
};

export default RFQStep;
