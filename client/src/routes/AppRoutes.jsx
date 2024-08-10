import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import { AbilityProvider } from "../contexts/AbilityContext";
import useAuth from "../hooks/useAuth";
import Books from "../pages/Books";
import Owners from "../pages/Owners";
import UploadBook from "../pages/UploadBook";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <AbilityProvider user={user}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Public Routes */}
          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/owners" element={<Owners />} />
          </Route>
          <Route path="/book-upload" element={<UploadBook />} />
        </Routes>
      </AbilityProvider>
    </Router>
  );
}

export default AppRoutes;
