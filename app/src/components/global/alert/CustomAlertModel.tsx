import {Button} from '@rneui/base';
import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';

const CustomAlertModel = (props: AlertModalProps) => {
  const {setShowAlert, alertData, showAlert} = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}}
      visible={showAlert}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalMegaText}>{alertData.title}</Text>
          <Text style={styles.modalText}>{alertData.message}</Text>
          <View style={styles.okBox}>
            <Button
              titleStyle={{fontSize: 12}}
              size="sm"
              buttonStyle={styles.btn}
              onPress={() => setShowAlert(false)}>
              OK
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#00000055',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 300,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#F00F89',
  },
  modalText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
  modalMegaText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  okBox: {
    width: 77,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default CustomAlertModel;
