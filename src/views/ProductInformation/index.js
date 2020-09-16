import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './../wizardReducer';
import Row from 'react-bootstrap/Container';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

import logo from './../../assets/img/logo_openbank.png';

function Step1() {
    const step = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('1');
    return (
        <Row>
            <span>Estás en el paso {step} de 3</span>
            <h1>
                Bienvenid@ a la Cuenta Corriente OpenClose de <img src={logo} alt="OpenBank"/> 
            </h1>
            <h3>Antes de empezar</h3>
            <p>
                {`
                Queremos agradecerle que haya depositado su confianza en la Cuenta Corriente OpenClose.
                A continuación le guiaremos en un pequeño formulario para que pueda facilitarnos los datos necesarios
                para completar la contratación. 
                `}
            </p>
            <p>
                {`
                En primer lugar queremos asegurarnos 
                de que acepta que tratemos sus datos según nuestra política de protección de datos que puede
                consultar aquí.
                `}
            </p>
            <FormCheck 
                label="Acepto el uso de mis datos según la política de protección de datos y confirmo que soy mayor de edad"
                type="checkbox"
                style={{
                    paddingBottom: '1rem',
                }}
            />
            
            <Button variant="outline-secondary">Cancelar</Button>{' '}
            <Button variant="secondary" disabled>Siguiente</Button>{' '}

        </Row>
    );
}

export default Step1;