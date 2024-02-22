import React, { useEffect, useState } from "react";
import axios from 'axios';  // Asegúrate de importar axios
import { Link } from 'react-router-dom';


// Definición del componente funcional DogsCards que toma un objeto dog como prop
const DogsCards = ({ id, nombre, temperamentos, pesomax, pesomin, imagen }) => {
    const dogId = id;
    // Desestructuración del objeto dog para obtener propiedades específicas
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

    // Renderización del componente
    return (
        <div className="Card-dog" key={id}>
  
            <div className='info'>
                <Link to={`/dogDetail/${id}`}>
                    <h4>Nombre: {nombre}</h4>
                </Link>
                <h4>Peso: {pesomin} - {pesomax} kg</h4>
                <h4>Temperamento: {temperamentos}</h4>
                <div className='imageDog'><img src={imagenUrl} alt={`Imagen de ${nombre}`} /></div>
            </div>
        </div>
    );
};

// Exportación del componente DogsCards
export default DogsCards;
