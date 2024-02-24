import React from 'react';
import { Link } from 'react-router-dom';  



function Navbar({ title }) {

    return (
        <div>  
            <h1>{title}</h1>
            <Link to="/home"><button>home</button></Link>
          
        </div>
    );
}

export default Navbar;  
