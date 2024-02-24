import React, { useEffect, useState } from "react";
import axios from 'axios';  
import { Link } from 'react-router-dom';
import styles from './dogs.module.css';

const DogsCards = ({ id, nombre, temperamentos, pesomax, pesomin}) => {
  const dogId = id;
  const [imagenUrl, setImagenUrl] = useState('');



  useEffect(() => {
    const fetchDogImagen = async () => {
      try {
        const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dogId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        const image = response.data[0]?.url || '';
        setImagenUrl(image);
      } catch (error) {
        console.error('Error al obtener la imagen del perro:', error.message);
      }
    };

    fetchDogImagen();
  }, [dogId]);

  return (
    <div key={id}>
      <div className={`${styles.Card} ${styles.linkStyle}`}>
        <Link to={`/dogDetail/${id}`}>
          <h4>Nombre: {nombre}</h4>
        </Link>
        <h4>Peso: {pesomin} - {pesomax} kg</h4>
        <h4>Temperamento: {temperamentos}</h4>
        <div className={styles.imageDog}><img src={imagenUrl} alt={`Imagen de ${nombre}`} /></div>
      </div>
   
    </div>
  );
};

export default DogsCards;
