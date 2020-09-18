import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  isLoading,
  password,
  passwordHint,
  fetchForm
} from './../wizardReducer';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

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
    const loading = useSelector(isLoading);
    const passwordDefaultValue = useSelector(password);
    const passwordHintDefaultValue = useSelector(passwordHint);
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [passwordHintCount, setPasswordHintCount] = useState(passwordHintDefaultValue ? passwordHintDefaultValue.length : 0);
    const inputPassword = inputs.filter(input => input.name === 'password')[0];
    const passwordHintMaxLength = inputs.filter(input => input.name === 'passwordHint')[0].maxLength;
    const [errors, setErrors] = useState(false);
    const [t] = useTranslation();
    const handleOnSubmit = event => {
        event.preventDefault();
        const errors = getErrors(inputs);
        const hasErrors = Object.keys(errors).length; 
        if (hasErrors) {
            setValidated(true);
            setErrors(errors);
            setPasswordHintCount(inputs.filter(input => input.name === 'passwordHint')[0].value.length);
        } else {
            const passwordValue = inputs.filter(input => input.name === 'password')[0].value;
            const passwordRepeatValue = inputs.filter(input => input.name === 'passwordRepeat')[0].value;
            const passwordHintValue = inputs.filter(input => input.name === 'passwordHint')[0].value;
            dispatch(fetchForm({password: passwordValue, passwordRepeat: passwordRepeatValue, passwordHint: passwordHintValue}))
        }
    }
    useEffect(() => {
        document.querySelector('#password').focus();
    }, [])

    return (
        <Row>
            <Col md={{ span: 10, offset: 1}} lg={{ span: 8, offset: 2}}>
                {!loading ?
                    <>
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
                                        defaultValue={passwordDefaultValue || ''}
                                        isInvalid={validated && errors.password !== undefined}
                                        isValid={validated && errors.password === undefined}
                                    />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        <ul className={validated && errors.passwordRepeat !== undefined ? "help-block-with-errors" : ""}>
                                            <li className={!validated || (errors.password && errors.password.includes('minLength')) ? "" : "help-text-validated"}>
                                                {t('form:textMinLength', {amount: inputPassword.minLength})}
                                            </li>
                                            <li className={!validated || (errors.password && errors.password.includes('maxLength')) ? "" : "help-text-validated"}>
                                                {t('form:textMaxLength', {amount: inputPassword.maxLength})}
                                            </li>
                                            <li className={!validated || (errors.password && errors.password.includes('containNumber')) ? "" : "help-text-validated"}>
                                                {t('form:containNumber')}
                                            </li>
                                            <li className={!validated || (errors.password && errors.password.includes('containCapital')) ? "" : "help-text-validated"}>
                                                {t('form:containCapitalLetter')}
                                            </li>
                                            {validated && errors.password && errors.password.includes('required') &&
                                                <li>
                                                    {t('form:required')}
                                                </li>
                                            }
                                        </ul>
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} controlId="passwordRepeat">
                                    <Form.Label><strong>{t('wizard:passwordRepeatInputLabel')} *</strong></Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="" 
                                        defaultValue={passwordDefaultValue || ''}
                                        isInvalid={validated && errors.passwordRepeat !== undefined}
                                        isValid={validated && errors.passwordRepeat === undefined}
                                    />
                                    <Form.Text id="passwordRepeatHelpBlock" muted>
                                        <ul className={validated && errors.passwordRepeat !== undefined ? "help-block-with-errors" : ""}>
                                            <li className={!validated || (errors.passwordRepeat && errors.passwordRepeat.includes('matchFirstPassword')) ? "" : "help-text-validated"}>
                                                {t('form:passwordMustMatch')}
                                            </li>
                                            {validated && errors.passwordRepeat && errors.passwordRepeat.includes('required') &&
                                                <li>
                                                    {t('form:required')}
                                                </li>
                                            }
                                        </ul>
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="passwordHint">
                                    <Form.Label><strong>{t('wizard:passwordHintInputLabel')}</strong></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="" 
                                        defaultValue={passwordHintDefaultValue || ''}
                                        isInvalid={validated && errors.passwordHint !== undefined}
                                        isValid={validated && errors.passwordHint === undefined}
                                    />
                                    <Form.Text id="passwordHintHelpBlock" muted>
                                        <ul className={validated && errors.passwordHint !== undefined ? "help-block-with-errors" : ""}>
                                            <li className={!validated || (errors.passwordHint && errors.passwordHint.includes('maxLength')) ? "" : "help-text-validated"}>
                                                {`${passwordHintCount}/${passwordHintMaxLength} ${t('wizard:passwordHintInputHelp')}`}
                                            </li>
                                            {validated && errors.passwordHint && errors.passwordHint.includes('maxLength') &&
                                                <li>
                                                    {t('form:textExceededLength')}
                                                </li>
                                            }
                                        </ul>
                                    </Form.Text>
                                </Form.Group>
                            <Button 
                                variant="outline-secondary"
                                onClick={() => dispatch(decrement())}
                            >
                                    {t('layout:cancel')}
                            </Button>
                            <Button
                                className="float-right"
                                variant="secondary" 
                                type="submit"
                            >
                                {t('layout:next')}
                            </Button>
                        </Form>
                    </>
                    :
                    <div className="openbank-loader">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <h1>Enviando...</h1>
                    </div>
                }
            </Col>
        </Row>
    );
}

export default Step2;