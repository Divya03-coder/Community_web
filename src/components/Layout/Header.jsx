import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOut from "../Pages/Signout";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#0F172A" }}>
        <Toolbar>
          <Typography
            sx={{
              flexGrow: 1,
              fontFamily: "'Pacifico', cursive",
              fontSize: "32px",
              cursor: "pointer",
              color: "#fafdffff",
            }}
            onClick={() => {
              const heroSection = document.getElementById("hero");
              heroSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            TogetherWe
          </Typography>

          <Box>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
            ) : (
              <IconButton onClick={() => setOpenDrawer(true)}>
                <Avatar />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Correct component */}
      <SignOut
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
    </>
  );
}
