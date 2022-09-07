import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../auth";


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
        var response = await axios.post("http://localhost:3002/login", {
            email: formData.E_mail,
            password: formData.Password,
        })

        if (response.data.message === "Loggedin") {
            auth.login(user)
            document.cookie = "token=" + response.data.user.token
            alert("Step-1 Verification Success")
            Navigate('/Verificationmail', { replace: true })
        }

        if (response.data === "Invalid") {
            alert("Invalid creditional")
        }
    }

    return (
        <>
            {/* Top Grid */}
            <section>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 text-center mt-5 mt-lg-5 mt-md-5 mt-sm-5 ">
                            <div className="fontstyle3">
                                Step-1 Verification - Log In
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container register">
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

                                <div class="row rowheight">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <label for="email" > E-mail Id </label> &nbsp;&nbsp;&nbsp;
                                        <input
                                            placeholder="Enter Your Email-Id"
                                            type="email"
                                            name="E_mail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.E_mail}
                                            onKeyUp={(e) => setUser(e.target.value)}
                                        />  <div className="errors ">{errors.E_mail && touched.E_mail && errors.E_mail}</div>  </div>
                                </div>
                                <br></br>

                                {/* Password Input */}

                                <div class="row rowheight">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <label for="email" > Password </label>  &nbsp;&nbsp;&nbsp;
                                        <input
                                            placeholder="Enter Your Password"
                                            type="password"
                                            name="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Password}
                                        /> <div className="errors">{errors.Password && touched.Password && errors.Password}</div>   </div>
                                </div> <br></br><br></br>

                                {/* Login &  Forgot Password Button */}

                                <div class="row rowheight">
                                    <div class="col-lg-4 col-md-4 col-sm-12  d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-warning  " type="button" onClick={() => Navigate("/")} disabled={isSubmitting}>
                                            Home
                                        </button>
                                    </div> <br></br>
                                    <div class="col-lg-4 col-md-4 col-sm-12 mt-3 mt-lg-0 mt-sm-3 mt-md-0 d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-info  " type="submit" disabled={isSubmitting}>
                                            Log In
                                        </button>
                                    </div> <br></br>
                                    <div class="col-lg-4 col-md-4 col-sm-12 mt-3 mt-lg-0 mt-sm-3 mt-md-0 d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-secondary" type="button" onClick={() => Navigate('/forgotpassword', { replace: true })} disabled={isSubmitting}>
                                            Forgot password
                                        </button>
                                    </div>
                                </div>
                                {/* <input type="text" onChange={(e)=>setUser(e.target.value)}></input> */}
                            </form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    )
}