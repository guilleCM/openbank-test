import { configureStore } from '@reduxjs/toolkit';
import wizardReducer from './views/wizardReducer';
import appReducer from './appReducer';

export default configureStore({
  reducer: {
    app: appReducer,
    wizard: wizardReducer,
  },
});
