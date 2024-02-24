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
    <h1 className={styles.heading}>   𝓱𝓸𝓵𝓪, 𝓫𝓲𝓮𝓷𝓿𝓮𝓷𝓲𝓭𝓸𝓼 𝓪 𝓶𝓲 𝓹𝓻𝓸𝔂𝓮𝓬𝓽𝓸 𝓭𝓮 𝓹𝓮𝓻𝓻𝓸𝓼</h1>
    <p  className={styles.heading}> 𝓵𝓸𝓼 𝓶𝓮𝓳𝓸𝓻𝓮𝓼 𝓪𝓶𝓲𝓰𝓸𝓼 𝓭𝓮𝓵 𝓼𝓮𝓻 𝓱𝓾𝓶𝓪𝓷𝓸!!! 🤎 </p>
    <p className={styles.heading}>  ¡𝓟𝓞𝓝 𝓣𝓤 𝓗𝓤𝓔𝓛𝓛𝓘𝓣𝓐 𝓐𝓠𝓤Í !</p>
        <button className={styles.button} onClick={handleEnter}>🐾</button>
    </div>
    )
}
export default Inicio;