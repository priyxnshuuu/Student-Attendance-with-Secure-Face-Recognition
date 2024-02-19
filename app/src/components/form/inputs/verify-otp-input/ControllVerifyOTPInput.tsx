import {StyleSheet} from 'react-native';
import React from 'react';
import {Input} from '@rneui/base';
import {Controller, Control, FormState} from 'react-hook-form';

interface IVerifyOTPInput {
  name: string;
  control: Control<any>;
  formState: FormState<any>;
}

const ControlVerifyOTPInput: React.FC<IVerifyOTPInput> = ({
  name,
  control,
  formState: {errors},
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onBlur, onChange, value}}) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          errorMessage={errors[name]?.message?.toString()}
          inputStyle={styles.input}
          placeholderTextColor="black"
          containerStyle={styles.inputContainer}
          keyboardType="numeric"
        />
      )}
    />
  );
};

export default ControlVerifyOTPInput;

const styles = StyleSheet.create({
  input: {
    height: 30,
    marginBottom: 10,
    fontSize: 14,
  },

  inputContainer: {
    borderBottomColor: '#F00F89',
  },
});
