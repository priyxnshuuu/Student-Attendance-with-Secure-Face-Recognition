import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import {IMAGES} from '../../../images';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Image style={styles.img} source={IMAGES.logo} />
        <Text style={styles.title}>
          MS <Text style={styles.secondaryTitle}>Attender</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 180,
    height: 180,
  },
  title: {
    color: '#e84e89',
    fontSize: 35,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 30,
  },
  secondaryTitle: {
    color: '#d34178',
  },
});

export default SplashScreen;
