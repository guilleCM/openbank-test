import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { configureStore } from '@reduxjs/toolkit';
import wizardReducer from './views/wizardReducer';
import appReducer from './appReducer';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './../src/locale/index';
import { PRUEBA_KO, HTTP_CODES } from './services/api';
import { render, fireEvent } from '@testing-library/react';

global.scrollTo = jest.fn();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
          <App/>
      </I18nextProvider>
    </Provider>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});

it('user cant go step 2 without accept user agreement', () => {
  const div = document.createElement('div');
  const { getByRole } = render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
          <App/>
      </I18nextProvider>
    </Provider>, 
  div);
  const nextStepBtn = getByRole("nextStepButton");
  expect(nextStepBtn).toHaveProperty('disabled', true);
  ReactDOM.unmountComponentAtNode(div);
});

it('user can go to step 2', () => {
  const div = document.createElement('div');
  const { getByRole } = render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
          <App/>
      </I18nextProvider>
    </Provider>, 
  div);
  const inputUserAgreement = getByRole("inputUserAgreement");
  fireEvent.click(inputUserAgreement)
  const nextStepBtn = getByRole("nextStepButton");
  expect(nextStepBtn).toHaveProperty('disabled', false);
  fireEvent.click(nextStepBtn);
  const openbankForm = getByRole("openbankForm");
  expect(openbankForm).toBeDefined()
  ReactDOM.unmountComponentAtNode(div);
});

const reducers = {
  app: appReducer,
  wizard: wizardReducer,
}

const preloadStateInitialForm = {
  wizard: {
    step: 2,
  }
}

const storeForm = configureStore({
  reducer: reducers,
  preloadedState: preloadStateInitialForm
})

it('user submit with empty values', () => {
  const div = document.createElement('div');
  const { getByRole } = render(
    <Provider store={storeForm}>
      <I18nextProvider i18n={i18n}>
          <App/>
      </I18nextProvider>
    </Provider>, 
  div);
  const submitButton = getByRole("submitButton");
  fireEvent.click(submitButton)

  const inputPassword = getByRole("inputPassword");
  expect(inputPassword.classList.contains('is-invalid')).toBe(true)
  const inputPasswordHelpBlock = getByRole("inputPasswordHelpBlock");
  expect(inputPasswordHelpBlock.firstChild.children.length).toBe(5);
  expect(Array.from(inputPasswordHelpBlock.firstChild.children).filter(li => li.classList.contains('help-text-validated')).length).toBe(1);

  const inputPasswordRepeat = getByRole("inputPasswordRepeat");
  expect(inputPasswordRepeat.classList.contains('is-invalid')).toBe(true)
  const inputPasswordRepeatHelpBLock = getByRole("inputPasswordRepeatHelpBLock");
  expect(inputPasswordRepeatHelpBLock.firstChild.children.length).toBe(2);
  expect(Array.from(inputPasswordHelpBlock.firstChild.children).filter(li => li.classList.contains('help-text-validated')).length).toBe(1);

  const inputPasswordHint = getByRole("inputPasswordHint");
  expect(inputPasswordHint.classList.contains('is-valid')).toBe(true)

  ReactDOM.unmountComponentAtNode(div);
});

const preloadStateInitialFormValid = {
  wizard: {
    step: 3,
    password: 'Prueba123',
    passwordHint: '',
    error: false
  }
}

const storeValidForm = configureStore({
  reducer: reducers,
  preloadedState: preloadStateInitialFormValid
})


it('user submit with valid form', () => {
  const div = document.createElement('div');
  const { getByRole } = render(
    <Provider store={storeValidForm}>
      <I18nextProvider i18n={i18n}>
          <App/>
      </I18nextProvider>
    </Provider>, 
  div);
  const submitButton = getByRole("loginButton");
  expect(submitButton).toBeDefined();
  ReactDOM.unmountComponentAtNode(div);
});

const preloadStateInitialFormInvalid = {
  wizard: {
    step: 3,
    password: PRUEBA_KO,
    passwordHint: '',
    error: HTTP_CODES.UNAUTHORIZED
  }
}

const storeInvalidForm = configureStore({
  reducer: reducers,
  preloadedState: preloadStateInitialFormInvalid
})


it('user submit with invalid form', () => {
  const div = document.createElement('div');
  const { getByRole } = render(
    <Provider store={storeInvalidForm}>
      <I18nextProvider i18n={i18n}>
          <App/>
      </I18nextProvider>
    </Provider>, 
  div);
  const backToFormStepButton = getByRole("backToFormStepButton");
  expect(backToFormStepButton).toBeDefined();
  ReactDOM.unmountComponentAtNode(div);
});
