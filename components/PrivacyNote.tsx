import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";

// References:
// How to make the Modal: https://mui.com/material-ui/react-modal/
// How to use Cookie: https://www.telerik.com/blogs/react-basics-how-to-use-cookies

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

function PrivacyModal() {
  // Default assume the person has the cookie so don't need privacy banner
  const [isOpen, setIsOpen] = useState(false);

  // Check if the cookie is true
  useEffect(() => {
    const hasAgreed = Cookies.get("userAgreedToPrivacyPolicy");
    if (!hasAgreed) {
      setIsOpen(true);
    }
  }, []);

  // Function to change it to true
  const handleAgree = () => {
    Cookies.set("userAgreedToPrivacyPolicy", true, { expires: 30 });
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="privacy-policy-title"
      aria-describedby="privacy-policy-description"
    >
      <Box sx={style}>
        <Typography id="privacy-policy-title" variant="h6" component="h2">
          Privacy Policy
        </Typography>
        <Typography id="privacy-policy-description" sx={{ mt: 2 }}>
          The privacy and safety of our mentors are of utmost priority to
          Advisory. Any attempt to approach or contact our mentors outside of
          the parameters of the Advisory Mentorship Programme—whilst claiming
          affiliation to Advisory, or misrepresenting a relationship to
          Advisory—will be treated as misrepresentation, even fraudulent
          misrepresentation, as considered under the Misrepresentation Act.
          Advisory will take legal action against any individuals or
          organisations who attempt to deceive, harass, or otherwise request
          dishonest assistance from our mentors.
        </Typography>
        <Button onClick={handleAgree} style={{ marginTop: "20px" }}>
          Agree
        </Button>
      </Box>
    </Modal>
  );
}

export default PrivacyModal;
