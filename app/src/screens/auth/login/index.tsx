import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ControlledInput from '../../../components/form/inputs/text-input/ControlledInput';
import {IMAGES} from '../../../images';
import ControlledPasswordInput from '../../../components/form/inputs/password-input/ControlledPasswordInput';
import {useForm} from 'react-hook-form';
import {initialValues} from '../../../form/initial-values';
import {validation} from '../../../form/validation';
import {ILoginInitialValues} from '../../../form/initial-values/login.values';
import ControlButton from '../../../components/button/ControlButton';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useLoginMutation} from '../../../hooks/auth/mutation/useLogin.mutation';
import {checkUserAuthenticate} from '../../../services/auth.service';
import {useCheckAuthenticated} from '../../../hooks/auth/query/useCheckAuthenticated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TAuthNavigatorParams>>();

  const {mutateAsync, isLoading} = useLoginMutation();

  const {refetch} = useCheckAuthenticated(res => checkUserAuthenticate(res));

  const {control, reset, handleSubmit, formState} = useForm({
    defaultValues: initialValues.login,
    resolver: yupResolver(validation.login),
  });

  const onSubmit = useCallback(
    async (values: ILoginInitialValues) => {
      const res = await mutateAsync(values);
      console.log('res:', res.statusCode);
      if (res.statusCode === 201) {
        navigation.navigate('VerifyOTP', {redirectScreen: 'LoginScreen'});
        customAlert.show({
          title: res.title,
          message: res.message,
        });
        return;
      }
      if (res.status === 'success') {
        reset();
        AsyncStorage.setItem(`${Config.REACT_APP_SECRET_KEY}`, res.data.token);
        refetch();
      } else {
        customAlert.show({
          title: res.data.title,
          message: res.data.message,
        });
      }
    },
    [mutateAsync, refetch, reset, navigation],
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.Container1}>
        <View style={styles.img}>
          <Image style={styles.logo} source={IMAGES.logo} />
        </View>
        <Text style={styles.loginText}>Login</Text>
        <View>
          <ControlledInput
            formState={formState}
            control={control}
            name="email"
            label="Email"
          />

          <ControlledPasswordInput
            formState={formState}
            control={control}
            label="Password"
            name="password"
          />
        </View>

        <View>
          <ControlButton
            loading={isLoading}
            title="Login"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  Container1: {
    marginHorizontal: 20,
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logo: {
    marginBottom: 20,
    alignItems: 'center',
    width: 135,
    height: 135,
  },
  loginText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#F00F89',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    height: 30,
    marginBottom: 10,
    fontSize: 14,
  },

  inputContainer: {
    borderBottomColor: '#F00F89',
  },

  forgot: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#F00F89',
  },

  loginButton: {
    padding: 10,
    marginBottom: 30,
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

  loginImage: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  imageLogo: {
    width: 24,
    height: 24,
  },

  btnMain: {
    paddingTop: 40,
    width: '70%',
    borderRadius: 50,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#F00F89',
  },
});

export default LoginScreen;
