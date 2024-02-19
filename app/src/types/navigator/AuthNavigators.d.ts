type TAuthNavigatorParams = {
  LoginScreen: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    token: string;
  };
  VerifyOTP: {
    redirectScreen: 'LoginScreen' | 'ResetPassword';
  };
};
