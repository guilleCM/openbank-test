import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Globe } from 'react-feather';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";

import { setLocale } from './appReducer';
import OpenbankLogo from './assets/img/logo_openbank.png';
import Wizard from "./views/wizard";

import "./App.scss";

function App() {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const handleOnClickLocale = (code) => {
        i18next
            .changeLanguage(code)
            .then(
                dispatch(setLocale(code))
            );
    }
    return (
        <div className="App">
            <main className="App-content">
                <Navbar bg="light" className="openbank-nav">
                    <Navbar.Brand href="#">
                        <img
                            src={OpenbankLogo}
                            height="30"
                            className="d-inline-block align-top"
                            alt="Openbank logo"
                        />
                    </Navbar.Brand>
                    <Dropdown className="ml-auto" alignRight>
                        <Dropdown.Toggle id="dropdown-locale">
                            <Globe/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={() => handleOnClickLocale('es')}>{t('layout:localeES')}</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => handleOnClickLocale('en')}>{t('layout:localeEN')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                </Navbar>
                <Container>
                    <Wizard />
                </Container>
            </main>
        </div>
    );
}

export default App;

