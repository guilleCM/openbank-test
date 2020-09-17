import React, { useState } from "react";
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

// const validations = {
//     password: [
//         {
//             label: 'Mínimo 4 caracteres',
//             isValid: 
//         }
//     ]
// }

function Step2() {
    // const step = useSelector(currentStep);
    const dispatch = useDispatch();
    const [userAgreement, setUserAgreement] = useState(false);
    const [t] = useTranslation();
    const isValid = false;
    return (
        <Row>
            <Col md={{ span: 10, offset: 1}} lg={{ span: 8, offset: 2}}>
                <h1 style={{marginTop: '1rem'}}>
                    {t('wizard:createNewPasswordTitle')}
                </h1>
                <p>
                {t('wizard:createNewPasswordInfo')}
                </p>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label><strong>{t('wizard:passwordInputLabel')}</strong></Form.Label>
                            <Form.Control type="password" placeholder="" />
                            <Form.Text id="passwordHelpBlock" muted>
                                <ul>
                                    <li>
                                        Mínimo 4 caracteres
                                    </li>
                                    <li>
                                        Máximo 24 caracteres
                                    </li>
                                    <li>
                                        Contiene 1 número
                                    </li>
                                    <li>
                                        Contiene una mayúscula
                                    </li>
                                </ul>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPasswordRepeat">
                            <Form.Label><strong>{t('wizard:passwordRepeatInputLabel')}</strong></Form.Label>
                            <Form.Control type="password" placeholder="" />
                            <Form.Text id="passwordRepeatHelpBlock" muted>
                                <ul>
                                    <li>
                                        La contraseña coincide
                                    </li>
                                </ul>
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formPasswordLead">
                            <Form.Label><strong>{t('wizard:passwordLeadInputLabel')}</strong></Form.Label>
                            <Form.Control type="text" placeholder="" />
                            <Form.Text id="passwordLeadHelpBlock" muted>
                                <span>0/255 {t('wizard:passwordLeadInputHelp')}</span>
                            </Form.Text>
                        </Form.Group>
                    {/* <Button variant="primary" type="submit">
                        Submit
                    </Button> */}
                </Form>

                <Button 
                    variant="outline-secondary"
                    onClick={() => dispatch(decrement())}
                >
                        {t('generic:cancel')}
                </Button>
                <Button
                    className="float-right"
                    variant="secondary" 
                    onClick={() => dispatch(increment())}
                    disabled={!isValid}
                >
                    {t('generic:next')}
                </Button>
            </Col>
        </Row>
    );
}

export default Step2;