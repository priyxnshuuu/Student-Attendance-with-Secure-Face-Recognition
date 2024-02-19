import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Icon, Input} from '@rneui/base';
import {Controller, Control, FormState} from 'react-hook-form';

interface IControlledPasswordInput {
  label: string;
  name: string;
  control: Control<any>;
  formState: FormState<any>;
}

const ControlledPasswordInput: React.FC<IControlledPasswordInput> = ({
  label,
  name,
  control,
  formState: {errors},
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
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
          secureTextEntry={secureTextEntry}
          inputStyle={styles.input}
          placeholderTextColor="black"
          containerStyle={styles.inputContainer}
          rightIcon={
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon
                name={!secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                type="ionicon"
                color="black"
              />
            </TouchableOpacity>
          }
        />
      )}
    />
  );
};

export default ControlledPasswordInput;

const styles = StyleSheet.create({
  input: {
    height: 30,
    fontSize: 14,
  },

  inputContainer: {
    borderBottomColor: '#F00F89',
  },
});
