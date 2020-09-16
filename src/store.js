import { configureStore } from '@reduxjs/toolkit';
import wizardReducer from './views/wizardReducer';

export default configureStore({
  reducer: {
    wizard: wizardReducer,
  },
});
