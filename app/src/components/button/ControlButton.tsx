import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import React from 'react';

interface IControlButton {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const ControlButton: React.FC<IControlButton> = ({title, onPress, loading}) => {
  return (
    <View>
      <TouchableOpacity
        style={{...styles.loginButton, opacity: loading ? 0.5 : 1}}
        onPress={onPress}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.loginButtonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ControlButton;

const styles = StyleSheet.create({
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
});
