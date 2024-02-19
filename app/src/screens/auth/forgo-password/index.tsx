import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import {validation} from '../../../form/validation';
import {initialValues} from '../../../form/initial-values';
import {useForm} from 'react-hook-form';
import {Text} from '@rneui/themed';
import {IMAGES} from '../../../images';
import ControlledInput from '../../../components/form/inputs/text-input/ControlledInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForgotPasswordMutation} from '../../../hooks/auth/mutation/useForgotPassword.mutation';
import {IPasswordInitialValues} from '../../../form/initial-values/forgoPassword.values';
import ControlButton from '../../../components/button/ControlButton';
const ForgotPasswordScreen = () => {
  const {mutateAsync, isLoading} = useForgotPasswordMutation();

  const {navigate} =
    useNavigation<NativeStackNavigationProp<TAuthNavigatorParams>>();
  const {control, formState, handleSubmit} = useForm({
    defaultValues: initialValues.password,
    resolver: yupResolver(validation.password),
  });

  const onSubmit = useCallback(
    async (values: IPasswordInitialValues) => {
      const res = await mutateAsync(values);
      if (res.status === 'success') {
        navigate('VerifyOTP', {redirectScreen: 'ResetPassword'});
      } else {
        customAlert.show({
          title: res.data.title,
          message: res.data.message,
        });
      }
    },
    [mutateAsync, navigate],
  );

  return (
    <>
      <View style={styles.container1}>
        <View style={styles.container}>
          <Image style={styles.logo1} source={IMAGES.logo} />
          <Text style={styles.loginText}>Forgot Password</Text>
          <ControlledInput
            formState={formState}
            control={control}
            label="Email"
            name="email"
          />

          <View style={styles.btnMain}>
            <ControlButton
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />
          </View>

          <TouchableOpacity onPress={() => navigate('LoginScreen')}>
            <Text style={{color: '#F00F89'}}>Back to Login</Text>
          </TouchableOpacity>
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

export default ForgotPasswordScreen;
