import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../auth";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


// function used for step-1 verification log-in

export function Userlogin() {

    const Navigate = useNavigate();

    const [formvalue, setformvalue] = useState({
        E_mail: "",
        Password: ""
    })

    const [user, setUser] = useState("")
    const auth = useAuth()

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // Formik error validation

    const validate = (formData) => {
        var errors = {};
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.Password == "") errors.Password = "Password is Required";
        return errors;
    }

    // On Submit Function

    const Login = async (formData) => {
        var response = await axios.post("https://product-rental-final.herokuapp.com/product/login", {
            Role: "user",
            email: formData.E_mail,
            password: formData.Password,
        })

        if (response.data.message === "UserLoggedin") {
            await auth.login(user)
            await localStorage.setItem("username", response.data.user.first_name)
            await localStorage.setItem("userid", response.data.user._id)
            document.cookie = "token=" + response.data.user.token
            alert("User - Verification Success")
            Navigate('/dashboard', { replace: true })
        }

        else if (response.data === "Invalid") {
            alert("Invalid creditional")
        }

    }

    return (
        <>
            {/* Top Grid */}
            <section>
                <div class="container-fluid">
                    <div class="row mt-3">
                        <div class="col-12">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ height: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                                                User Login...
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>

                    <Formik
                        initialValues={formvalue}
                        validate={(formData) => validate(formData)}
                        onSubmit={(formData) => Login(formData)}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>

                                {/* E-mail Input */}

                                <div class="row mt-5 rowheight justify-content-center">
                                    <div class="col-lg-4 col-md-4 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">E-mail</InputGroup.Text>
                                            <Form.Control
                                                placeholder="Enter Your Email-Id"
                                                type="email"
                                                name="E_mail"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.E_mail}
                                                onKeyUp={(e) => setUser(e.target.value)}
                                            />
                                        </InputGroup>
                                        <div class="row errorrowht">
                                            <div className="errors ">{errors.E_mail && touched.E_mail && errors.E_mail}</div>  </div>
                                    </div>
                                </div>

                                {/* Password Input */}

                                <div class="row mt-4 rowheight justify-content-center">
                                    <div class="col-lg-4 col-md-4 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                                            <Form.Control
                                                placeholder="Enter Your Password"
                                                type="password"
                                                name="Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Password}
                                            />
                                        </InputGroup>
                                        <div class="row errorrowht">
                                            <div className="errors">{errors.Password && touched.Password && errors.Password}</div>  </div>
                                    </div>
                                </div>

                                {/*Home , Login &  Forgot Password Button */}

                                <div class="row mt-5 ">
                                    <div class="col-lg-2 col-md-6  col-sm-2 col-7 mx-auto  d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-warning  " type="button" onClick={() => Navigate("/")} disabled={isSubmitting}>
                                            Home
                                        </button>
                                    </div> <br></br>
                                    <div class="col-lg-2 col-md-6 col-sm-2 col-7 mx-auto  mt-3 mt-lg-0 mt-sm-3 mt-md-0 d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-info  " type="submit" disabled={isSubmitting}>
                                            Log In
                                        </button>
                                    </div> <br></br>
                                    <div class="col-lg-2 col-md-6  col-sm-2 col-7 mx-auto  mt-3 mt-lg-0 mt-sm-3 mt-md-0 d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-secondary" type="button" onClick={() => Navigate('/forgotpass', { replace: true })} disabled={isSubmitting}>
                                            Forgot password
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    )
}