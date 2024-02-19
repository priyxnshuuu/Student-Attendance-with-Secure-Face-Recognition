import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IUserState {
  userData: TUserProfile;
}

const initialState: IUserState = {
  userData: {
    email: '',
    mobile: '',
    name: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileData: (state, action: PayloadAction<TUserProfile>) => {
      state.userData = action.payload;
    },
  },
});

export const {updateProfileData} = userSlice.actions;

export default userSlice.reducer;
