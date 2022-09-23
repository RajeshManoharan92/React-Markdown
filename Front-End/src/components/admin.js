import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../auth";

// Function for Admin Page

export function Admin() {

    const Navigate = useNavigate()

    var auth = useAuth()

    const Logout = async () => {
        await auth.login("")
        await localStorage.setItem("username", "")
        await localStorage.setItem("adminname", "")
        await localStorage.setItem("userid", "")
        await localStorage.setItem("adminid", "")
        Navigate('/')
    }

    return (
        <>
            {/* Log Out Button */}

            <section>
                <div class="container-fluid ">
                    <div class="row mt-4 justify-content-end">
                        <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                            <button class="btn btn-outline-secondary" onClick={() => Logout()} >  Log Out </button>
                        </div>
                    </div>

                    {/* Top Grid */}

                    <div class="row mt-4 ">
                        <div class="col-12">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ height: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                                                Welcome Admin
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>

                    {/* Dashboard, Cart, Contact Us Details, Payement Page Buttons */}

                    <div class="row mt-5  text-center ">
                        <div class="col-lg-3 col-md-6 col-sm-6 col-7 mx-auto ">
                            <button class="btn btn-info" onClick={() => Navigate("/dashboard")}  > Dashboard </button>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 col-7 mx-auto mt-lg-0 mt-md-0 mt-sm-4 mt-4">
                            <button class="btn btn-info" onClick={() => Navigate("/cart")} > Cart </button>
                        </div>
                    </div><br></br>
                    <div class="row  mt-lg-5 mt-md-4 mt-sm-1 text-center">
                        <div class="col-lg-3 col-md-6 col-sm-6 col-7 mx-auto ">
                            <button class="btn btn-info" onClick={() => Navigate("/Enquirydetails")} > Enquiry Details </button>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 mx-auto col-7  mt-lg-0 mt-md-0 mt-sm-4 mt-4">
                            <button class="btn btn-info" onClick={() => Navigate("/createproduct")} > Create Product</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
