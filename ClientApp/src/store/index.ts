import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { exampleReducer } from './example/reducer';

const rootReducer = combineReducers({
  exampleReducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;