import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { registerLoading, registerError } = useSelector(
    (state) => state.auth
  );

  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);

  const redirectPath =
    location.state?.fromHeader
      ? "/"
      : location.state?.from?.pathname || "/";

  const validateName = (name) => /^[A-Za-z]{1,20}$/.test(name);
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formValues.firstName.trim() || !validateName(formValues.firstName)) {
      errors.firstName = "Enter a valid first name";
    }

    if (!formValues.lastName.trim() || !validateName(formValues.lastName)) {
      errors.lastName = "Enter a valid last name";
    }

    if (!formValues.email.trim() || !validateEmail(formValues.email)) {
      errors.email = "Enter a valid email";
    }

    if (
      !formValues.password.trim() ||
      !validatePassword(formValues.password)
    ) {
      errors.password =
        "Min 8 chars, upper, lower, number & special char required";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      // 🔐 TOKEN IS RECEIVED & STORED IN SLICE
      await dispatch(registerUser(formValues)).unwrap();

      // redirect only after token exists
      navigate(redirectPath, { replace: true });
    } catch (err) {
      // error handled by redux
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            margin="normal"
            value={formValues.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            margin="normal"
            value={formValues.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formValues.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={formValues.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                  >
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
            disabled={registerLoading}
            sx={{ mt: 2 }}
          >
            {registerLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>

          {registerError?.message && (
            <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
              {registerError.message}
            </FormHelperText>
          )}

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/signin">Sign In</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
