import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ReduxState {
    app: {
      productData: {
        products: any[]
      }
    }
  }

export interface State {
    loading: boolean,
    error: boolean,
    errorInfo: [],
    products: any[],
  }

export const initialState: State = {
    loading: false,
    error: false,
    errorInfo: [],
    products: [],
  };
  
  const productsSlice = createSlice({
    name: 'app/products',
    initialState,
    reducers: {
      loadData(state: State, _action: PayloadAction<string>) {
        state.loading = true;
        state.error = false;
        state.errorInfo = [];
        state.products = [];
      },
      loadDataSuccess(state, action: PayloadAction<any>) {
        state.loading = false;
        state.error = false;
        state.errorInfo = [];
        state.products = action.payload.products;
      },
      loadDataFailure(state, action: PayloadAction<{ errorInfo: [] }>) {
        state.loading = false;
        state.error = true;
        state.errorInfo = action.payload.errorInfo;
      },
    },
  });
  
export const { actions, reducer } = productsSlice;