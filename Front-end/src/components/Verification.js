import React, { useState, useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';


// function used for step-2 E-mail verification 

export function Verification() {

    const Navigate = useNavigate();

    const [formvalue, setformvalue] = useState({
        E_mail: "",
    })

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    //  Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        return errors;
    }

    // On submit Function

    var Verification = async (formData, e) => {
        var response = await axios.post("http://localhost:3002/verification", {
            email: formData.E_mail,
        })

        if (response.data.message === "Sorry Email does not Exist!") {
            alert("Sorry Email does not Exist!")
        }

        if (response.data === "mail_sent") {

            alert("mail sent")
            Navigate('/dashboard', { replace: true })

        }
    }
    return (
        <>

            {/* Top Grid */}
            <section>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 text-center mt-5 mt-lg-5 mt-md-5 mt-sm-5">
                            <div className="fontstyle3">
                                Step-2 Email Verification
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container register">
                    <Formik
                        initialValues={formvalue}
                        validate={(formData) => validate(formData)}
                        onSubmit={(formData) => Verification(formData)}
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

                                {/* Email Input */}

                                <div class="row rowheight">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <label for="email" > E_mail </label> &nbsp; &nbsp;
                                        <input
                                            placeholder="Enter Your E_mail"
                                            type="email"
                                            name="E_mail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.E_mail}
                                        /> &nbsp; &nbsp;<div className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail}</div> </div>
                                </div>
                                <br></br>

                                {/* Send Verification E-mail button */}

                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                        <button class="btn btn-info vbtn" type="submit" disabled={isSubmitting}>
                                            Send Verification E-mail
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik> <br></br>
                    <span class="verifymail">* Click the link sent to your registered mail to activate your account</span>
                </div>
            </section>
        </>
    )
}