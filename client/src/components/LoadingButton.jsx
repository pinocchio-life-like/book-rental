import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ loading, children, ...props }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2, bgcolor: "#00abff" }}
    disabled={loading || props.disabled}>
    {loading ? <CircularProgress size={24} /> : children}
  </Button>
);

export default LoadingButton;
