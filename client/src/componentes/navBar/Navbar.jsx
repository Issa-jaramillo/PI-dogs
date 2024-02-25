import React from 'react';
import { Link } from 'react-router-dom';  
import styles from './nav.module.css'


function Navbar({ title }) {

    return (
        <div>  
            <h1>{title}</h1>
            <Link to="/home">
                <button className={styles.backButton}>Back</button>
                </Link>
          
        </div>
    );
}

export default Navbar;  
