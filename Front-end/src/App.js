import React from "react";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./auth";
import { RequireAuth } from "./RequireAuth";
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Userlogin } from "./components/UserLogin"
import { Verification } from "./components/Verification"
import { Forgotpassword } from "./components/ForgotPassword"
import { Setnewpassword } from "./components/NewPassword"
import { Dashboard } from "./components/Dashboard"



export default function App() {
  return (

    // Router used for navigation through pages

    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/LoginAuth" element={<Register />} />
            <Route path="/userlogin" element={<Userlogin />} />
            <Route path="/Verificationmail" element={<RequireAuth><Verification /></RequireAuth>} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/setnewpassword" element={<Setnewpassword />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}


















