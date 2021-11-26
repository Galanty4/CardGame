import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
  userReducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;