import { TextField } from "@mui/material";

const AuthTextField = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = "text",
  autoComplete,
}) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    label={label}
    autoComplete={autoComplete}
    type={type}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={!!error}
    helperText={helperText}
  />
);

export default AuthTextField;
