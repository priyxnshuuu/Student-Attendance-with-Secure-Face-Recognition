import {object, string} from 'yup';

export const attendanceInValidation = object({
  qrString: string().required('Qr String is required'),
  note: string().max(30, 'Note should not have more than 30 characters'),
});
