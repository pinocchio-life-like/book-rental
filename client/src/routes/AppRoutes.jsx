import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  const { user, token } = useAuth();

  return (
    <Router>
      <AbilityProvider user={user}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />

          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <PrivateRoute ability="read" subject="Book">
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/books"
            element={
              <PrivateRoute ability="manages" subject="Book">
                <Books />
              </PrivateRoute>
            }
          />

          <Route
            path="/owners"
            element={
              <PrivateRoute ability="manages" subject="Owners">
                <Owners />
              </PrivateRoute>
            }
          />

          <Route
            path="/book-upload"
            element={
              <PrivateRoute ability="upload" subject="Book">
                <UploadBook />
              </PrivateRoute>
            }
          />
        </Routes>
      </AbilityProvider>
    </Router>
  );
}

export default AppRoutes;
