import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';



// Function for set new password

export function Setnewpassword() {

    const Navigate = useNavigate();

    const [formvalue, setformvalue] = useState({
        E_mail: "",
        New_Password: ""
    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.New_Password == "") errors.New_Password = "New_Password is Required";
        return errors;
    }

    // Onsubmit Function

    var Forgotpassword = async (formData) => {

        var response = await axios.post("http://localhost:3002/setnewpassword", {
            email: formData.E_mail,
            password: formData.New_Password
        })

        if (response.data.message === "Sorry Email does not Exist!") {
            alert("Sorry Email does not Exist!")
            return;
        }

        alert('Password changed successfully')
        Navigate('/', { replace: true })

    }

    return (
        <>

            {/* Top Grid */}
            <section>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 text-center mt-5 mt-lg-5 mt-md-5 mt-sm-5">
                            <div className="fontstyle3">
                                Set Your New Password
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container register">

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

                                {/* E_mail Input */}

                                <div class="row rowheight">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <label for="email" > E_mail </label>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                                        <input
                                            placeholder="Enter Your E_mail"
                                            type="email"
                                            name="E_mail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.E_mail}
                                        /> &nbsp; &nbsp; <div className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail} </div></div>
                                </div> <br></br><br></br>

                                {/* New_Password Input */}

                                <div class="row rowheight">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <label for="New_Password" > New_Password </label>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                                        <input
                                            placeholder="Enter Your New_Password"
                                            type="text"
                                            name="New_Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.New_Password}
                                        /> &nbsp; &nbsp; <div className="errors">  {errors.New_Password && touched.New_Password && errors.New_Password}</div> </div>
                                </div> <br></br><br></br>

                                {/* Change password Button */}

                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <button class="btn btn-info vbtn" type="submit" disabled={isSubmitting}>
                                            Change password
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