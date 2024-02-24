import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";  
import { getDetail } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

import styles from './detail.module.css';

function DetailPage() {

//obtiene el parametro de la url 
  const { idRaza } = useParams();
  const dogId = idRaza;  //corrigo el nombre de la variable para mayor claridad  

  const stateraza = useSelector((state) => state.detalleRaza);
  const dispatch = useDispatch();

// estado para almacenar la URL de la imagen  
  const [imagenUrl, setImagenUrl] = useState('');



//obtiene la imagen del perro de una API externa usando axios 
  const fetchDogImagen = async () => {
    try {
//realizar una solicitud GET a la api de dog con el ID de la raza       
      const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dogId}`);
      
// Espera 500 milisegundos 
      await new Promise(resolve => setTimeout(resolve, 500));

//extraer la url de la imagen de la respuesta de la api o establecer una cadena vacia si no esta disponible   
      const image = response.data[0]?.url || '';
      setImagenUrl(image);
  
    } catch (error) {
      console.error('Error al obtener la imagen del perro:', error.message);
    }
  };

// despacHa una accion y obtiene la informacion detallada del perro y su imagen
  useEffect(() => {
    dispatch(getDetail(idRaza));
    fetchDogImagen();  // Llama a la función para obtener la imagen
  }, [dispatch, idRaza]);

  return (
    
    <div className={`${styles.Card} ${styles.linkStyle}`}>

   
      {stateraza.map(e => (
        <div className="contenedor-detalle-dispel" key={e.ID}>
          <div>
            <h2>{e.Nombre}</h2>
            <h3>Altura: {e.Altura} Cm</h3>
            <h3>Peso: {e.Peso} Kg</h3>
            <h3>Temperamento: {e.Temperamento}</h3>
            <h3>Vida: {e.Vida} </h3>
          </div>
          <div >
            <div className={styles.imageDog}><img src={imagenUrl} alt={`Imagen de ${e.Nombre}`} /></div>
          </div>
          <div className="contenedor-glass-detail"></div>
        </div>
      ))}
    </div>
  );
}

export default DetailPage;
