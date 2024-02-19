export interface IResetPasswordValues {
  resetToken?: string;
  password: string;
  confirmPassword: string;
}

export const resetPasswordValues: IResetPasswordValues = {
  password: '',
  confirmPassword: '',
};
