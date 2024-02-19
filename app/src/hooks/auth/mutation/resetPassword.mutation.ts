import {useMutation} from '@tanstack/react-query';
import {request} from '../../../services/axios.service';
import {apiUrls} from '../../api-urls';
import {IResetPasswordValues} from '../../../form/initial-values/resetPassword.values';

const resetPassword = (data: IResetPasswordValues) => {
  return request({
    url: apiUrls.auth.RESET_PASSWORD,
    method: 'POST',
    data: data,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation(resetPassword);
};
