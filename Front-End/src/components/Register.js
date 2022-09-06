import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';


// Function for new user registration

export function Register() {

    const Navigate = useNavigate();

    const [formvalue, setformvalue] = useState({
        First_Name: "",
        Last_Name: "",
        E_mail: "",
        Password: ""
    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.First_Name == "") errors.First_Name = "First Name is Required";
        if (formData.Last_Name == "") errors.Last_Name = "Last Name is Required";
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.Password == "") errors.Password = "Password is Required";
        return errors;
    }

    // On Submit Function

    var Register = async (formData) => {
        var response = await axios.post("http://localhost:3002/register", {
            firstName: formData.First_Name,
            lastName: formData.Last_Name,
            email: formData.E_mail,
            password: formData.Password,
        })

        await setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })

        if (response.statusText === "Created") {
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

            {/* Top Grid */}

            <div class="container-fluid mt-5">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div className="fontstyle3">
                            Register Your Details
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div class="container register">
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

                                {/* First_Name Input */}

                                <div class="row registerrow ">
                                    <div class="col-lg-3 col-md-3 col-sm-6 text-center   ">
                                        <label for="First_Name" > First_Name </label> &nbsp; &nbsp;
                                        <div className="errors text-center">{errors.First_Name && touched.First_Name && errors.First_Name}</div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-6  d-flex justify-content-center ">
                                        <input
                                            placeholder="Enter Your First_Name"
                                            type="text"
                                            name="First_Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.First_Name}
                                        />
                                    </div>

                                    {/* Last_Name Input */}

                                    <div class="col-lg-3 col-md-3 col-sm-6 text-center  ">
                                        <label for="Last_Name" > Last_Name </label>
                                        <div className="errors text-center">  {errors.Last_Name && touched.Last_Name && errors.Last_Name}</div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-6  d-flex justify-content-center ">
                                        <input
                                            placeholder="Enter Your Last_Name"
                                            type="text"
                                            name="Last_Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Last_Name}
                                        />   </div>
                                </div>
                                <br></br><br></br>

                                {/* Email Input */}

                                <div class="row registerrow">
                                    <div class="col-lg-3 col-md-3 col-sm-6 text-center   ">
                                        <label for="email" > E_mail </label>
                                        <div className="errors text-center">  {errors.E_mail && touched.E_mail && errors.E_mail}</div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-6  d-flex justify-content-center ">
                                        <input
                                            placeholder="Enter Your E_mail"
                                            type="email"
                                            name="E_mail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.E_mail}
                                        />  </div> <br></br>

                                    {/* Password Input */}

                                    <div class="col-lg-3 col-md-3 col-sm-6 text-center  ">
                                        <label for="email" > Password </label>
                                        <div className="errors text-center"> {errors.Password && touched.Password && errors.Password}</div>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-6  d-flex justify-content-center ">
                                        <input
                                            placeholder="Enter Your Password"
                                            type="password"
                                            name="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Password}
                                        />   </div> </div>   <br></br> <br></br>

                                {/* Register Button */}

                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-center">
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