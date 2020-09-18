import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'app',
  initialState: {
    locale: 'es',
  },
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = slice.actions;

export const getLocale = state => state.app.locale;

export default slice.reducer;
