import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Function for new user registration

export function Register() {

    const Navigate = useNavigate();

    const [formvalue, setformvalue] = useState({
        Role: "",
        First_Name: "",
        Last_Name: "",
        E_mail: "",
        Password: ""
    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.Role == "") errors.Role = "Role is Required";
        if (formData.First_Name == "") errors.First_Name = "First Name is Required";
        if (formData.Last_Name == "") errors.Last_Name = "Last Name is Required";
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.Password == "") errors.Password = "Password is Required";
        return errors;
    }

    // On Submit Function

    var Register = async (formData) => {
        var response = await axios.post("https://product-rental-final.herokuapp.com/product/register", {
            Role: formData.Role,
            firstName: formData.First_Name,
            lastName: formData.Last_Name,
            email: formData.E_mail,
            password: formData.Password,
        })

        await setformvalue({ Role: "", First_Name: "", Last_Name: "", E_mail: "", Password: "" })

        if (response.data.message === "Created") {
            alert("Registered Successfully")
            Navigate('/', { replace: true })
        }

        else if (response.data === "User Already Exist. Please Login") {
            alert("User Already Exist. Please Login")
            setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })
        }
    }

    return (
        <>
            <section>
                <div class="container-fluid register">

                    {/* Top Grid */}

                    <div class="row mt-3">
                        <div class="col-12">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ height: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                                                Register Your Details...
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
                        onSubmit={(formData) => Register(formData)}
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

                                {/* select button */}

                                <div class="row mt-4 rowht justify-content-center ">

                                    <div class="col-lg-3 col-md-6 col-sm-6  justify-content-center">
                                        <Form.Select name="Role" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Role} aria-label="Default select example">
                                            <option>Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="User">User</option>
                                        </Form.Select>

                                    </div>
                                </div>
                                <div class="row  errorrowht">
                                    <div class=" col-12 text-center     ">
                                        <div className="errors text-center">{errors.Role && touched.Role && errors.Role}</div>
                                    </div>
                                </div>

                                {/* First_Name Input */}

                                <div class="row mt-3 rowht justify-content-center ">
                                    <div class="col-lg-3 col-md-6 col-sm-6 justify-content-center ">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">First_Name</InputGroup.Text>
                                            <Form.Control
                                                placeholder="Enter Your First_Name"
                                                type="text"
                                                name="First_Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.First_Name}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div class="row errorrowht">
                                    <div className="errors text-center">{errors.First_Name && touched.First_Name && errors.First_Name}</div>
                                </div>

                                {/* Last_Name Input */}

                                <div class="row mt-3 rowht justify-content-center ">

                                    <div class="col-lg-3 col-md-6 col-sm-6     justify-content-center ">

                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">Last_Name</InputGroup.Text>
                                            <Form.Control
                                                placeholder="Enter Your Last_Name"
                                                type="text"
                                                name="Last_Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Last_Name}
                                            />
                                        </InputGroup>
                                    </div> </div>
                                <div class="row errorrowht">
                                    <div className="errors text-center">  {errors.Last_Name && touched.Last_Name && errors.Last_Name}</div>
                                </div>


                                {/* Email Input */}

                                <div class="row rowht mt-3 justify-content-center">

                                    <div class="col-lg-3 col-md-6 col-sm-6 justify-content-center ">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                                            <Form.Control
                                                placeholder="Enter Your E_mail"
                                                type="email"
                                                name="E_mail"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.E_mail}
                                            />
                                        </InputGroup>
                                    </div> <br></br>
                                </div>
                                <div class="row errorrowht">
                                    <div className="errors text-center">  {errors.E_mail && touched.E_mail && errors.E_mail}</div>
                                </div>

                                {/* Password Input */}
                                <div class="row rowht justify-content-center mt-3">
                                    <div class="col-lg-3 col-md-6 col-sm-6  justify-content-center ">
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
                                    </div> </div>
                                <div class="row errorrowht ">
                                    <div className="errors text-center"> {errors.Password && touched.Password && errors.Password}</div>
                                </div>

                                {/* Register Button */}

                                <div class="row mt-3 mb-3 ">
                                    <div class="col-lg-2 col-md-6  col-sm-2 col-4 mx-auto text-center ">
                                        <button class="btn btn-info" type="submit" disabled={isSubmitting}>
                                            Register
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