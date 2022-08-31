import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './index.css';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';



export default function App() {
  return (

    // Router used for navigation through pages

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/LoginAuth" element={<Register />} />
          <Route path="/userlogin" element={<Userlogin />} />
          <Route path="/Verificationmail" element={<Verification />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/setnewpassword" element={<Setnewpassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// function used for login page

function Login() {

  const Navigate = useNavigate()

  return (
    <>
      {/* Top-Grid */}

      <div class="container cont ">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 text-wrap text-center mb-md-5 mb-sm-5 ">
            <div className="fontstyle1">
              Markdown Text Editor & Viewer
            </div>
            <div className="fontstyle2">
              Create & Edit Your Markdown Text Here...
            </div>
          </div>

          {/*User Login & New User Button */}

          <div class="col-lg-3 col-md-6 col-sm-12  offset-lg-2 text-center d-flex justify-content-center 
          d-flex align-self-lg-center d-flex align-self-md-center d-flex align-self-sm-center d-md-table mx-auto ">
            <div class="card bg-light border-info mt-lg-0 mt-md-4 mt-sm-5 ">
              <div class="card-body   ">
                <div class="row">
                  <div >
                    <button class="btn btn-info vbtn text-wrap  " onClick={() => Navigate("/userlogin")}>User Login</button>
                  </div>
                </div> <br></br>
                <div class="row">
                  <div>
                    <button class="btn btn-secondary vbtn text-wrap " onClick={() => Navigate("/LoginAuth")}>New User!</button>
                  </div>
                </div>
              </div>
            </div>
          </div> <br></br><br></br>
        </div>
      </div>

    </>
  );
}

// Function for new user registration

function Register() {

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
      Navigate('/')
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

// function used for step-1 verification log-in

function Userlogin() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    E_mail: "",
    Password: ""
  })

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

    if (response.data === "Loggedin") {
      alert("Step-1 Verification Success")
      Navigate('/Verificationmail')
    }

    if (response.data === "Invalid") {
      alert("Invalid creditional")
    }
  }

  return (
    <>
      {/* Top Grid */}

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
                <div class="col-lg-6 col-md-6 col-sm-12  d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                  <button class="btn btn-info  " type="submit" disabled={isSubmitting}>
                    Log In
                  </button>
                </div> <br></br>
                <div class="col-lg-6 col-md-6 col-sm-12  d-flex justify-content-center d-flex align-self-lg-center mt-lg-0 mt-md-3 mt-sm-5 ">
                  <button class="btn btn-secondary" type="button" onClick={() => Navigate('/forgotpassword')} disabled={isSubmitting}>
                    Forgot password
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

// function used for step-2 E-mail verification 

function Verification() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    E_mail: "",
  })

  //  Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
    return errors;
  }

  // On submit Function

  var Verification = async (formData) => {
    var response = await axios.post("http://localhost:3002/verification", {
      email: formData.E_mail,
    })

    if (response.data.message === "Sorry Email does not Exist!") {
      alert("Sorry Email does not Exist!")
    }

    if (response.data === "mail_sent") {
      alert("mail sent")
      Navigate('/dashboard')
    }
  }
  return (
    <>

      {/* Top Grid */}

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
    </>
  )
}

// function for changing ur password

function Forgotpassword() {

  const Navigate = useNavigate();

  const [formvalue, setformvalue] = useState({
    E_mail: "",
  })

  //  Formik Error Validation

  const validate = (formData) => {
    var errors = {};
    if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
    return errors;
  }

  // On submit Function

  var Forgotpassword = async (formData) => {
    var response = await axios.post("http://localhost:3002/forgotpass", {
      email: formData.E_mail,

    })

    if (response.data.message === "Sorry Email does not Exist!") {
      alert("Sorry Email does not Exist!")
    }

    if (response.data === "mail_sent") {
      alert("mail sent")
      Navigate('/setnewpassword')
    }
  }

  return (
    <>

      {/* Top Grid */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 text-center mt-5 mt-lg-5 mt-md-5 mt-sm-5">
            <div className="fontstyle3">
              Change Your Password
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
        </Formik>
      </div>
    </>
  )
}

// Function for set new password

function Setnewpassword() {

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
    Navigate('/')
  }

  return (
    <>

      {/* Top Grid */}
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
    </>
  )
}


// Function used for Dashboard Page

function Dashboard() {
  const Navigate = useNavigate();

  // to store datas from user input in text area

  const [input, setinput] = useState();

  const editor = (e) => {
    setinput(e.target.value)
  }

  return (
    <>

      {/* Log Out button */}

      <div class="container-fluid mt-5">
        <div class="row">
          <div class="col-md-12 d-flex justify-content-end">
            <div className="topgrid">
              <Grid container spacing={2}>
                <div>
                  <button class="btn btn-outline-light text-nowrap " id="cartbtn" onClick={() => Navigate('/')} >  Log Out </button>
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <br></br>

      {/* Top Grid */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 ">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ minHeight: "100px" }} className="color">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className=" boxtxt">
                      Markdown Text Editor & Viewer
                    </div>
                    <div className="fontstyle2" style={{ color: "darkblue" }}>
                      Create & Edit Your Markdown Text Here...
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>
      <br></br>

      {/* Markdown Editor */}

      <div class="container" >
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 ">
            <span class="spantext "><b>Markdown Text Editor</b></span>
            <textarea placeholder="Enter text here to convert..." className="textarea  mt-lg-4 mt-md-5 mt-sm-3" value={input} autoFocus onChange={(e) => editor(e)} />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 ">
            <span class=" spantext text-wrap"><b>Converted Markdown Text Viewer</b></span>
            <ReactMarkdown children={input} className='markdown mt-lg-4 mt-md-2 mt-sm-3' components={{
              code: Component,
            }} />
          </div>
        </div>
      </div> <br></br>

      {/* Bottom Grid */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 ">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ minHeight: "80px" }} className="color">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className="fontstyle2">
                      Copyright © Markdown Text Editor & Viewer Website 2022
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

// React Markdown component

const Component = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language ?? null} style={docco}>
      {value ?? ''}
    </SyntaxHighlighter>
  );
};



