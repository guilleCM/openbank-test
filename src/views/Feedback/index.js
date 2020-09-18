import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, AlertTriangle } from 'react-feather';
import {
  hasError,
  goToFormStep,
} from './../wizardReducer';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

// import logo from './../../assets/img/logo_openbank.png';
function FeedbackError(props) {
    const dispatch = useDispatch();
    const [t] = useTranslation();
    return (
        <Col md={{ span: 10, offset: 1}} lg={{ span: 8, offset: 2}}>
            <h1 style={{marginTop: '1rem'}}>
                <AlertTriangle size={48} /> {t('wizard:feedbackErrorTitle')}
            </h1>
            <p>{t('wizard:feedbackErrorText')}</p>
            <small style={{marginBottom: '1rem'}} className="error-text">{`${t('wizard:feedbackErrorCode')}: ${props.errorCode}`}</small>
            <Button
                className="float-right"
                variant="outline-primary" 
                onClick={() => dispatch(goToFormStep())}
            >
                {t('layout:return')}
            </Button>
        </Col>
    );
}

function FeedbackSuccess() {
    const [t] = useTranslation();
    return (
        <Col md={{ span: 10, offset: 1}} lg={{ span: 8, offset: 2}}>
            <h1 style={{marginTop: '1rem'}}>
                <CheckCircle size={48} /> {t('wizard:feedbackSuccessTitle')}
            </h1>
            <p>
                {t('wizard:feedbackSuccessText')}
            </p>
            <Button
                className="float-right"
                variant="outline-primary" 
            >
                {t('layout:login')}
            </Button>
        </Col>
    );
}

function Step3() {
    const error = useSelector(hasError);
    return (
        <Row>
            {error === false ?
                <FeedbackSuccess />
                :
                <FeedbackError errorCode={error}/>
            }
        </Row>
    );
}

export default Step3;