import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../index.css';
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';


//Function for Enquiry Details

export function Enquirydetails() {

    const Navigate = useNavigate()

    const [array, setarray] = useState({ Product: [] })

    // using useEffect hooks to load data on page load

    useEffect(
        () => {
            result();
        }, [])

    var result = async () => {
        var response = await axios.get('https://product-rental-final.herokuapp.com/product/getcontactusdetails')
        setarray({ Product: response.data })
    }

    const Delete = async (_id) => {

        //Deleting data from table

        var result = window.confirm("Are you sure to delete?");
        if (result) {
            var response = await axios.delete(`https://product-rental-final.herokuapp.com/product/deleteenquiry/${_id}`)
            var Product = array.Product.filter((row) => row._id !== _id)
            setarray({ Product })
        }
    }

    return (
        <>

            {/* Admin Page Button */}

            <section>
                <div class="container-fluid">
                    <div class="row mt-3 justify-content-end">
                        <div class="col-lg-2 col-md-3 col-6 col-sm-12 ">
                            <button class="btn btn-outline-secondary" onClick={() => Navigate('/admin')} >  Admin Page </button>
                        </div>
                    </div>

                    {/* Top Gird */}

                    <div class="row mt-3">
                        <div class="col-12">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ height: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                                                Customer Enquiry Details
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>
                    <br></br>

                    {/* Table */}

                    <div class="row mt-2">
                        <div class="col-12 table-responsive text-center">
                            <Table striped bordered hover variant="primary" border='1'>
                                <thead>
                                    <tr>
                                        <th>Sl No. </th>
                                        <th> Customer Name </th>
                                        <th> Customer Contact no. </th>
                                        <th> Product Name for Enquiry </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {array.Product.map((row) => (
                                        <tr key={row.id}>
                                            <td></td>
                                            <td> {row.customername} </td>
                                            <td> {row.customercontactno} </td>
                                            <td> {row.productname} </td>
                                            <td> <button class="btn btn-primary" onClick={() => Delete(row._id)} >Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}