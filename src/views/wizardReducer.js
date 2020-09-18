import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { submitForm } from './../services/api';

export const fetchForm = createAsyncThunk(
  'wizard/fetchForm',
  async ({password, passwordRepeat, passwordHint}, { getState, rejectWithValue }) => {
    const {loading } = getState().wizard
    if (loading !== 'pending') {
      return
    }
    try {
      const response = await submitForm(password, passwordRepeat, passwordHint);
      return response;
    } catch(err) {
      return rejectWithValue(err.status);
    }
  }
)

export const slice = createSlice({
  name: 'wizard',
  initialState: {
    step: 1,
    totalSteps: 3,
    loading: 'idle',
    password: undefined,
    passwordHint: undefined,
    error: false,
  },
  reducers: {
    increment: state => {
      state.step += 1;
    },
    decrement: state => {
      state.step -= 1;
      if (state.step === 1) { //reset form
        state.password = undefined;
        state.passwordHint = undefined;
      }
    },
    goToFormStep: (state) => {
      state.step = 2;
      state.error = false;
    },
  },
  extraReducers: {
    [fetchForm.pending]: (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    [fetchForm.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.password = action.meta.arg.password;
        state.passwordHint = action.meta.arg.passwordHint;
        state.step = 3;
      }
    },
    [fetchForm.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.password = action.meta.arg.password;
        state.passwordHint = action.meta.arg.passwordHint;
        state.step = 3;
        state.error = action.payload;
      }
    }
  }
});

export const { increment, decrement, goToFormStep } = slice.actions;

export const hasError = state => state.wizard.error;
export const isLoading = state => state.wizard.loading === 'pending';
export const currentStep = state => state.wizard.step;
export const totalSteps = state => state.wizard.totalSteps;
export const password = state => state.wizard.password;
export const passwordHint = state => state.wizard.passwordHint;

export default slice.reducer;
