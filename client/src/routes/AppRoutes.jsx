// src/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<div>Hello Dashboard</div>} />
        <Route path="/books/:id" element={<div>Hello Book Detail</div>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
