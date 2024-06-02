import React, { ReactNode } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputFieldProps {
  label: string;
  icon: ReactNode;
  marginBottom: number;
  onChangeText: (text: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  marginBottom,
  onChangeText,
  keyboardType = 'default', // Default value
}) => {
  return (
    <View style={[styles.container, { marginBottom }]}>
      {icon}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={styles.input}
        onChangeText={onChangeText}
        placeholderTextColor="#000000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: '#000000',
  },
});

export default InputField;
