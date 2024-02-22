import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from './Navbar';


function DetailPage() {
  const stateraza = useSelector((state) => state.detalleRaza);
  const dispatch = useDispatch();
  const { idRaza } = useParams();



  useEffect(() => {
    dispatch(getDetail(idRaza));
  }, [dispatch, idRaza]);

  return (
    <div className="Dogdetail">
      <NavBar title={'Detalle de raza'} />
   
      { stateraza.map(e => (
        <div className="contenedor-detalle-dispel" key={e.ID}>
          <div>
            <h2>{e.Nombre}</h2>
            <h3>Altura: {e.Altura} Cm</h3>
            <h3>Peso: {e.Peso} Kg</h3>
            <h3>Temperamento: {e.Temperamento}</h3>
            <h3>Vida: {e.Vida} </h3>
      
          </div>
          <div>
            <img src={e.Imagen} width="350" height="350" alt={e.Nombre} />
          </div>
          <div className="contenedor-glass-detail"></div>
        </div>
      ))}
    </div>
  );
}
export default DetailPage;
