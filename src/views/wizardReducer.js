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
    password: '',
    passwordHint: '',
    error: false,
  },
  reducers: {
    increment: state => {
      state.step += 1;
    },
    decrement: state => {
      state.step -= 1;
    },
    incrementByAmount: (state, action) => {
      state.step += action.payload;
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

export const { increment, decrement, incrementByAmount } = slice.actions;

export const isLoading = state => state.wizard.loading === 'pending';
export const currentStep = state => state.wizard.step;
export const totalSteps = state => state.wizard.totalSteps;

export default slice.reducer;
