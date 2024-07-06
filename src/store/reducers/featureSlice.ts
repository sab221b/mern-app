import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ReduxState {
  app: {
    features: {}
  }
}
export interface State {
  loading: boolean,
  error: boolean,
  features: any,
}
export const initialState: State = {
  loading: false,
  error: false,
  features: null,
};

const userSlice = createSlice({
  name: 'app/features',
  initialState,
  reducers: {
    setFeatures(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = false;
      state.features = action.payload;
    },
  },
});

export const { actions, reducer } = userSlice;