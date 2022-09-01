import React, { useEffect } from "react";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


// function used for login page

export function Login() {

    const Navigate = useNavigate()

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);


    return (
        <>
            {/* Top-Grid */}
            <section>
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

                        <div class=" col-lg-4 col-md-6 col-sm-6 mt-5 mt-lg-0 mt-md-0 mt-sm-5  offset-lg-2 text-center align-self-center mx-auto ">
                            <div class="card ">
                                <div class="card-body   ">
                                    <div class="row">
                                        <div >
                                            <button class="btn btn-info vbtn text-wrap  " onClick={() => Navigate("/userlogin", { replace: true })}>User Login</button>
                                        </div>
                                    </div> <br></br>
                                    <div class="row">
                                        <div>
                                            <button class="btn btn-secondary vbtn text-wrap " onClick={() => Navigate("/LoginAuth", { replace: true })}>New User!</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <br></br><br></br>
                    </div>
                </div>
            </section>
        </>
    );
}