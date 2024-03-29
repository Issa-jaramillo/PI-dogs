import axios from 'axios';
import {
  OBTENER_DOGS,
  OBTENER_TEMPERAMENTOS,
  OBTENER_INFO_RAZA,
  FILTRAR_RAZA,
  FILTRAR_TEMPERAMENTO,
  ORDENAR_PESO,
  CREAR_DOG,
  ORDENAR_ALFABETICO,
  FILTRAR_ORIGEN
} from './actionsTypes';



const apiUrl = 'http://localhost:3001';


export function getAllDogs() {
  return async function (dispatch) {
    try {
      const response = await fetch(`${apiUrl}/dogs`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const json = await response.json();

      dispatch({ type: OBTENER_DOGS, payload: json });
    } catch (error) {
      console.error('Error al obtener las razas de perros:', error);
      dispatch({ type: OBTENER_DOGS, payload: error });
    }
  };
}


export function getDogsByName(dogname) {
  return async function (dispatch) {
    try {
      let url = `${apiUrl}/dogs/name?Name=${dogname}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const json = await response.json();

      dispatch({ type: OBTENER_DOGS, payload: json });
    } catch (error) {
      console.error('Error al obtener las razas de perros por nombre:', error);
      dispatch({ type: OBTENER_DOGS, payload: error });
    }
  };
}
  

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const response = await fetch(`${apiUrl}/temperaments`);
      const json = await response.json();

      dispatch({ type: OBTENER_TEMPERAMENTOS, payload: json });
      return json;
    } catch (error) {
      console.error('Error al obtener los temperamentos:', error);
    }
  };
}


export function getDetail(idRaza) {
  return async function (dispatch) {
    try {
      if (idRaza) {
       
        const response = await fetch(`${apiUrl}/dogs/${idRaza}`);
        if (!response.ok) {
          throw new Error('Error al obtener la información de la raza');
        }

        const json = await response.json();
       // console.log("Response from server:", json);
        dispatch({ type: OBTENER_INFO_RAZA, payload: json });
      } else {
        throw new Error('ID de raza no proporcionado');
      }
    } catch (error) {
      console.error('Error en la acción getDetail:', error);
      dispatch({ type: OBTENER_INFO_RAZA, payload: error.message });
    }
  };
}

export function filteredTemperament(temperamento) {
  return { type: FILTRAR_TEMPERAMENTO, payload: temperamento };
}

// export function filterRaza() {
//   return { type: FILTRAR_RAZA };
// }

export function organizarPorPeso(opcionPeso) {
 
  return { type: ORDENAR_PESO, payload: opcionPeso };
}

export function createDog(attributesDog) {
  return async function (dispatch) {
    try {
      const createdDog = await axios.post(`${apiUrl}/dogs`, attributesDog);

      dispatch({ type: CREAR_DOG, payload: createdDog.data });
      return createdDog;
    } catch (error) {
      console.error('Error al crear el perro:', error.response?.data || error.message);
    }
  };
}

export function organizarAlfabeticamente(optionAlfab) {
  return { type:ORDENAR_ALFABETICO, payload: optionAlfab };
}



export const filtrarOrigen = (origen) => {
  //console.log( origen);
  return {
  type: FILTRAR_ORIGEN,
  payload: origen,
  };
}
