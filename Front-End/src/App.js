import React from "react";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from "./components/login";
import { Admin } from "./components/admin";
import { Enquirydetails } from "./components/enquiry";
import { Razorpay } from "./components/Razorpay";
import { Dashboard } from "./components/Dashboard";
import { Cart } from "./components/cart";
import { Contactus } from "./components/contactus";
import { Register } from "./components/Register";
import { Adminlogin } from "./components/Adminlogin";
import { Createproduct } from "./components/createProduct";
import { Userlogin } from "./components/userlogin";
import { Forgotpassword } from "./components/forgotpassword";
import { RequireAuth } from "./RequiredAuth";
import { AuthProvider } from "./auth";


export default function App() {
  return (

    // Router used for navigation through pages

    <div>
      < AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userlogin" element={<Userlogin />} />
            <Route path="/forgotpass" element={<Forgotpassword />} />
            <Route path="/adminlogin" element={<Adminlogin />} />
            <Route path="/createproduct" element={<Createproduct />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/Enquirydetails" element={<Enquirydetails />} />
            <Route path="/razorpay" element={<Razorpay />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}



















