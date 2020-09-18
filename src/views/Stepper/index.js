import React from "react";
import { useSelector } from 'react-redux';
import {
    currentStep,
    totalSteps,
} from './../wizardReducer';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./styles.scss";

function Stepper() {
    const step = useSelector(currentStep);
    const steps = useSelector(totalSteps);
    return (
        <Row>
            <Col md={{ span: 10, offset: 1}} lg={{ span: 8, offset: 2}}>
                <div className="openbank-stepper-horizontal openbank-theme">
                    {Array.from(Array(steps).keys()).map(stepNumber => {
                        const classes = ['openbank-step'];
                        stepNumber+1 === step && classes.push('active');
                        stepNumber+1 < step && classes.push('done');
                        return (
                            <div className={classes.join(' ')} key={`step${stepNumber}`}>
                                <div className="openbank-step-circle"><span>{stepNumber+1}</span></div>
                                <div className="openbank-step-bar-left"></div>
                                <div className="openbank-step-bar-right"></div>
                            </div>

                        )
                    })}
                </div>
            </Col>
        </Row>
    );
}

export default Stepper;