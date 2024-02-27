import React, {  useEffect } from "react";
import {  useParams } from "react-router-dom";
import { getDetail } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../navBar/Navbar';

import styles from './detail.module.css';

function DetailPage() {

//obtiene el parametro de la url 
  const { idRaza } = useParams();
  const dogId = idRaza;   

  const stateraza = useSelector((state) => state.detalleRaza);
  const dispatch = useDispatch();




  useEffect(() => {
    dispatch(getDetail(idRaza));
    
  }, [dispatch, idRaza]);

  return (
    <div > 
     
    <div className={`${styles.Card} ${styles.linkStyle}`}>

   
      {stateraza.map(e => (
        <div className="contenedor-detalle-dispel" key={e.ID}>
          <div>
            <h2> breed details</h2>
            <h2>{e.Nombre}</h2>
            <h3>height: {e.Altura} Cm</h3>
            <h3>weight: {e.Peso} Kg</h3>
            <h3>Temperaments: {e.Temperamento}</h3>
            <h3>life: {e.Vida} </h3>
          </div>
          <div >
            <div className={styles.imageDog}><img src={e.Imagen} alt={`Imagen de ${e.Nombre}`} /></div>
          </div>
          <NavBar></NavBar>
          <div className="contenedor-glass-detail"></div>
        </div>
        
      ))}
    </div>
    </div>
  );
}

export default DetailPage;
