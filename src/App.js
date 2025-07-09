import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./utils/adminlayout";
import UserManagement from "./pages/usermanagement";
import Navbar from "./components/navbar";
import "antd/dist/reset.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
