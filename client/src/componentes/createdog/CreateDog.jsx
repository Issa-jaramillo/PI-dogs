import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, createDog } from '../../actions/actions';
import Navbar from '../Navbar';
import styles from './create.module.css';

const CreateDog = () => {
  const dispatch = useDispatch();
  const stateTem = useSelector((state) => state.temperamentos);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [error, setError] = useState({
    Nombre: 'Debe contener un nombre',
    AlturaMin: 'Debe contener una altura mín valida',
    AlturaMax: 'Debe contener una altura máx valida',
    PesoMin: 'Debe contener un peso mín valido',
    PesoMax: 'Debe contener un peso máx valido',
    Vidamin: 'Debe contener un tiempo de vida valido',
    Vidamax: 'Debe contener un tiempo de vida valido',
  });

  const [temp, setTemp] = useState([]);
  const [datos, setDatos] = useState({
    Nombre: '',
    AlturaMin: 0,
    AlturaMax: 0,
    PesoMin: 0,
    PesoMax: 0,
    Vidamin: 0,
    Vidamax: 0,
    Temperamentos: [],
    Imagen: '',
  });

 

  const validarCampos = (e) => {
    let error = {};

    if (!e.Nombre.trim()) {
      error.Nombre = 'Debe contener un nombre';
    }

    if (e.Alturamin <= 0) {
      error.AlturaMin = 'Debe contener una altura mínima válida';
    }

    if (e.Alturamax <= 0 || e.Alturamax <= e.Alturamin) {
      error.AlturaMax = 'Debe contener una altura máxima válida';
    }

    if (e.Pesomin <= 0) {
      error.PesoMin = 'Debe contener un peso mínimo válido';
    }

    if (e.Pesomax <= 0 || e.Pesomax <= e.Pesomin) {
      error.PesoMax = 'Debe contener un peso máximo válido';
    }

    if (e.Vidamin < 0) {
      error.Vidamin = 'Debe contener un tiempo de vida mínimo válido';
    }

    if (e.Vidamax < 0 || e.Vidamax <= e.Vidamin) {
      error.Vidamax = 'Debe contener un tiempo de vida máximo válido';
    }

    if (!e.Imagen.trim()) {
      error.Imagen = 'Debe contener una URL de imagen';
    }

    return error;
  };

  const handleOnChange = (e) => {
    setDatos({ ...datos, [e.target.id]: e.target.value });
    console.log(datos);
    setError(validarCampos({ ...datos, [e.target.id]: e.target.value }));
  };

  const handleOnChangeTemp = (e) => {
    let tem = temp.indexOf(e);
    if (tem === -1) {
      setTemp((old) => [...old, e]);
      setDatos({ ...datos, Temperamentos: [...datos.Temperamentos, e] });
    } else {
      temp.splice(tem, 1);
      setDatos({ ...datos, Temperamentos: temp });
    }
  };

  const submitDatos = async () => {
    // Validar que al menos un campo está presente antes de intentar crear el perro
    if (
      !datos.Nombre.trim() &&
      datos.AlturaMin === 0 &&
      datos.AlturaMax === 0 &&
      datos.PesoMin === 0 &&
      datos.PesoMax === 0 &&
      datos.Vidamin === 0 &&
      datos.Vidamax === 0 &&
      datos.Imagen === '' &&
      datos.Temperamentos.length === 0
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
          Nombre: '',
          AlturaMin: 0,
          AlturaMax: 0,
          PesoMin: 0,
          PesoMax: 0,
          Vidamin: 0,
          Vidamax: 0,
          Imagen: '',
          Temperamentos: [],
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
              <input type="text" id="Nombre" name="nombre" placeholder="Nombre de la raza" value={datos.Nombre} onChange={handleOnChange} />
            </div>

            <div>
              <label>Altura (cm): </label>
              <br />
              <input type="number" id="AlturaMin" name="alturamin" placeholder="Alturamin" value={datos.AlturaMin} onChange={handleOnChange} />
              <input type="number" id="AlturaMax" name="alturamax" placeholder="Altura máxima" value={datos.AlturaMax} onChange={handleOnChange} />
            </div>

            <div>
              <label>Peso (kg): </label>
              <br />
              <input type="number" id="PesoMin" name="pesomin" placeholder="Peso mínimo" value={datos.PesoMin} onChange={handleOnChange} />
              <input type="number" id="PesoMax" name="pesomax" placeholder="Peso máximo" value={datos.PesoMax} onChange={handleOnChange} />
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

              <div>
                <label>Tiempo de vida (años): </label>
                <br />
                <input type="number" id="Vidamin" name="vidamin" placeholder="Tiempo de vida mínimo" value={datos.Vidamin} onChange={handleOnChange} className="input-vida" />
                <input type="number" id="Vidamax" name="vidamax" placeholder="Tiempo de vida máximo" value={datos.Vidamax} onChange={handleOnChange} className="input-vida" />
              </div>
            </div>

            <div>
              <label>URL de la imagen:</label>
              <br />
              <input type="text" id="Imagen" name="imagen" placeholder="URL de la imagen" value={datos.Imagen} onChange={handleOnChange} />
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
