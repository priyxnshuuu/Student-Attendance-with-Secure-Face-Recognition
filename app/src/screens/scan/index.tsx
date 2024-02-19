/* eslint-disable react-native/no-inline-styles */
import {Text} from '@rneui/base';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {initialValues} from '../../form/initial-values';
import {validation} from '../../form/validation';
import NoteDialog from './modal/NoteDialog';
const ScanScreen = () => {
  const formHandler = useForm({
    defaultValues: initialValues.attendanceIn,
    resolver: yupResolver(validation.attendanceIn),
  });
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.mainView}>
      <View style={styles.qrSurround}>
        <Text style={styles.qrHeading}>Scan QR Code</Text>
        <QRCodeScanner
          onRead={e => {
            formHandler.setValue('qrString', e.data);
            setVisible(true);
          }}
          reactivate={true}
          fadeIn={true}
          reactivateTimeout={3000}
          showMarker={true}
          cameraStyle={{
            width: 250,
            height: 250,
            alignSelf: 'center',
          }}
          markerStyle={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <NoteDialog
        toggleDialog={() => setVisible(state => !state)}
        visible={visible}
        setVisible={() => setVisible(state => !state)}
        formHandler={formHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#ffe6f3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraView: {},
  qrHeading: {
    marginVertical: 20,
    fontSize: 30,
    fontWeight: '800',
    color: '#ff008a',
  },
  qrSurround: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 200,
    height: 600,
    borderRadius: 30,
    width: 395,
  },
});
export default ScanScreen;
