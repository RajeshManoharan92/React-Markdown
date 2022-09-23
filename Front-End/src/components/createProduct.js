import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik } from "formik";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl';
import { Table } from 'react-bootstrap'

// function for Create ProductName

export function Createproduct() {

    const Navigate = useNavigate()

    //  function to store the datas

    const [array, setarray] = useState({ Product: [] })

    //  function to re render useeffect

    const [counter, setcounter] = useState(0)

    const ele = useRef()

    // function to store formik datas

    const [formvalue, setformvalue] = useState({
        _id: '',
        ProductName: "",
        Productcompany: "",
        Productprice: "",
        minHours: "",
        minPrice: "",
        image: "",
    })

    // // useEffect to get datas on page load

    useEffect(
        () => {
            data()
        }, [counter])

    const data = async () => {
        var response = await axios.get('https://product-rental-final.herokuapp.com/product/getproducts')
        setarray({ Product: response.data })
    }

    // useEffect used to clear history to avoid browser back button

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // formik errors

    const validate = (formData) => {
        var errors = {};
        if (formData.ProductName == '') errors.ProductName = 'ProductName is Required';
        if (formData.Productcompany == '') errors.Productcompany = 'Productcompany is Required';
        if (formData.Productprice == '') errors.Productprice = 'Productprice is Required';
        if (formData.minHours == '') errors.minHours = 'minHours is Required';
        if (formData.minPrice == '') errors.minPrice = 'minPrice is Required';
        if (formData.image == '') errors.image = 'image is Required';
        return errors;
    };

    //   function for onsubmit 

    const submit = async (formData) => {

        if (formvalue._id) {
            //Update
            var response = await axios.put(`https://product-rental-final.herokuapp.com/product/updateproduct/${formvalue._id}`,
                {
                    ProductName: formData.ProductName,
                    Productcompany: formData.Productcompany,
                    Productprice: formData.Productprice,
                    minHours: formData.minHours,
                    minPrice: formData.minPrice,
                    image: formData.image,

                })

            var index = array.Product.findIndex((row) => row._id === formvalue._id)
            var Product = [...array.Product]
            Product[index] = response.data
            setarray({ Product })
            setformvalue({ ProductName: '', Productcompany: "", Productprice: "", minHours: '', minPrice: '', image: "" })
            setcounter(counter + 1)
            var btn = document.querySelector("#createbtn")
            btn.innerHTML = "Create"
            alert('updated successfully')
        }

        else {
            //Create
            var post = await axios.post('https://product-rental-final.herokuapp.com/product/createproducts', {
                ProductName: formData.ProductName,
                Productcompany: formData.Productcompany,
                Productprice: formData.Productprice,
                minHours: formData.minHours,
                minPrice: formData.minPrice,
                image: formData.image,
                Quantity: "",
                Hours: "",
                TotalAMount: ""
            })
            var Product = [...array.Product];
            Product.push(post.data);
            setarray({ Product });
            await setformvalue({ ProductName: '', minHours: '', minPrice: '', image: "" })
            alert('created successfully')
        }
    }

    //  function for update

    const Update = async (_id) => {
        //Edit Button - Populating Data on Input Field
        var selectedData = await array.Product.filter((row) => row._id == _id)[0]
        await setformvalue({
            ProductName: selectedData.ProductName,
            Productcompany: selectedData.Productcompany,
            Productprice: selectedData.Productprice,
            minHours: selectedData.minHours,
            minPrice: selectedData.minPrice,
            image: selectedData.image,
            _id: selectedData._id
        })

        ele.current.innerHTML = "Update"
        // to move to top of page after clicking Add to Cart Button 

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    //  function for delete

    const Delete = (_id) => {
        var result = window.confirm("Are you sure to delete?");
        if (result) {
            //Deleting data from table
            var response = axios.delete(`https://product-rental-final.herokuapp.com/product/deleteproduct/${_id}`)
            var Product = array.Product.filter((row) => row._id !== _id)
            setarray({ Product })
        }
    }

    return (
        <>
            {/* Admin Page button */}

            <div class="container bgcolor">
                <div class="row justify-content-end">
                    <div class="col-lg-2 col-md-3 col-6 col-sm-12 mt-3">
                        <button class="btn btn-outline-light" onClick={() => Navigate('/admin')} >  Admin Page </button>
                    </div>
                </div>

                {/* Top Grid */}

                <div class="row mt-4">
                    <div class="col-12 " >
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar class="text-center" style={{ backgroundColor: "rgb(79, 6, 79)", minHeight: "35px", fontSize: "23px" }} >
                                    Create / Read / Edit / Delete Your ProductName
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </div>
                </div>

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

                            {/* Product Name Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <label>Product Name</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <div className='input1' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter ProductName" type="text"
                                                    name="ProductName"
                                                    value={values.ProductName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input1'
                                                    style={{ color: "white" }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.ProductName && errors.ProductName}
                                    </span>
                                </div>
                            </div>

                            {/* Product Company Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <label>Product Company</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <div className='input1' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter Productcompany" type="text"
                                                    name="Productcompany"
                                                    value={values.Productcompany}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input1'
                                                    style={{ color: "white" }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.Productcompany && errors.Productcompany}
                                    </span>
                                </div>
                            </div>

                            {/* Productprice Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <label>Product price</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <div className='input1' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter Productprice" type="text"
                                                    name="Productprice"
                                                    value={values.Productprice}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input1'
                                                    style={{ color: "white" }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.Productprice && errors.Productprice}
                                    </span>
                                </div>
                            </div>

                            {/* minHours Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <label>Min Hours</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <div className='input2' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter minHours" type="number"
                                                    name="minHours"
                                                    value={values.minHours}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input2' style={{ color: "white" }} />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.minHours && errors.minHours}
                                    </span>
                                </div>
                            </div>

                            {/* minPrice Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <label>Min Price</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <div className='input3' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter minPrice" type="number"
                                                    name="minPrice"
                                                    value={values.minPrice}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input3' style={{ color: "white" }} />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.minPrice && errors.minPrice}
                                    </span>
                                </div>
                            </div>

                            {/* image Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <label>Image Source</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <div className='input3' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter image" type="text"
                                                    name="image"
                                                    value={values.image}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input3' style={{ color: "white" }} />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12 col-12 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.image && errors.image}
                                    </span>
                                </div>
                            </div>

                            {/* create button */}

                            <div class="row mt-5 " style={{ height: "50%" }}>
                                <div class="col-lg-2 col-md-3 col-6 col-sm-12 mx-auto">
                                    <button type="submit" id="createbtn" ref={ele} class="btn btn-outline-light"
                                        style={{ backgroundColor: "rgb(79, 6, 79)", borderRadius: "5px", color: "white" }} disabled={isSubmitting} >
                                        create</button> &nbsp;
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>

                {/* Table */}

                <div class="row mt-3 " style={{ height: "50%" }}>
                    <div class="col-12 text-center  table-responsive">
                        <Table striped bordered hover variant="light" border='1'>
                            <thead>
                                <tr>
                                    <th> Sl No. </th>
                                    <th> Product Name </th>
                                    <th> Product Company </th>
                                    <th> Product Price </th>
                                    <th> Min - Hours </th>
                                    <th> Min - Price </th>
                                    <th> Image </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody class="align-self-center">
                                {array.Product.map((row) => (
                                    <tr key={row.id}>
                                        <td> </td>
                                        <td> {row.ProductName} </td>
                                        <td> {row.Productcompany} </td>
                                        <td> {row.Productprice} </td>
                                        <td> {row.minHours} </td>
                                        <td> {row.minPrice} </td>
                                        <td> {row.image} </td>
                                        <td > <button class="editbtn btn btn-primary" onClick={() => Update(row._id)} >Edit</button> &nbsp;
                                            <button class="editbtn btn btn-secondary" onClick={() => Delete(row._id)} >Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}