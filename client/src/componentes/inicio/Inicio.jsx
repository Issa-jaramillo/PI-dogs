import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './inicio.module.css';
const Inicio = () => {
    const navigate = useNavigate();
   
    const handleEnter = () => {
      navigate('/home')
    }

    return (
         <div className={styles.container}>
    <h1 className={styles.heading}> Bienvenidos a mi pagina sobre DOGS</h1>
        <button className={styles.button} onClick={handleEnter}>Ingresar</button>
    </div>
    )
}
export default Inicio;