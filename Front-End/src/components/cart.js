import React, { useState, useEffect, useRef } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../index.css';
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAuth } from "../auth";


// Function used for cart page

export function Cart() {

    // calling navigation function for navigation purpose

    const Navigate = useNavigate();

    const auth = useAuth()

    // array to store fetched datas

    const [array, setarray] = useState({ Product: [] })
    const [counter, setcounter] = useState(0)

    var ele1 = useRef()
    var ele2 = useRef()
    var ele3 = useRef()
    var ele4 = useRef()

    const userid = localStorage.getItem("userid")
    const adminid = localStorage.getItem("adminid")

    // array to store form values

    const [formvalue, setformvalue] = useState({
        Quantity: "",
        FromDate: "",
        ToDate: "",
        _id: ''
    })

    // using useEffect to load datas on page load

    useEffect(
        () => {
            res();
        }, [counter])

    const res = async () => {
        if(userid){
            var response = await axios.get(`https://product-rental-final.herokuapp.com/product/getuserbyid/${userid}`);
            setarray({ Product: response.data.user.blogs })
            
        }
        else if(adminid){
            var response = await axios.get('https://product-rental-final.herokuapp.com/product/get');
            setarray({ Product: response.data.user })
        }
      
    }

    // validate functions used by formik for validation & error throwing purpose

    const validate = (formData) => {
        var errors = {};
        if (formData.Quantity == '') errors.Quantity = 'Quantity is Required';
        if (formData.FromDate == '') errors.FromDate = 'From Date is Required';
        if (formData.ToDate == '') errors.ToDate = 'To Date is Required';
        return errors;
    };

    // function used for updating datas to database on Add/Edit Button click

    const Update = async (_id) => {

        //getting values from textfield to update

        var valQ = ele1.current.value
        var FDate = ele2.current.value
        var TDate = ele3.current.value

        // if textfield is empty on Add/Edit Button click following if condtion work & through alert to user to fill the datas

        if (!FDate, !TDate, !valQ) {
            alert('Please Enter Quantity & Date Details, After entering click Add/Edit Button To Add')
        }

        // if user entered data on text field and by clicking Add/Edit button following else condtion works to update data on database

        else {

            //filtering datas to get datas on which row user click Add/Edit button -

            var selectedData = await array.Product.filter((row) => row._id == _id)[0]

            //Update

            if(userid){
                var response = await axios.put(`https://product-rental-final.herokuapp.com/product/update/${_id}`,
                {
                    Productcompany: selectedData.Productcompany,
                    Productprice: selectedData.Productprice,
                    Quantity: valQ,
                    TotalAMount: valQ * selectedData.Productprice,
                    FromDate: FDate,
                    ToDate: TDate,
                })
            }

            else if (adminid){
                var response = await axios.put(`https://product-rental-final.herokuapp.com/product/updateadminproduct/${_id}`,
                {
                    Productcompany: selectedData.Productcompany,
                    Productprice: selectedData.Productprice,
                    Quantity: valQ,
                    TotalAMount: valQ * selectedData.Productprice,
                    FromDate: FDate,
                    ToDate: TDate,
                })
            }
            setformvalue({ Quantity: '', FromDate: "", ToDate: "" })
            setcounter(counter+1)
        }
    }

    // Delete function used to delete datas from database on clicking Remove from cart

    const Delete = async (_id) => {
        //Deleting data from table

        if(userid){
            var result = window.confirm("Are you sure to Remove?");
            if (result) {
                var response = await axios.delete(`https://product-rental-final.herokuapp.com/product/delete/${_id}`)
                var Product = array.Product.filter((row) => row._id !== _id)
                setarray({ Product })
    
                if (response) {
                    alert("Product Removed")
                }
            }
        }

        else if (adminid) {
            var result = window.confirm("Are you sure to Remove?");
            if (result) {
                var response = await axios.delete(`https://product-rental-final.herokuapp.com/product/deleteadmindata/${_id}`)
                var Product = array.Product.filter((row) => row._id !== _id)
                setarray({ Product })
    
                if (response) {
                    alert("Product Removed")
                }
            }
        }

    
    }

    // formik submit function

    const submit = (e) => {
        e.preventDefault()
    }

// checkout button function

    const checkout = () => {
        const table = ele4.current
        const tds = table.querySelectorAll('td')
    
        for (var i = 0; i < tds.length; i++) {
            if (tds[i].innerHTML == "") {
                alert("Please fill all details in table")
                return
            }
        }
        Navigate('/razorpay')
    }

//  to set new date

    var dateInput = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));

    return (
        <>

            {/* Home Button */}

            <section>
                <div class="container-fluid">
                    <div class="row mt-3 justify-content-end">
                        <div class="col-lg-2 col-md-3  col-sm-2 col-6">
                            <button class="btn btn-outline-secondary" onClick={() => Navigate('/dashboard')} >  Dashboard </button>
                        </div>
                    </div>

                    {/* Top Grid */}

                    <div class="row mt-3">
                        <div class="col-12">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ height: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                                                Check Out Page
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>
                    <br></br>

                    {/* Formik */}

                    <Formik
                        enableReinitialize
                        initialValues={formvalue}
                        validate={(formData) => validate(formData)}
                        onSubmit={(formData) => submit(formData)}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        }) => (
                            <form className='form' onSubmit={handleSubmit}>

                                {/* Quantity text field */}

                                <div class="row mt-1">
                                    <div class="col-12 text-center">
                                        <div >
                                            <span style={{ color: 'red' }}>*</span>&nbsp;
                                            <div className='input1' style={{ display: 'inline-block' }}>
                                                <div>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text id="basic-addon1">Quantity</InputGroup.Text>
                                                        <Form.Control
                                                            placeholder="Please enter Quantity" ref={ele1} type="text"
                                                            name="Quantity"
                                                            value={values.Quantity}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className='ctextQ'
                                                        />
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div class="row mt-1 errorrowht">
                                                <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                                                    <span className='span' style={{ color: 'red' }}>
                                                        {touched.Quantity && errors.Quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>

                                {/* From Date */}

                                <div class="row mt-1">
                                    <div class="col-12 text-center">
                                        <div>
                                            <label><span style={{ color: 'red' }}>*</span></label> &nbsp;
                                            <div className='input2' style={{ display: 'inline-block' }}>
                                                <div>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text id="basic-addon1">From Date</InputGroup.Text>
                                                        <Form.Control
                                                            placeholder="Please enter FromDate" ref={ele2} id="start-date" min={dateInput} max="30-12-2023" type="datetime-local"
                                                            name="FromDate"
                                                            value={values.FromDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className='cinputFrom'
                                                        />
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div class="row mt-1 errorrowht">
                                                <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                                                    <span className='span' style={{ color: 'red' }}>
                                                        {touched.FromDate && errors.FromDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>

                                {/* To Date */}

                                <div class="row mt-1">
                                    <div class="col-12 text-center">
                                        <div>
                                            <span style={{ color: 'red' }}>*</span>&nbsp;
                                            <div className='input3' style={{ display: 'inline-block' }}>
                                                <div>

                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text id="basic-addon1">To Date</InputGroup.Text>
                                                        <Form.Control
                                                            placeholder="Please enter ToDate" ref={ele3} min={dateInput} max="30-12-2023" type="datetime-local"
                                                            name="ToDate"
                                                            value={values.ToDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className='cinputTo'
                                                        />
                                                    </InputGroup>

                                                </div>
                                            </div>
                                            <div class="row mt-1 errorrowht">
                                                <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                                                    <span className='span' style={{ color: 'red' }}>
                                                        {touched.ToDate && errors.ToDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                            </form>
                        )}
                    </Formik>

                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <p className="p"><span style={{ color: 'red' }}>*</span> Please Enter Quantity & Date, After Click Add/Edit Button in Table To Add Data in Table</p>
                        </div>
                    </div>

                    {/* Table */}

                    <div class="row">
                        <div class="col-12 table-responsive text-center align-self-center">
                            <Table ref={ele4} striped bordered hover variant="primary" border='1'>
                                <thead>
                                    <tr>
                                        <th> Sl. No </th>
                                        <th> Product Name </th>
                                        <th> Product company </th>
                                        <th> Product price </th>
                                        <th> Quantity </th>
                                        <th>Total Amount</th>
                                        <th> From Date </th>
                                        <th> To Date</th>
                                        <th> Actions </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {array.Product.map((row) => (
                                        <tr key={row.id}>
                                            <td>.</td>
                                            <td> {row.ProductName} </td>
                                            <td> {row.Productcompany} </td>
                                            <td> {row.Productprice} </td>
                                            <td> {row.Quantity}</td>
                                            <td>{row.TotalAMount}</td>
                                            <td>{row.FromDate}</td>
                                            <td>{row.ToDate}</td>
                                            <td> <button class="btn btn-primary editbtn" onClick={() => Update(row._id)} >Add/Edit Date & Quantity</button> &nbsp;
                                                <button class="btn btn-secondary editbtn" onClick={() => Delete(row._id)} >Remove From Cart</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <div class="row mt-3 mb-4 justify-content-center">
                        <div class="col-lg-2 col-md-3  col-sm-2 col-5">
                            <button id="rzp-button1" onClick={() => checkout()} class="btn btn-outline-success" >CheckOut</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}