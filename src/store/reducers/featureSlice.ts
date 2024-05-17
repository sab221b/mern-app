import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ReduxState {
  app: {
    featureData: {}
  }
}
export interface State {
  loading: boolean,
  error: boolean,
  featureData: any,
}
export const initialState: State = {
  loading: false,
  error: false,
  featureData: null,
};

const userSlice = createSlice({
  name: 'app/features',
  initialState,
  reducers: {
    setFeatures(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = false;
      state.featureData = action.payload;
    },
  },
});

export const { actions, reducer } = userSlice;