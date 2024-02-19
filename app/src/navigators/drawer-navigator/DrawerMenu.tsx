import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface IDrawerMenu {
  heading: string;
  onClick: () => void;
  required?: boolean;
}

const DrawerMenu = (props: IDrawerMenu) => {
  const {heading, onClick, required = false} = props;

  const styles = StyleSheet.create({
    root: {
      paddingTop: 26,
      paddingBottom: 13,
      paddingLeft: 32,
      paddingRight: 10,
      borderStyle: 'solid',
      borderColor: required === true ? 'transparent' : '#fff',
      borderWidth: 1,
    },
    menuName: {
      color: '#000',
      fontWeight: '500',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => onClick()}>
        <Text style={styles.menuName}>{heading}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerMenu;
