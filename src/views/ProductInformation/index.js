import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {
  increment,
} from './../wizardReducer';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

import logo from './../../assets/img/logo_openbank.png';

function Step1() {
    // const step = useSelector(currentStep);
    const dispatch = useDispatch();
    const [userAgreement, setUserAgreement] = useState(false);
    const [t] = useTranslation();
    return (
        <Row>
            <Col md={{ span: 10, offset: 1}} lg={{ span: 8, offset: 2}}>
                <h1 style={{marginTop: '1rem'}}>
                    {t('wizard:welcome')} <img src={logo} alt="OpenBank"/> 
                </h1>
                <h3>
                    {t('wizard:beforeStartTitle')}
                </h3>
                <p>
                    {t('wizard:beforeStartText')}
                </p>
                <p>
                    {t('wizard:firstStepInfo')}
                </p>
                <FormCheck 
                    label={t('wizard:userAgreementLabel')}
                    type="checkbox"
                    style={{
                        paddingBottom: '1rem',
                    }}
                    checked={userAgreement}
                    onChange={() => setUserAgreement(!userAgreement)}
                />
                
                <Button
                    className="float-right"
                    variant="secondary" 
                    disabled={!userAgreement}
                    title={userAgreement ? '' : t('wizard:userAgreementTooltip')}
                    onClick={() => dispatch(increment())}
                >
                    {t('layout:next')}
                </Button>
            </Col>
        </Row>
    );
}

export default Step1;