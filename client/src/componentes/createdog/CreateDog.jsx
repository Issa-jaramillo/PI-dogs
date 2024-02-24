import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, createDog } from '../../actions/actions';
import Navbar from '../Navbar';
import Alert from '../Alert';
import styles from './create.module.css';


const CreateDog = () => {
  const dispatch = useDispatch();
  const stateTem = useSelector((state) => state.temperamentos);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [error, setError] = useState({
    nombre: 'Debe contener un nombre',
    alturamin: 'Debe contener una altura mín valida',
    alturamax: 'Debe contener una altura máx valida',
    pesomin: 'Debe contener un peso mín valido',
    pesomax: 'Debe contener un peso máx valido',
    Vidamin: 'Debe contener un tiempo de vida valido',
    Vidamax: 'Debe contener un tiempo de vida valido',
  });

  const [temp, setTemp] = useState([]);
  const [datos, setDatos] = useState({
    nombre: '',
    alturamin: 0,
    alturamax: 0,
    pesomin: 0,
    pesomax: 0,
    vidamin: 0,
    Vidamax: 0,
    temperamentos: [],
  });

  const [alerta, setAlerta] = useState(null);

  const validarCampos = (e) => {
    let error = {};
    if (!e.nombre) {
      error.nombre = 'Debe contener un nombre';
    } else if (!(/^[a-zA-Z]+$/.test(e.nombre))) {
      error.nombre = 'Debe contener solo letras';
    }
    if (!e.alturamin || e.alturamin < 1) {
      error.alturamin = 'Debe contener una altura min valida';
    }
    if (!e.alturamax || e.alturamax < e.alturamin) {
      error.alturamax = 'Deber contener una altura max valida';
    }
    if (!e.pesomin || e.pesomin < 1) {
      error.pesomin = 'Debe contener un peso min valido';
    }
    if (!e.pesomax || e.pesomax < e.pesomin) {
      error.pesomax = 'Debe contener un peso max valido';
    }

    return error;
  };

  const handleOnChange = (e) => {
    setDatos({ ...datos, [e.target.id]: e.target.value });
    setError(validarCampos({ ...datos, [e.target.id]: e.target.value }));
  };

  const handleOnChangeTemp = (e) => {
    let tem = temp.indexOf(e);
    if (tem === -1) {
      setTemp((old) => [...old, e]);
      setDatos({ ...datos, temperamentos: [...datos.temperamentos, e] });
    } else {
      temp.splice(tem, 1);
      setDatos({ ...datos, temperamentos: temp });
    }
  };



const submitDatos = async () => {
  // Validar que al menos un campo está presente antes de intentar crear el perro
  if (
    !datos.nombre.trim() &&
    datos.alturamin === 0 &&
    datos.alturamax === 0 &&
    datos.pesomin === 0 &&
    datos.pesomax === 0 &&
    datos.vidamin === 0 &&
    datos.vidamax === 0 &&
    datos.temperamentos.length === 0
  ) {
    window.alert('Ingresa al menos un dato para crear el perro.');
    return;
  }

  const validationErrors = validarCampos(datos);

  if (Object.keys(validationErrors).length > 0) {
    window.alert('Hay errores en los datos. Por favor, verifica el formulario.');
  } else {
    try {
      await dispatch(createDog(datos));
      window.alert('¡Perro creado correctamente!');
      // Limpia los campos después de un envío exitoso
      setDatos({
        nombre: '',
        alturamin: 0,
        alturamax: 0,
        pesomin: 0,
        pesomax: 0,
        vidamin: 0,
        vidamax: 0,
        temperamentos: [],
      });
      setTemp([]);
    } catch (error) {
      console.error('Error al crear el perro:', error);
      window.alert('Error al crear el perro. Por favor, intenta nuevamente.');
    }
  }
};



  return (
    <div className={styles.Card}>
      <Navbar title={'Crear perro'} />
      {alerta && <Alert type={alerta.type} message={alerta.message} />}

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitDatos();
          }}
          method="post"
        >
          <div>
            <div>
              <label htmlFor="nombre">Nombre de la raza:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Nombre de la raza" value={datos.nombre} onChange={handleOnChange} />
            </div>

            <div>
              <label>Altura (cm): </label>
              <br />
              <input type="number" id="alturamin" name="alturamin" placeholder="Alturamin" value={datos.alturamin} onChange={handleOnChange} />
              <input type="number" id="alturamax" name="alturamax" placeholder="Altura máxima" value={datos.alturamax} onChange={handleOnChange} />
            </div>

            <div>
              <label>Peso (kg): </label>
              <br />
              <input type="number" id="pesomin" name="pesomin" placeholder="Peso mínimo" value={datos.pesomin} onChange={handleOnChange} />
              <input type="number" id="pesomax" name="pesomax" placeholder="Peso máximo" value={datos.pesomax} onChange={handleOnChange} />
            </div>

            <div>
              <div>
                <label htmlFor="temperamento">Seleccione los temperamentos:</label>
                <select name="temperamento" id="temperamento" title="Selecciona el temperamento" onChange={(e) => handleOnChangeTemp(e.target.value)}>
                  {stateTem.map((temp) => (
                    <option value={temp.Nombre} key={temp.ID}>{temp.Nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <textarea id="textarea" value={temp} disabled>Write something here</textarea>
              </div>
              <label htmlFor="vida">Tiempo de vida (Years): </label>
              <br />
              <div>
                <input type="number" id="vida" name="vida" placeholder="Tiempo de vida" value={datos.vida} onChange={handleOnChange} className="input-vida" />
              </div>
            </div>

            <div>
              <input type="submit" value="Enviar" className="boton-createdog" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;
