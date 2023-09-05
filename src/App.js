
import NavBar from './components/Navbar';
import Textarea from './components/Textarea';
import React, { useState } from 'react'
import Alert from './components/Alert';
import About from './components/About';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {

    const [mode, setMode] = useState('light');
    const [typeAlert, setTypeAlert] = useState(null);


    function updateAlert(msg, type) {
        setTypeAlert(
            {
                "message": msg,
                "alert": type,

            }

        )
        setTimeout(() => {
            setTypeAlert(null);
        }, 4000)




    };



    function updateMode() {

        // updateType("We don't save your personal text & it is secured","danger")


        if (mode === 'dark') {
            setMode('light')
            document.body.style.backgroundColor = '#FFFFFF ';
            updateAlert("Light mode is enable", "primary")


        }
        else {
            setMode('dark')
            document.body.style.backgroundColor = '#013E4D';
            updateAlert("Dark mode is enable", "primary")


        };




    };
    setInterval(() => {
        document.title = "Text Editor"
    }, 2000)

    setInterval(() => {
        document.title = "You are using an amazing Editor"
    }, 4000)

    return (
   
            <Router>


                <NavBar title={"Text Editor"} mode={mode} updateMode={updateMode} />
                <Alert typeAlert={typeAlert} />
                <Routes>
                    <Route exact path="/about" element={<About  mode={mode} />}/>
                   
                    <Route exact path="/"
                    element= {<div className='container my-5'>
                    <Textarea title="Wlcome To text Tool" mode={mode} updateAlert={updateAlert} />
                </div>}/>
                      

                  
                </Routes>


            </Router>

        

    );
}
export default App;
