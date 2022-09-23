import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../index.css';
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


//Function used For payement

export function Razorpay() {

    const Navigate = useNavigate()
    const [array, setarray] = useState({ Product: [] })
    const [cartvalue, setcartvalue] = useState(0)
    var Tamount = [];
    const [finalamount, setfinalamount] = useState(0)
    const userid = localStorage.getItem("userid")
    const adminid = localStorage.getItem("adminid")

    // using useEffect to load data on page load

    useEffect(
        () => {
            res();
        }, [])

    var res = async () => {
        if (userid) {
            var response = await axios.get(`https://product-rental-final.herokuapp.com/product/getuserbyid/${userid}`);
            setarray({ Product: response.data.user.blogs })
            await response.data.user.blogs.map((row) => {
                Tamount.push(parseInt(row.TotalAMount))
            })

            var sum = Tamount.reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            });
            setfinalamount(sum)
        }
        else if (adminid) {
            var response = await axios.get(`https://product-rental-final.herokuapp.com/product/getuserbyid/${adminid}`);
            setarray({ Product: response.data.user.blogs })
        }

    }

    // using useEffect to get data on page load

    useEffect(
        () => {
            cartcount();
        }, [])


    var cartcount = async () => {
        if (userid) {
            var response = await axios.get(`https://product-rental-final.herokuapp.com/product/gettotalproductcount/${userid}`)
            setcartvalue(response.data.user.length)
        }
        else if (adminid) {
            var response = await axios.get(`https://product-rental-final.herokuapp.com/product/gettotalproductcount/${adminid}`)
            setcartvalue(response.data.user.length)
        }

    }

    // functions for razorpay source details

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // functions for razorpay Payment page details

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const options = {
            key: "rzp_test_V7MeZu3JfFTyWS", // Enter the Key ID generated from the Dashboard
            amount: finalamount,
            currency: "INR",
            name: "Rajesh Corp.",
            description: "Test Transaction",
            order_id: "order_KEd6RIC66WwpVK",
            handler: async function (response) {
                const data = {
                    //orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                alert("Payment Succesfull");
                alert("Your Order Placed Succesfully");
            },

            prefill: {
                name: "Rajesh Solutions",
                email: "RajeshSolutions@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            {/* Home Button */}

            <section>
                <div class="container-fluid">
                    <div class="row mt-3 justify-content-end">
                        <div class="col-lg-2 col-md-3  col-sm-2 col-6">
                            <button class="btn btn-outline-secondary" onClick={() => Navigate('/dashboard')} >  Dashboard </button>
                        </div>

                        {/* Cart Button */}

                        <div class="col-lg-2 col-md-3  col-sm-2 col-6">
                            <button class="btn btn-outline-secondary" size="sl"
                                onClick={() => Navigate('/Cart')}>
                                <FontAwesomeIcon icon={faShoppingCart} /> Cart <span id="cv" className="Cnum">{cartvalue}</span> </button>
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
                                                Pay Through Razorpay...
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>

                    {/* Table */}

                    <div class="row mt-4">
                        <div class="col-12 table-responsive text-center">
                            <Table className=" striped bordered hover" variant="primary" border='1'>
                                <thead>
                                    <tr>
                                        <th> Sl. No </th>
                                        <th> Product Name </th>
                                        <th> Product company </th>
                                        <th> Product price </th>
                                        <th> Quantity </th>
                                        <th> From Date </th>
                                        <th> To Date </th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {array.Product?.map((row) => (
                                        <tr key={row.id}>
                                            <td></td>
                                            <td> {row.ProductName} </td>
                                            <td> {row.Productcompany} </td>
                                            <td> {row.Productprice} </td>
                                            <td> {row.Quantity}</td>
                                            <td> {row.FromDate}</td>
                                            <td> {row.ToDate}</td>
                                            <td>{row.TotalAMount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <div class="row mt-4" >
                        <div class="col-12 text-center">
                            <h4>Total Amount = {finalamount}</h4>
                        </div>
                    </div>

                    {/* Pay button */}

                    <div class="row mt-4 justify-content-center" >
                        <div class="col-lg-2 col-md-2  col-sm-2 col-5">
                            <button class="btn btn-outline-success" onClick={displayRazorpay}>
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}