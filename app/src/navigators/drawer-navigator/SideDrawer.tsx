import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {logout} from '../../app/reducers/login/login-reducer';
import DrawerMenu from './DrawerMenu';
import {Icon} from '@rneui/themed';

const SideDrawer = () => {
  const dispatch = useAppDispatch();

  let userData = useAppSelector(state => state.user.userData);

  return (
    <>
      <View style={styles.detailsContainer}>
        <View style={styles.userInfo}>
          <View style={styles.icon}>
            <Icon name="person" />
          </View>
          <View style={styles.text}>
            <Text style={styles.userText}>{userData.name}</Text>
            <Text style={styles.userText}>+91-{userData.mobile}</Text>
          </View>
        </View>
      </View>
      <View style={styles.menuSection}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={true}>
          <DrawerMenu
            heading="Logout"
            required
            onClick={() => dispatch(logout())}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default SideDrawer;

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: '#fff',
    paddingLeft: 18,
    paddingRight: 12,
    paddingVertical: 36,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgSection: {
    marginRight: 20,
  },
  userImg: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userText: {
    top: 20,
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 1.5,
  },
  menuSection: {
    backgroundColor: '#EFEFEF',
    flex: 1,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    bottom: 3,
    paddingLeft: 100,
  },

  icon: {
    top: 7,
    marginLeft: 15,
  },
});
