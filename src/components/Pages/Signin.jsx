import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loginLoading, loginError } = useSelector((state) => state.auth);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);

  const redirectPath = location.state?.from?.pathname || "/";

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginLoading) return;

    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Enter your email";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Enter your password";
    } else if (!validatePassword(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const res = await dispatch(loginUser(formData));

    if (res.meta.requestStatus === "fulfilled") {
      setShowSuccess(true);
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1500);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f0f2f5",
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: 380,
          borderRadius: 3,
          position: "relative",
          background: "linear-gradient(to bottom right, #ffffff, #e0e0e0)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4 }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loginLoading}
            sx={{ mt: 2, textTransform: "none" }}
          >
            {loginLoading ? "Signing In..." : "Sign In"}
          </Button>

          {loginError?.message && (
            <FormHelperText error sx={{ mt: 1, textAlign: "center" }}>
              {loginError.message}
            </FormHelperText>
          )}

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              to="/Signup"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>

        <Button
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            margin: 0,
            textTransform: "none",
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              borderColor: "#1565c0",
              backgroundColor: "#e3f2fd",
            },
          }}
        >
          &larr; Back to Home
        </Button>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Login Successful – Welcome Back!
        </Alert>
      </Snackbar>
    </Box>
  );
}
