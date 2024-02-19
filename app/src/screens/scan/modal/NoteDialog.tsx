/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {CheckBox, Dialog} from '@rneui/base';
import ControlledInput from '../../../components/form/inputs/text-input/ControlledInput';
import ControlButton from '../../../components/button/ControlButton';
import {UseFormReturn} from 'react-hook-form';
import {IAttendanceInValues} from '../../../form/initial-values/attendanceIn.values';
import {useMarkInAttendanceMutation} from '../../../hooks/attendance/in/mutation/useMarkInAttendance';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMarkOutAttendanceMutation} from '../../../hooks/attendance/out/mutation/useMarkOutAttendance';
import {IAttendanceOutValues} from '../../../form/initial-values/attendanceOut.values';
interface INoteDialog {
  visible: boolean;
  setVisible: () => void;
  toggleDialog: () => void;
  formHandler: UseFormReturn<IAttendanceInValues>;
}
const NoteDialog: React.FC<INoteDialog> = ({
  visible,
  toggleDialog,
  setVisible,
  formHandler: {formState, control, handleSubmit},
}) => {
  const {isLoading, mutateAsync} = useMarkInAttendanceMutation();
  const outMutation = useMarkOutAttendanceMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<TAppNavigatorParams>>();
  const [checked, setChecked] = useState('');

  const onSubmitIn = useCallback(
    async (values: IAttendanceInValues) => {
      const res = await mutateAsync(values);
      if (res.status === 'success') {
        navigation.navigate('Success');
      } else {
        setVisible();
        customAlert.show({
          title: res.data.title,
          message: res.data.message,
        });
      }
    },
    [mutateAsync, navigation, setVisible],
  );
  const onSubmitOut = useCallback(
    async (values: IAttendanceOutValues) => {
      const res = await outMutation.mutateAsync(values);
      if (res.status === 'success') {
        navigation.navigate('Success');
      } else {
        setVisible();
        customAlert.show({
          title: res.data.title,
          message: res.data.message,
        });
      }
    },
    [navigation, outMutation, setVisible],
  );

  return (
    <Dialog
      overlayStyle={styles.over}
      isVisible={visible}
      onBackdropPress={toggleDialog}
      style={styles.dialogBody}>
      <Dialog.Title
        title="Attendance Type"
        titleStyle={{color: '#ff008a', fontSize: 22}}
      />
      <View>
        {['In', 'Out'].map((l, i) => (
          <CheckBox
            key={i}
            title={l}
            checkedColor="#ff008a"
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === l}
            onPress={() => setChecked(l)}
          />
        ))}

        <ControlledInput
          formState={formState}
          control={control}
          name="notes"
          label="Enter note"
        />

        <ControlButton
          loading={isLoading || outMutation.isLoading}
          title="Submit"
          onPress={
            checked === 'In'
              ? handleSubmit(onSubmitIn)
              : handleSubmit(onSubmitOut)
          }
        />
      </View>
    </Dialog>
  );
};

export default NoteDialog;

const styles = StyleSheet.create({
  dialogBody: {
    backgroundColor: 'blue',
  },
  over: {
    backgroundColor: 'white',
  },
});
