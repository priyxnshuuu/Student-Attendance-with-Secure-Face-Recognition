import {useMutation} from '@tanstack/react-query';
import {request} from '../../../services/axios.service';
import {apiUrls} from '../../api-urls';
import {IVerifyOTPInitialValues} from '../../../form/initial-values/verifyOTP.values';

const VerifyOTP = (data: IVerifyOTPInitialValues) => {
  return request({
    url: apiUrls.auth.VERIFY_OTP,
    method: 'POST',
    data: data,
  });
};

export const useVerifyOTPMutation = () => {
  return useMutation(VerifyOTP);
};
