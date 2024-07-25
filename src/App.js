// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import { About } from "./page/About";
import { AuthProvider } from "./component/auth";
import Login from "./page/Login";
import Predictions from "./page/Prediction";
import { Interest } from "./page/Interest";
import AdminLogin from "./page/AdminLogin";
import { RegisterDashboard } from "./page/RegisterDashboard";
import { EditRegisteredData } from "./page/EditRegisteredData";
import { NotAcceptPage } from "./page/NotAcceptPage";
import { PrivateRoute } from "./page/PrivateRoute";
import { ClickAnalysis } from "./page/ClickAnalysis";
import DashboardPage from "./page/DashboardPage"; // Correct import for DashboardPage
import ShowComparision from "./page/ShowComparision"; // Import ShowComparision

function App() {
  const token = localStorage.getItem("admin_token");
  const logintoken = localStorage.getItem("auth-token") || "";

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/logins" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/notaccept" element={<NotAcceptPage />} />
            <Route path="/analysispage" element={<ClickAnalysis />} />
            <Route path="/interest/:data" element={<Interest />} />
            <Route path="/comparisonpage" element={<ShowComparision />} /> {/* Add route for ShowComparision */}
            <Route element={<PrivateRoute token={token} />}>
              <Route path="/dashboard" element={<DashboardPage />} /> {/* Use DashboardPage */}
              <Route path="/registered" element={<RegisterDashboard />} />
              <Route path="/editregister/:id" element={<EditRegisteredData />} />
            </Route>
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
