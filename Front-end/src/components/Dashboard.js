import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../index.css';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';




// Function used for Dashboard Page

export function Dashboard() {

    const Navigate = useNavigate();

    // to store datas from user input in text area

    const [input, setinput] = useState();

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    const editor = (e) => {
        setinput(e.target.value)
    }

    return (
        <>

            {/* Log Out button */}
            <section>
                <div class="container-fluid mt-5">
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-end">
                            <div className="topgrid">
                                <Grid container spacing={2}>
                                    <div>
                                        <button class="btn btn-outline-light text-nowrap " id="cartbtn" onClick={() => Navigate('/', { replace: true })} >  Log Out </button>
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
            </section>
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