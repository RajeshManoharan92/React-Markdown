import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';


// function used for login page

export function Login() {

  const Navigate = useNavigate()

  return (
    <>
      {/* Top-Grid */}

      <section>
        <div class="container-fluid mt-2 " >
          <div class="row " >
            <div class="col-12 mt-2">
              <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                  <Toolbar style={{ height: "12vw" }} className="color">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                      <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                        Welcome to Product Rental
                      </div>
                      <div style={{ fontSize: "1.5vw" }}>
                        Don't need to buy a product anymore.. JUST Rent it !!!!
                      </div>
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Box>
            </div>
          </div>

          {/* Admin & User Login Button */}

          <div class="row mt-5">
            <div class="col-lg-2 col-md-6 col-sm-2 col-6 mt-5 text-center  mx-auto">
              <button class="btn btn-info text-nowrap" onClick={() => Navigate("/adminlogin")}>Admin Login</button>
            </div>
          </div>

          <div class="row mt-5 bg ">
            <div class="col-lg-2 col-md-6 col-sm-2 col-6  text-center mx-auto">
              <button class="btn btn-secondary text-nowrap" onClick={() => Navigate("/userlogin")}>User Login</button>
            </div>
          </div>

          <div class="row mt-5 bg ">
            <div class="col-lg-2 col-md-6 col-sm-2 col-6  text-center mx-auto">
              <button class="btn btn-info text-nowrap" onClick={() => Navigate("/register")}>Register</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}