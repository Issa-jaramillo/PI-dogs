import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
    const navigate = useNavigate();
   
    const handleEnter = () => {
      navigate('/home')
    }

    return (
         <div>
    <h1> Bienvenidos a mi pagina sobre DOGS</h1>
        <button onClick={handleEnter}>Ingresar</button>
    </div>
    )
}
export default Inicio;