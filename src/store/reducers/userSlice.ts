import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ReduxState {
    app: {
      userData: {}
    }
  }

export interface State {
    loading: boolean,
    error: boolean,
    userData: any,
    sessionId: null,
  }

export const initialState: State = {
    loading: false,
    error: false,
    userData: null,
    sessionId: null,
  };
  
  const userSlice = createSlice({
    name: 'app/users',
    initialState,
    reducers: {
      setSessionId(state: State, action: PayloadAction<any>) {
        state.loading = false;
        state.error = false;
        state.sessionId = action.payload;
      },
      setUserData(state, action: PayloadAction<any>) {
        state.loading = false;
        state.error = false;
        state.userData = action.payload;
      },
    },
  });
  
export const { actions, reducer } = userSlice;