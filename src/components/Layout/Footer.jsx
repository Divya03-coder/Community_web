import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    // ✅ FULL WIDTH WRAPPER (BACKGROUND)
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#0F172A",
        color: "#fff",
      }}
    >
      {/* ✅ CENTERED CONTENT ONLY */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 3,
          py: 4,
        }}
      >
        {/* Top section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 3,
          }}
        >
          {/* Branding */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'Pacifico', cursive",
                fontSize: "32px",
                fontWeight: 400,
                color: "#ffffff",
              }}
            >
              TogetherWe
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Making learning fun and connecting communities online.
            </Typography>
          </Box>

          {/* Social icons */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton sx={{ color: "#fff" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.25)",
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} TogetherWe. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
