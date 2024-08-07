import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";
import useAuth from "../hooks/useAuth";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  useEffect(() => {
    const isFormValid =
      name &&
      email &&
      password &&
      confirmPassword &&
      location &&
      phoneNumber &&
      termsAccepted &&
      !passwordError &&
      !emailError &&
      password === confirmPassword;
    setIsFormValid(isFormValid);
  }, [
    name,
    email,
    password,
    confirmPassword,
    location,
    phoneNumber,
    termsAccepted,
    passwordError,
    emailError,
  ]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      validatePassword(e.target.value, confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordError) {
      validatePassword(password, e.target.value);
    }
  };

  const handleConfirmPasswordBlur = () => {
    validatePassword(password, confirmPassword);
  };

  const validatePassword = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password, location, phoneNumber);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response ? error.response.data.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: "50%",
          bgcolor: "#171b36",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img src={logo1} alt="Logo" />
      </Box>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 4,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <img src={logo2} alt="Logo" style={{ width: 50, marginRight: 8 }} />
          <Typography component="h1" variant="h5">
            Book Rent
          </Typography>
        </Box>
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, borderBottom: "2px solid #f0f0f0" }}>
          Signup as Owner
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSignup}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Full Name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                sx={{
                  color: "",
                  "&.Mui-checked": {
                    color: "#2196f3",
                  },
                }}
              />
            }
            label="I accept the Terms and Conditions"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#00abff" }}
            disabled={!isFormValid || loading}>
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2">Already have an account?</Typography>
            <Link
              component={RouterLink}
              to="/login"
              color="#00abff"
              marginLeft={1}
              variant="body2">
              Login
            </Link>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default Signup;
