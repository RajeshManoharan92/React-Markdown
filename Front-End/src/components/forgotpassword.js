import React, { useState } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// Function for new user registration

export function Forgotpassword() {

    const Navigate = useNavigate();

    // formik initial values

    const [formvalue, setformvalue] = useState({
        Role: "",
        E_mail: "",
        New_Password: ""
    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.Role == "") errors.Role = "Role is Required";
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.New_Password == "") errors.New_Password = "New_Password is Required";
        return errors;
    }

    // Onsubmit Function

    var Forgotpassword = async (formData) => {
        var response = await axios.post("https://product-rental-final.herokuapp.com/product/newpassword", {
            Role: formData.Role,
            email: formData.E_mail,
            password: formData.New_Password
        })

        if (response.data.message === "Not-user") {
            alert("Not a user, Please Sign Up")
            Navigate('/register', { replace: true })
            return;
        }

        else if (response.data.message === "Not-admin") {
            alert("Not a admin, Please Sign Up")
            Navigate('/register', { replace: true })
            return;
        }

        else if (response.data.message === "User - Password changed") {
            alert('User - Password changed')
            Navigate('/', { replace: true })
            return;
        }

        else if (response.data.message === "Admin - Password changed") {
            alert("Admin - Password changed")
            Navigate('/', { replace: true })
            return;
        }
    }

    return (
        <>
            <section>
                <div class="container-fluid">
                    <div class="row mt-3">
                        <div class="col-12">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ height: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                                                Set New Password
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>
                    <div class=" mt-4">
                        <Formik
                            initialValues={formvalue}
                            validate={(formData) => validate(formData)}
                            onSubmit={(formData) => Forgotpassword(formData)}
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

                                    <div class="row mt-5 rowht justify-content-center ">

                                        <div class="col-lg-4 col-md-4 col-sm-6 justify-content-center">
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

                                    {/* Name Input */}

                                    <div class="row mt-5 justify-content-center rowheight">
                                        <div class="col-lg-4 col-md-4 col-sm-12 text-center">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1"
                                                >E-mail</InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Enter Your E_mail"
                                                    type="email"
                                                    name="E_mail"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.E_mail}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div class="row text-center  errorrowht">
                                            <div className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail} </div></div>
                                    </div>

                                    {/* Password Input */}

                                    <div class="row mt-5 justify-content-center rowheight">
                                        <div class="col-lg-4 col-md-4 col-sm-12 text-center">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text id="basic-addon1"
                                                >Password</InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Enter Your New_Password"
                                                    type="password"
                                                    name="New_Password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.New_Password}
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div class="row text-center errorrowht">
                                        <div className="errors">  {errors.New_Password && touched.New_Password && errors.New_Password}</div>
                                    </div>

                                    {/* Change password Button */}

                                    <div class="row mb-5 mt-3 rowht">
                                        <div class="col-lg-2 col-md-4 col-sm-2 col-6 text-center mx-auto mt-lg-4 mt-md-5 mt-sm-5">
                                            <button class="btn btn-info vbtn" type="submit" disabled={isSubmitting}>
                                                Change password
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    )
}
