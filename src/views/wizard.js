import React from "react";
import { useSelector } from 'react-redux';
import {
    currentStep,
} from './wizardReducer';

import Step1 from "./ProductInformation";
import Step2 from "./Form";
import Stepper from "./Stepper";

function Wizard() {
    const step = useSelector(currentStep);
    return (
        <>
            <Stepper/>
            {step === 1 &&
                <Step1/>
            }
            {step === 2 &&
                <Step2/>
            }
        </>
    );
}

export default Wizard;