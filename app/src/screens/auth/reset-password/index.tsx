import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ControlledPasswordInput from '../../../components/form/inputs/password-input/ControlledPasswordInput';
import {yupResolver} from '@hookform/resolvers/yup';
import {validation} from '../../../form/validation';
import {initialValues} from '../../../form/initial-values';
import {useForm} from 'react-hook-form';
import {Text} from '@rneui/themed';
import {IMAGES} from '../../../images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useResetPasswordMutation} from '../../../hooks/auth/mutation/resetPassword.mutation';
import {IResetPasswordValues} from '../../../form/initial-values/resetPassword.values';
import ControlButton from '../../../components/button/ControlButton';

const ResetPasswordScreen = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<TAuthNavigatorParams>>();
  const {mutateAsync, isLoading} = useResetPasswordMutation();
  const {params} = useRoute<RouteProp<TAuthNavigatorParams, 'ResetPassword'>>();

  const {control, handleSubmit, formState} = useForm({
    defaultValues: initialValues.resetPassword,
    resolver: yupResolver(validation.resetPassword),
  });
  const resetToken = params.token;
  const onSubmit = useCallback(
    async (values: IResetPasswordValues) => {
      const res = await mutateAsync({
        resetToken: resetToken,
        ...values,
      });
      if (res.status === 'success') {
        customAlert.show({
          title: res.title,
          message: res.message,
        });
        navigate('LoginScreen');
      } else {
        customAlert.show({
          title: res.data.title,
          message: res.data.message,
        });
      }
    },
    [mutateAsync, navigate, resetToken],
  );

  return (
    <>
      <View style={styles.container1}>
        <View style={styles.container}>
          <Image style={styles.logo1} source={IMAGES.logo} />
          <Text style={styles.loginText}>Reset Password</Text>
          <ControlledPasswordInput
            formState={formState}
            control={control}
            label="New Password"
            name="password"
          />

          <ControlledPasswordInput
            formState={formState}
            control={control}
            label="Re-Enter password"
            name="confirmPassword"
          />
          <View style={styles.btnMain}>
            <ControlButton
              onPress={handleSubmit(onSubmit)}
              title="Reset"
              loading={isLoading}
            />
            <TouchableOpacity
              style={styles.text}
              onPress={() => navigate('LoginScreen')}>
              <Text style={{color: '#F00F89'}}>Back to Login</Text>
            </TouchableOpacity>
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
    fontSize: 28,
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
  text: {
    marginLeft: 80,
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
