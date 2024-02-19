type TServerResponse = {
  statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 429;
  status: 'success' | 'error';
  title: string;
  message: string;
  data?: any;
  pageData?: any;
  extraData?: any;
};

type TOnSuccessHandle = (res: TServerResponse) => void;
type TOnErrorHandle = (res: any) => void;

type TAppRedirectionScreen = 'HomeScreen' | 'ProfileScreen' | 'DonationScreen';
