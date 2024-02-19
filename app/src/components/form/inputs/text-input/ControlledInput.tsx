import {StyleSheet} from 'react-native';
import React from 'react';
import {Input} from '@rneui/base';
import {Controller, Control, FormState} from 'react-hook-form';

interface IControlledInput {
  label: string;
  name: string;
  control: Control<any>;
  formState: FormState<any>;
}

const ControlledInput: React.FC<IControlledInput> = ({
  label,
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
          placeholder={label}
          errorMessage={errors[name]?.message?.toString()}
          inputStyle={styles.input}
          placeholderTextColor="black"
          containerStyle={styles.inputContainer}
        />
      )}
    />
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  input: {
    height: 30,
    fontSize: 14,
  },

  inputContainer: {
    borderBottomColor: '#F00F89',
  },
});
