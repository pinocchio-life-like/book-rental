import { useState } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LogoSection from "../components/LogoSection";
import AuthFormContainer from "../components/AuthFormContainer";
import AuthTextField from "../components/AuthTextField";
import LoadingButton from "../components/LoadingButton";
import useEmailField from "../hooks/useEmailField";
import usePasswordField from "../hooks/usePasswordField";

function Login() {
  const emailField = useEmailField("");
  const passwordField = usePasswordField("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!emailField.error) {
      setLoading(true);
      try {
        await login(emailField.value, passwordField.value);
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
      <LogoSection />
      <AuthFormContainer title="Login">
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <AuthTextField
            label="Email Address"
            type="email"
            value={emailField.value}
            onChange={emailField.handleChange}
            onBlur={emailField.handleBlur}
            error={!!emailField.error}
            helperText={emailField.error}
            autoComplete="email"
            autoFocus
          />
          <AuthTextField
            label="Password"
            type="password"
            value={passwordField.value}
            onChange={passwordField.handleChange}
            onBlur={passwordField.handleBlur}
            error={!!passwordField.error}
            helperText={passwordField.error}
            autoComplete="current-password"
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
          <LoadingButton
            loading={loading}
            disabled={!!emailField.error || loading}>
            Login
          </LoadingButton>
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
      </AuthFormContainer>
    </Box>
  );
}

export default Login;
