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
  select = false,
  children,
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
    select={select}
    InputProps={{
      sx: {
        height: "48px",
        lineHeight: "42px",
        padding: "0 14px",
        fontSize: "14px", // Adjust font size if needed
      },
      inputProps: {
        style: {
          padding: "0px",
          height: "42px",
          display: "flex",
          alignItems: "center",
        },
      },
    }}>
    {children}
  </TextField>
);

export default AuthTextField;
