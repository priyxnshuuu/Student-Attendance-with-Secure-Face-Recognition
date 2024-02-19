import {useMutation} from '@tanstack/react-query';
import {request} from '../../../services/axios.service';
import {apiUrls} from '../../api-urls';
import {IPasswordInitialValues} from '../../../form/initial-values/forgoPassword.values';

const forgotPassword = (data: IPasswordInitialValues) => {
  return request({
    url: apiUrls.auth.FORGOT_PASSWORD,
    method: 'POST',
    data: data,
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation(forgotPassword);
};
