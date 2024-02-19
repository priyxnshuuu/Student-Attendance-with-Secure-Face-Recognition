import {View, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import {ANIMATION} from '../../animation/index';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from '@rneui/base';
export const SuccessScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TDrawerNavigationParams>>();
  return (
    <SafeAreaView>
      <View>
        <LottieView
          source={ANIMATION.success}
          style={{
            height: 360,
            width: 300,
            alignSelf: 'center',
            marginTop: 250,
            justifyContent: 'center',
          }}
          autoPlay
          loop={false}
          speed={0.7}
          onAnimationFinish={() => {
            navigation.navigate('Home');
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: '#ff008a',
            alignSelf: 'center',
            marginTop: 10,
            fontWeight: '700',
          }}>
          Attendance Marked
        </Text>
      </View>
    </SafeAreaView>
  );
};
