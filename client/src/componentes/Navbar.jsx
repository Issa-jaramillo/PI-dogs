import React from 'react';
import { Link } from 'react-router-dom';  



function Navbar({ title }) {
    // La función toma un parámetro 'title' que se usará para mostrar el título en la barra de navegación
    return (
        <div>  
            <h1>{title}</h1>
            <Link to="/home"><button>home</button></Link>
          
        </div>
    );
}

export default Navbar;  
