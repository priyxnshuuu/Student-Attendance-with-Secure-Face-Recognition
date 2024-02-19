import React, {useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {validation} from '../../../form/validation';
import {initialValues} from '../../../form/initial-values';
import {useForm} from 'react-hook-form';
import {Text} from '@rneui/themed';
import {IMAGES} from '../../../images';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ControlVerifyOTPInput from '../../../components/form/inputs/verify-otp-input/ControllVerifyOTPInput';
import {IVerifyOTPInitialValues} from '../../../form/initial-values/verifyOTP.values';
import {useVerifyOTPMutation} from '../../../hooks/auth/mutation/verifyOTP.mutation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ControlButton from '../../../components/button/ControlButton';

const VerifyOTP = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<TAuthNavigatorParams>>();
  const {params} = useRoute<RouteProp<TAuthNavigatorParams, 'VerifyOTP'>>();
  const {mutateAsync, isLoading} = useVerifyOTPMutation();

  const {control, formState, handleSubmit, reset} = useForm({
    defaultValues: initialValues.otp,
    resolver: yupResolver(validation.otp),
  });
  const {redirectScreen} = params;
  const onSubmit = useCallback(
    async (values: IVerifyOTPInitialValues) => {
      const res = await mutateAsync({otp: values.otp});
      if (res.status === 'success') {
        navigate('ResetPassword', {token: res.data});
        reset();
        if (redirectScreen === 'LoginScreen') {
          navigate('LoginScreen');
          customAlert.show({
            title: res.title,
            message: res.message,
          });
        }
      } else {
        customAlert.show({
          title: res.data.title,
          message: res.data.message,
        });
      }
    },
    [mutateAsync, redirectScreen, reset, navigate],
  );

  return (
    <>
      <View style={styles.container1}>
        <View style={styles.container}>
          <Image style={styles.logo1} source={IMAGES.logo} />
          <Text style={styles.loginText}>Verify OTP</Text>
          <ControlVerifyOTPInput
            formState={formState}
            control={control}
            name="otp"
          />
          <View style={styles.btnMain}>
            <ControlButton
              title="Verify"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    height: 890,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  logo1: {
    marginBottom: 20,
    width: 135,
    height: 135,
  },
  inputContainer: {
    borderBottomColor: '#F00F89',
  },
  input: {
    height: 30,
    marginBottom: 10,
    fontSize: 14,
  },

  loginText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#F00F89',
    marginBottom: 30,
    textAlign: 'center',
  },

  btnMain: {
    paddingTop: 10,
    width: '70%',
    borderRadius: 50,
    marginBottom: 20,
  },

  loginButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F00F89',
    borderRadius: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
  },
  successText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#F00F89',
    marginBottom: 20,
  },
});

export default VerifyOTP;
