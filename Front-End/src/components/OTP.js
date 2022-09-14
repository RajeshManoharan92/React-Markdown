import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';



// function used for step-1 verification log-in

export function OTP() {

    const Navigate = useNavigate();

    // timer

    const [seconds, setseconds] = useState(60)
    const [minutes, setminutes] = useState(0)

    var timer;

    // useEffect used to start the timer on page load

    useEffect(
        () => {

            timer = setInterval(() => {
                setseconds(seconds - 1)
                if (seconds == 0) {
                    Navigate("/")
                }
            }, 1000);
            return () => clearInterval(timer)
        }
    )

    const [formvalue, setformvalue] = useState({
        OTP: ""
    })

    const useremail = localStorage.getItem("useremail")

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // Formik error validation

    const validate = (formData) => {
        var errors = {};
        if (formData.OTP == "") errors.OTP = "OTP is Required";
        return errors;
    }

    // On Submit Function

    const Login = async (formData) => {
        var response = await axios.post("http://localhost:3002/otp", {
            email: useremail,
            OTP: formData.OTP,
        })

        if (response.data.message === "Loggedin") {
            document.cookie = "token=" + response.data.user.token
            alert("step-2 - OTP Verification Success")
            Navigate('/dashboard', { replace: true })
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
                                Step-2 OTP Verification
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


                                {/* OTP Input */}

                                <div class="row rowheight">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <label for="email" > OTP </label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input
                                            placeholder="Enter Your OTP"
                                            type="OTP"
                                            name="OTP"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.OTP}
                                        /> &nbsp;&nbsp; <span style={{ color: "white", fontSize: "20px" }}> {seconds < 10 ? "0" + seconds : seconds} sec left</span> <div className="errors">{errors.OTP && touched.OTP && errors.OTP}</div>   </div>
                                </div> <br></br><br></br>

                                <div class="row">
                                    <div class="col text-center">
                                        <h5 class="verifymail">* Enter the OTP sent to your registered mail to activate your account</h5>
                                    </div>
                                </div>


                                {/* Login &  Forgot Password Button */}

                                <div class="row mt-5 rowheight">
                                    <div class="col-lg-6 col-md-6 col-sm-12  d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-warning  " type="button" onClick={() => Navigate("/")} disabled={isSubmitting}>
                                            Home
                                        </button>
                                    </div> <br></br>
                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 mt-lg-0 mt-sm-3 mt-md-0 d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-info  " type="submit" disabled={isSubmitting}>
                                            Log In
                                        </button>
                                    </div> <br></br>

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