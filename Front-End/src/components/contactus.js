import React, { useState, useEffect } from "react";
import '../index.css';
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import OutlinedInput from '@mui/material/OutlinedInput'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';


// function for contactus page

export function Contactus() {

    // Navigate function for navigation through pages

    const Navigate = useNavigate();

    // array to store fetched datas from database

    const [array, setarray] = useState({ Product: [] })

    // formik initial value

    const [formvalue, setformvalue] = useState({
        customername: '',
        customercontactno: '',
        productname: '',
        id: '',
    })

    // formik validate function

    const validate = (formData) => {
        var errors = {};
        if (formData.customername == '') errors.customername = 'Customet Name is Required';
        if (formData.customercontactno == '') errors.customercontactno = 'Customer Contact No. is Required';
        if (formData.productname == '') errors.productname = 'Product Name is Required';
        if (formData.Gender == '') errors.Gender = 'Gender is Required';
        return errors;
    };

    // formik submit function

    const submit = async (formData) => {
        //on submit posting datas to database - Create
        var post = await axios.post('https://product-rental-final.herokuapp.com/product/contactus', {
            customername: formData.customername,
            customercontactno: formData.customercontactno,
            productname: formData.productname
        })

        if (post) {
            alert("Query Submitted")
        }

        // pushing fetched datas to array 

        var Product = [...array.Product];
        Product.push(post.data);
        setarray({ Product });
        setformvalue({ customername: '', customercontactno: '', productname: '' })
    }

    return (
        <>

            {/* Dashboard Buttton */}

            <section>
                <div class='container-fluid'>
                    <div class="row mt-3 justify-content-end">
                        <div class="col-lg-2 col-md-2  col-sm-2 col-4 ">
                            <button class="btn btn-outline-secondary" onClick={() => Navigate('/dashboard')} > Dashboard </button>
                        </div>
                    </div>

                    {/* Top Gird */}

                    <div class="row bgcolor rowht mt-3">
                        <div class="col-lg-4 col-md-4 col-sm-6 mt-sm-3 mt-lg-0 mt-md-0 text-start align-self-center">
                            <span >Contact Us For Any Product Related Queries</span>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 mt-sm-3 mt-lg-0 mt-md-0 text-start text-lg-center text-md-center text-sm-start align-self-center" >
                            <span >Contact No:+91-9999999999</span>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 mt-sm-3 mt-lg-0 mt-md-0 text-start text-lg-end text-md-end text-sm-start align-self-center">
                            <span >Contact Mail - XXXXXXX@gmail.com </span>
                        </div>
                    </div>

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
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form className='form' onSubmit={handleSubmit}>

                                {/* Customer Name */}

                                <div class="row mt-3 errorrowht ">
                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-end text-md-end text-sm-end align-self-center" >
                                        <label>Customer Name</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-start text-md-start text-sm-start align-self-center" style={{ display: 'inline-block' }}>
                                        <OutlinedInput placeholder="Please enter customername" type="text"
                                            name="customername"
                                            value={values.customername}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='input1' />
                                    </div>
                                </div>
                                <div class="row mt-1 errorrowht">
                                    <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                                        {touched.customername && errors.customername}
                                    </div>
                                </div>
                                <br></br>

                                {/* Customer Contact No. */}

                                <div class="row mt-3 errorrowht">
                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-end text-md-end text-sm-end align-self-center" >
                                        <label>Customer Contact No.</label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-start text-md-start text-sm-start align-self-center" style={{ display: 'inline-block' }}>

                                        <OutlinedInput placeholder="Please enter customercontactno" type="number"
                                            name="customercontactno"
                                            value={values.customercontactno}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='input2' />

                                    </div>
                                </div>
                                <div class="row mt-1 errorrowht">
                                    <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                                        {touched.customercontactno && errors.customercontactno}
                                    </div>
                                </div>
                                <br></br>

                                {/* Product Name for enquiry */}

                                <div class="row mt-3 errorrowht">
                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-end text-md-end text-sm-end align-self-center" >
                                        <label>Product Name for enquiry</label> &nbsp;
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-start text-md-start text-sm-start align-self-center" style={{ display: 'inline-block' }}>

                                        <OutlinedInput placeholder="Please enter productname" type="text"
                                            name="productname"
                                            value={values.productname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='input3' />

                                    </div>
                                </div>

                                <div class="row mt-1 errorrowht">
                                    <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                                        {touched.productname && errors.productname}
                                    </div>
                                </div>
                                <br></br>

                                {/*Submit button */}

                                <div class="row mt-1 errorrowht">
                                    <div class="col-lg-2 col-md-4  col-sm-2 col-7 mx-auto mt-3 text-center">
                                        <Button type="submit" variant="primary" disabled={isSubmitting} >submit</Button> &nbsp;
                                    </div>
                                </div>
                                <br></br>
                            </form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    )
}