import React, { useState, useEffect, useRef } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRupeeSign } from 'react-icons/fa';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../auth";
import Card from 'react-bootstrap/Card'


// Function used for Dashboard Page

export function Dashboard({ children }) {

    const Navigate = useNavigate();

    // to store datas array used

    const [array, setarray] = useState({ Product: [] })

    // const [btn, setbtn] = useState(true)

    //  function to re render useeffect

    const [counter, setcounter] = useState(0)

    const [cart, setcart] = useState(0)

    const auth = useAuth();

    const username = localStorage.getItem("username")

    const adminname = localStorage.getItem("adminname")

    const userid = localStorage.getItem("userid")

    const adminid = localStorage.getItem("adminid")

    // to store cartvalue  

    const [cartvalue, setcartvalue] = useState(0)


    // using useEffect to get cart count on page load

    useEffect(
        () => {
            cartcount();
        }, [cart])


    var cartcount = async () => {
        if (userid) {
            var response = await axios.get(`https://product-rental-final.herokuapp.com/product/gettotalproductcount/${userid}`)
            setcartvalue(response.data.user.length)
        }
        else if (adminid) {
            var response = await axios.get('https://product-rental-final.herokuapp.com/product/get')
            setcartvalue(response.data.user.length)
        }
    }

    // using useEffect to get product data on page load

    useEffect(
        () => {
            data()
        }, [counter])

    const data = async () => {
        var response = await axios.get('https://product-rental-final.herokuapp.com/product/getproducts')
        setarray({ Product: response.data })
    }

    // below function used for posting datas during Add to cart button pressed

    const IncreaseValue = async (id) => {

        var selectedData = await array.Product.filter((row) => row._id == id)[0]

        // Posting datas on database

        if (userid) {
            var post = await axios.post('https://product-rental-final.herokuapp.com/product/post', {
                name: "user",
                user: userid,
                ProductName: selectedData.ProductName,
                Productcompany: selectedData.Productcompany,
                Productprice: selectedData.Productprice,
                minHours: selectedData.minHours,
                minPrice: selectedData.minPrice,
                image: selectedData.image,

            })

        }

        else if (adminid) {
            var post = await axios.post('https://product-rental-final.herokuapp.com/product/post', {
                name: "admin",
                user: adminid,
                ProductName: selectedData.ProductName,
                Productcompany: selectedData.Productcompany,
                Productprice: selectedData.Productprice,
                minHours: selectedData.minHours,
                minPrice: selectedData.minPrice,
                image: selectedData.image,
            })

        }

        setcart(cart + 1)

        // to move to top of page after clicking Add to Cart Button 

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // cart button function

    const Cart = async () => {
        if (cartvalue == 0) {
            alert("Please add product to cart")
            return
        }
        Navigate("/Cart")
    }


    // Log out button function

    const Logout = async () => {
        await auth.login("")
        await localStorage.setItem("username", "")
        await localStorage.setItem("adminname", "")
        await localStorage.setItem("userid", "")
        await localStorage.setItem("adminid", "")
        Navigate('/')
    }

    return (
        <>

            <section>
                <div class="container-fluid">
                    <div class="row mt-3">

                        {/* Welcome */}

                        {
                            !adminid ? <>

                                <div class="col-lg-3 col-md-3 col-sm-12 text-center align-self-center">
                                    <span style={{ fontSize: "30px", fontWeight: "bold" }}>Welcome {username}</span>
                                </div>

                                {/* contact us button */}

                                <div class="col-lg-2 col-md-3 col-sm-12 col-6 mx-auto mt-3 mt-lg-0 mt-md-0 mt-sm-3 offset-lg-3  text-center">
                                    <button class="btn btn-outline-secondary" onClick={() => Navigate('/contactus')} >  Contact Us </button>
                                </div>

                                {/* cart button */}

                                <div class="col-lg-2 col-md-3 col-sm-12 text-center col-6 mx-auto mt-3 mt-lg-0 mt-md-0 mt-sm-3">
                                    <button id="cartbtn" class="btn btn-outline-secondary" size="sl"
                                        onClick={() => Cart()}>
                                        <FontAwesomeIcon icon={faShoppingCart} /> Cart <span id="cv" className="Cnum">{cartvalue}</span>
                                    </button>
                                </div>

                                {/* Log Out button */}

                                <div class="col-lg-2 col-md-3 col-sm-12 text-center col-6 mx-auto mt-3 mt-lg-0 mt-md-0 mt-sm-3">
                                    <button class="btn btn-outline-secondary" onClick={() => Logout()} >  Log Out </button>
                                </div>

                            </> : <>

                                <div class="col-lg-3 col-md-3 col-sm-12 text-center mx-auto align-self-center">
                                    <span style={{ fontSize: "30px", fontWeight: "bold" }}>Welcome {adminname}</span>
                                </div>

                                {/* Admin Page button */}

                                <div class="col-lg-2 col-md-4 col-sm-12 text-center offset-lg-2 ms-md-3 col-6 mx-auto mt-3 mt-lg-0 mt-md-0 mt-sm-3">
                                    <button id="cartbtn" class="btn btn-outline-secondary" size="sl"
                                        onClick={() => Navigate('/admin')}>
                                        Admin Page
                                    </button>
                                </div>

                                {/* contact us button */}

                                <div class="col-lg-2 col-md-4 col-sm-12 mt-3 mt-lg-0 mt-md-0 mt-sm-3 ms-md-4 col-6 mx-auto  text-center">
                                    <button class="btn btn-outline-secondary" onClick={() => Navigate('/contactus')} >  Contact Us </button>
                                </div>

                                {/* cart button */}

                                <div class="col-lg-2 col-md-5 col-sm-12 text-center col-6 mx-auto ms-md-4 mt-3 mt-lg-0 mt-md-0 mt-sm-3">
                                    <button id="cartbtn" class="btn btn-outline-secondary" size="sl"
                                        onClick={() => Cart()}>
                                        <FontAwesomeIcon icon={faShoppingCart} /> Cart <span id="cv" className="Cnum">{cartvalue}</span>
                                    </button>
                                </div>

                                {/* Log Out button */}

                                <div class="col-lg-2 col-md-5 col-sm-12 text-center col-6 mx-auto ms-md-4 mt-3 mt-lg-0 mt-md-0 mt-sm-3">
                                    <button class="btn btn-outline-secondary" onClick={() => Logout()} >  Log Out </button>
                                </div>

                            </>
                        }

                    </div>
                    <br></br>

                    {/* Top Grid */}

                    <div class="row">
                        <div class="col-12">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ height: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div style={{ fontSize: "5vw", fontWeight: "bold" }}>
                                                Products For Rental<br></br>
                                            </div>
                                            <div style={{ fontSize: "1.5vw" }}>
                                                Don't need to buy a product anymore JUST Rent It !!!!
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>
                    <br></br>

                    {/* product cards */}

                    <div class="row justify-content-center mb-5">
                        {
                            array.Product?.map((row) => (

                                <div class="col-lg-3  col-md-3 col-sm-12 mt-5 text-center mx-auto ">
                                    <Card border="secondary" style={{ height: "100%" }} >
                                        <Card.Img class="card-img-top" variant="top" src={row.image} />
                                        <Card.Body class="mb-3 mt-3">
                                            <div class="row" style={{ height: "30%" }}>
                                                <Card.Title>{row.ProductName}</Card.Title>
                                            </div>
                                            <div class="row">
                                                <Card.Subtitle >
                                                    {row.minHours} Hours <FaRupeeSign /> {row.minPrice}
                                                </Card.Subtitle >
                                            </div>
                                            <div class="row  mb-4">
                                                <div class="col-lg-8  col-md-8 col-sm-8 col-8 mt-4  text-center mx-auto">
                                                    <button onClick={(e) => IncreaseValue(row._id)} class="btn btn-outline-secondary"  >Add To Cart</button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Bottom Grid */}

                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar style={{ height: "12vw" }} className="color">
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                <div className="fontstyle2">
                                    Copyright © Product Rental Website 2022
                                </div>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </section>
        </>

    );
}