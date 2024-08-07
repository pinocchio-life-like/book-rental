import { useState, useEffect } from "react";
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
import useFormField from "../hooks/useFormField";
import useEmailField from "../hooks/useEmailField";
import usePasswordField from "../hooks/usePasswordField";
import useConfirmPasswordField from "../hooks/useConfirmPasswordField";

function Signup() {
  const nameField = useFormField("");
  const emailField = useEmailField("");
  const passwordField = usePasswordField("");
  const confirmPasswordField = useConfirmPasswordField(passwordField.value);
  const locationField = useFormField("");
  const phoneNumberField = useFormField("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  useEffect(() => {
    const isFormValid =
      nameField.value &&
      emailField.value &&
      passwordField.value &&
      confirmPasswordField.value &&
      locationField.value &&
      phoneNumberField.value &&
      termsAccepted &&
      !nameField.error &&
      !emailField.error &&
      !passwordField.error &&
      !confirmPasswordField.error &&
      passwordField.value === confirmPasswordField.value;
    setIsFormValid(isFormValid);
  }, [
    nameField,
    emailField,
    passwordField,
    confirmPasswordField,
    locationField,
    phoneNumberField,
    termsAccepted,
  ]);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      await signup(
        nameField.value,
        emailField.value,
        passwordField.value,
        locationField.value,
        phoneNumberField.value
      );
      navigate("/dashboard");
    } catch (error) {
      setError(error.response ? error.response.data.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <LogoSection />
      <AuthFormContainer title="Signup as Owner">
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSignup}>
          <AuthTextField
            label="Full Name"
            value={nameField.value}
            onChange={nameField.handleChange}
            onBlur={nameField.handleBlur}
            error={nameField.error}
            helperText={nameField.error}
          />
          <AuthTextField
            label="Email Address"
            type="email"
            value={emailField.value}
            onChange={emailField.handleChange}
            onBlur={emailField.handleBlur}
            error={!!emailField.error}
            helperText={emailField.error}
          />
          <AuthTextField
            label="Password"
            type="password"
            value={passwordField.value}
            onChange={passwordField.handleChange}
            onBlur={passwordField.handleBlur}
            error={!!passwordField.error}
            helperText={passwordField.error}
            autoComplete="new-password"
          />
          <AuthTextField
            label="Confirm Password"
            type="password"
            value={confirmPasswordField.value}
            onChange={confirmPasswordField.handleChange}
            onBlur={confirmPasswordField.handleBlur}
            error={!!confirmPasswordField.error}
            helperText={confirmPasswordField.error}
            autoComplete="new-password"
          />
          <AuthTextField
            label="Location"
            value={locationField.value}
            onChange={locationField.handleChange}
            onBlur={locationField.handleBlur}
            error={locationField.error}
            helperText={locationField.error}
          />
          <AuthTextField
            label="Phone Number"
            value={phoneNumberField.value}
            onChange={phoneNumberField.handleChange}
            onBlur={phoneNumberField.handleBlur}
            error={phoneNumberField.error}
            helperText={phoneNumberField.error}
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
          <LoadingButton loading={loading} disabled={!isFormValid || loading}>
            Sign Up
          </LoadingButton>
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
      </AuthFormContainer>
    </Box>
  );
}

export default Signup;
