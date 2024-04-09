import { Box, Button, Chip, Modal } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

const modalHeaderStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: 0,
};

const modalTextStyle = {};

const PersonalisationModal = ({ industries, clearFilters, addFilter }) => {
  const [open, setOpen] = useState<boolean>(true);

  // handles toggling of the selected industries
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const handleIndustryChipToggle = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const IsChipSelected = (industry: string) => {
    return selectedIndustries.includes(industry);
  };

  const handleContinueButtonClick = () => {
    clearFilters();
    selectedIndustries.forEach((industry) => {
      addFilter("industries", industry, "any");
    });
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <p style={modalHeaderStyle}>Hello there!</p>
        <p style={modalTextStyle}>
          Select some industries you're interested in to help us personalise
          your experience.
        </p>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            marginBottom: "1rem",
          }}
        >
          {industries === undefined && <p>Loading...</p>}
          {industries !== undefined &&
            industries[0].data.map(
              (industry: { count: number; value: string }) => (
                <Chip
                  label={industry.value}
                  onClick={() => handleIndustryChipToggle(industry.value)}
                  color="primary"
                  variant={
                    IsChipSelected(industry.value) ? "filled" : "outlined"
                  }
                />
              )
            )}
        </Box>
        <Button onClick={handleContinueButtonClick}>Continue</Button>
      </Box>
    </Modal>
  );
};

export default PersonalisationModal;
