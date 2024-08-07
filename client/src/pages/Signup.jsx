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
          <AuthTextField label="Full Name" {...nameField} />
          <AuthTextField label="Email Address" type="email" {...emailField} />
          <AuthTextField
            label="Password"
            type="password"
            {...passwordField}
            autoComplete="new-password"
          />
          <AuthTextField
            label="Confirm Password"
            type="password"
            {...confirmPasswordField}
            autoComplete="new-password"
          />
          <AuthTextField label="Location" {...locationField} />
          <AuthTextField label="Phone Number" {...phoneNumberField} />
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
