import { useState } from "react";
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!emailError) {
      setLoading(true);
      try {
        await login(email, password);
        navigate("/dashboard");
      } catch (error) {
        setError(error.response ? error.response.data.message : "Login failed");
      } finally {
        setLoading(false);
      }
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
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                sx={{
                  color: "",
                  "&.Mui-checked": {
                    color: "#2196f3",
                  },
                }}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#00abff" }}
            disabled={!!emailError || loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2">Havent got an account?</Typography>
            <Link
              component={RouterLink}
              to="/signup"
              color="#00abff"
              marginLeft={1}
              variant="body2">
              Sign up
            </Link>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default Login;
