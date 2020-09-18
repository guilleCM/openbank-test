import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  currentStep,
  totalSteps,
} from './../wizardReducer';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { submitForm, HTTP_CODES } from './../../services/api';

import "./styles.scss";

const inputs = [
    {
        name: 'password',
        required: true,
        minLength: 4,
        maxLength: 24,
        validateMethods: {
            containNumber: value => value.match(/\d+/g) !== null,
            containCapital: value => value.match(/[A-Z]/g) !== null,
        }
    },
    {
        name: 'passwordRepeat',
        required: true,
        validateMethods: {
            matchFirstPassword: value => value === document.querySelector('#password').value,
        }
    },
    {
        name: 'passwordHint',
        required: false,
        minLength: 0,
        maxLength: 255
    }
];

function getErrors(inputs) {
    let errors = {};
    inputs.map(input => {
        input.errors = [];
        const inputValue = document.querySelector(`#${input.name}`).value.trim();
        input.value = inputValue;
        if (input.required && inputValue === "") {
            input.errors.push('required');
        }
        if (input.minLength && inputValue.length < input.minLength) {
            input.errors.push('minLength');
        }
        if (input.maxLength && inputValue.length > input.maxLength) {
            input.errors.push('maxLength');
        }
        if (input.validateMethods) {
            const customErrors = Object.getOwnPropertyNames(input.validateMethods).filter(validator => 
                !input.validateMethods[validator](inputValue)
            )
            if (customErrors.length) {
                input.errors = [...input.errors, ...customErrors]
            }
        }
        if (input.errors.length) {
            errors[input.name] = input.errors;
        }
        return input;
    });
    return errors;
}

function Step2() {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState(false);
    const [t] = useTranslation();

    const handleOnSubmit = event => {
        event.preventDefault();
        const errors = getErrors(inputs);
        const hasErrors = Object.keys(errors).length; 
        if (hasErrors) {
            setValidated(true);
            setErrors(errors);
        } else {
            const passwordValue = inputs.filter(input => input.name === 'password')[0].value;
            const passwordRepeatValue = inputs.filter(input => input.name === 'passwordRepeat')[0].value;
            const passwordHint = inputs.filter(input => input.name === 'passwordHint')[0].value;
            submitForm(passwordValue, passwordRepeatValue, passwordHint).then((res) => {
                console.log(res);
                if (res.status === HTTP_CODES.OK) {
 
                }
                else {

                }
            })
            // dispatch(increment());
        }
    }
    useEffect(() => {
        document.querySelector('#password').focus();
    }, [])

    return (
        <Row>
            <Col md={{ span: 10, offset: 1}} lg={{ span: 8, offset: 2}}>
                <h1 style={{marginTop: '1rem'}}>
                    {t('wizard:createNewPasswordTitle')}
                </h1>
                <p>
                {t('wizard:createNewPasswordInfo')}
                </p>
                <Form onSubmit={(event) => handleOnSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="password">
                            <Form.Label><strong>{t('wizard:passwordInputLabel')} *</strong></Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder=""
                                defaultValue=""
                            />
                            <Form.Text id="passwordHelpBlock" muted>
                                <ul>
                                    <li className={!validated || (errors.password && errors.password.includes('minLength')) ? "" : "help-text-validated"}>
                                        Mínimo 4 caracteres
                                    </li>
                                    <li className={!validated || (errors.password && errors.password.includes('maxLength')) ? "" : "help-text-validated"}>
                                        Máximo 24 caracteres
                                    </li>
                                    <li className={!validated || (errors.password && errors.password.includes('containNumber')) ? "" : "help-text-validated"}>
                                        Contiene 1 número
                                    </li>
                                    <li className={!validated || (errors.password && errors.password.includes('containCapital')) ? "" : "help-text-validated"}>
                                        Contiene una mayúscula
                                    </li>
                                </ul>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="passwordRepeat">
                            <Form.Label><strong>{t('wizard:passwordRepeatInputLabel')} *</strong></Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="" 
                                defaultValue=""
                            />
                            <Form.Text id="passwordRepeatHelpBlock" muted>
                                <ul>
                                    <li className={!validated || (errors.passwordRepeat && errors.passwordRepeat.includes('matchFirstPassword')) ? "" : "help-text-validated"}>
                                        La contraseña coincide
                                    </li>
                                </ul>
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="passwordHint">
                            <Form.Label><strong>{t('wizard:passwordHintInputLabel')}</strong></Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                defaultValue=""
                            />
                            <Form.Text id="passwordHintHelpBlock" muted>
                                <ul>
                                    <li>0/255 {t('wizard:passwordHintInputHelp')}</li>
                                </ul>
                            </Form.Text>
                        </Form.Group>
                    <Button 
                        variant="outline-secondary"
                        onClick={() => dispatch(decrement())}
                    >
                            {t('generic:cancel')}
                    </Button>
                    <Button
                        className="float-right"
                        variant="secondary" 
                        type="submit"
                    >
                        {t('generic:next')}
                    </Button>
                </Form>

            </Col>
        </Row>
    );
}

export default Step2;