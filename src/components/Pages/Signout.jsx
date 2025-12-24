import { Drawer, Box, Typography, Button, Divider, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function SignOut({ open, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from Redux first, fallback to localStorage
  const { user: reduxUser } = useSelector((state) => state.auth);

  const localUser = (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  })();

  const user = reduxUser || localUser || { firstName: "Guest", email: "guest@example.com" };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/");
  };
console.log("Redux user:", reduxUser);
console.log("LocalStorage user:", localUser);
console.log("Final user:", user);

  return (
    

    
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          mt: 8,   // pushes it below AppBar
          mr: 2,
          borderRadius: 2,
          height: "auto",
        },
      }}
    >
      
      <Box sx={{ p: 3 }}>
        {/* Header with avatar and email */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: "#0F172A" }}>
            {user?.email?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.firstName || "Guest"} {user?.lastName || ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || "guest@example.com"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Logout */}
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
}
