import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import PasswordInput from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import loginUser from '../../api/auth/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../util/AuthContext';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { authEmitter } = useAuth();

  useEffect(() => {
    setUserName('');
    setPassword('');
  }, []);

  const handleRegister = () => {
    navigation.navigate('SignupScreen' as never);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Lack of information');
    } else {
      const data = await loginUser(username, password);
      if (!data) {
        Alert.alert('Đăng nhập không thành công');
      } else {
        try {
          await AsyncStorage.setItem('access_token', JSON.stringify(data.access));
          await AsyncStorage.setItem('refresh_token', JSON.stringify(data.refresh));
          await AsyncStorage.setItem('user_id', JSON.stringify(data.id));
          await AsyncStorage.setItem('role', JSON.stringify(data.role));
          Alert.alert('Đăng nhập thành công');
          authEmitter.emit('loginStatusChanged');
        } catch (error) {
          console.log('Error storing data: ', error);
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          marginBottom={30}
          keyboardType="email-address"
          onChangeText={(email) => setUserName(email)}
        />

        <PasswordInput
          label={'Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          marginBottom={30}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity onPress={handleForgotPassword} style={{ alignSelf: 'flex-end' }}>
          <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Forgot Password?</Text>
        </TouchableOpacity>

        <CustomButton label={'Login'} onPress={handleLogin} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}></TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{ color: '#000000' }}>New to the app?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
