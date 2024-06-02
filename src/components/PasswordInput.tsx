import React, { useState, ReactNode } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface PasswordInputProps {
  label: string;
  icon: ReactNode;
  onChangeText: (text: string) => void;
  marginBottom: number;
  keyboardType?: TextInputProps['keyboardType'];
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  icon,
  onChangeText,
  marginBottom,
  keyboardType = 'default', // Default value
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, { marginBottom }]}>
      {icon}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={styles.input}
        secureTextEntry={!showPassword}
        onChangeText={onChangeText}
        placeholderTextColor="#000000"
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Feather
          name={showPassword ? 'eye' : 'eye-off'}
          size={20}
          color="#AD40AF"
          style={styles.icon}
        />
      </TouchableOpacity>
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
  icon: {
    marginLeft: 5,
  },
});

export default PasswordInput;
