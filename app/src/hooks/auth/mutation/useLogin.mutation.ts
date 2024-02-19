import {useMutation} from '@tanstack/react-query';
import {ILoginInitialValues} from '../../../form/initial-values/login.values';
import {request} from '../../../services/axios.service';
import {apiUrls} from '../../api-urls';

const login = async (data: ILoginInitialValues) => {
  const response: TServerResponse = await request({
    url: apiUrls.auth.LOGIN,
    method: 'POST',
    data: data,
  });

  return response;
};

export const useLoginMutation = () => {
  return useMutation(login);
};
