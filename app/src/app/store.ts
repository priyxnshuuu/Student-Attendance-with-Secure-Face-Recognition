import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './reducers/login/login-reducer';
import userSlice from './reducers/user/user-reducer';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
