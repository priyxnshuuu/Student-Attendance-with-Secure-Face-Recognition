type GlobalAlertOb = {
  show: (alertMessage: AlertMessage) => void;
};
type AlertMessage = {
  title: string;
  message: string;
  okTitle?: string;
  cancelTitle?: string;
  okCallBack?: Function;
  cancelCallback?: Function;
  disabled?: boolean;
  showButtons?: boolean;
};

type AlertModalProps = {
  alertData: AlertMessage;
  showAlert: boolean;
  setShowAlert: Function;
};

declare var customAlert: GlobalAlertOb;
