import {request} from '../../../services/axios.service';
import {apiUrls} from '../../api-urls';
import {useQuery} from '@tanstack/react-query';

const getProfile = async () => {
  const response: TServerResponse = await request({
    url: apiUrls.auth.GET_PROFILE,
    method: 'GET',
  });
  return response;
};

export const useCheckAuthenticated = (onSuccess: TOnSuccessHandle) => {
  return useQuery(['user', 'get-profile'], getProfile, {
    onSuccess,
    enabled: false,
  });
};
