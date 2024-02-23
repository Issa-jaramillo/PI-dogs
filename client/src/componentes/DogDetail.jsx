import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";  // Asegúrate de importar Axios
import { getDetail } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from './Navbar';

function DetailPage() {
  const stateraza = useSelector((state) => state.detalleRaza);
  const dispatch = useDispatch();
  const { idRaza } = useParams();
  const dogId = idRaza;  // Corrige la desestructuración

  const [imagenUrl, setImagenUrl] = useState('');

  const fetchDogImagen = async () => {
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dogId}`);
      
      // Espera 500 milisegundos (0.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 500));
  
      const image = response.data[0]?.url || '';
      setImagenUrl(image);
  
    } catch (error) {
      console.error('Error al obtener la imagen del perro:', error.message);
    }
  };

  useEffect(() => {
    dispatch(getDetail(idRaza));
    fetchDogImagen();  // Llama a la función para obtener la imagen
  }, [dispatch, idRaza]);

  return (
    <div className="Dogdetail">
      <NavBar title={'Detalle de raza'} />
   
      {stateraza.map(e => (
        <div className="contenedor-detalle-dispel" key={e.ID}>
          <div>
            <h2>{e.Nombre}</h2>
            <h3>Altura: {e.Altura} Cm</h3>
            <h3>Peso: {e.Peso} Kg</h3>
            <h3>Temperamento: {e.Temperamento}</h3>
            <h3>Vida: {e.Vida} </h3>
          </div>
          <div>
            <div className='imageDog'><img src={imagenUrl} alt={`Imagen de ${e.Nombre}`} /></div>
          </div>
          <div className="contenedor-glass-detail"></div>
        </div>
      ))}
    </div>
  );
}

export default DetailPage;
