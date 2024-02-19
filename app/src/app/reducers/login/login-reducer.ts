import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Config from 'react-native-config';

interface ILoginState {
  status: 'logout' | 'authenticating' | 'loggedIn';
  token: string | undefined;
}

const initialState: ILoginState = {
  status: 'authenticating',
  token: undefined,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Authenticating
    authenticating(state) {
      state.status = 'authenticating';
    },
    // Login
    login(state, action: PayloadAction<string>) {
      AsyncStorage.setItem(`${Config.REACT_APP_SECRET_KEY}`, action.payload);
      state.status = 'loggedIn';
      state.token = action.payload;
    },

    // Logout
    logout(state) {
      state.status = 'logout';
      state.token = undefined;
      AsyncStorage.removeItem(`${Config.REACT_APP_SECRET_KEY}`);
    },
  },
});

export const {login, authenticating, logout} = loginSlice.actions;

export default loginSlice.reducer;
