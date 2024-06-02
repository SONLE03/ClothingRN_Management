import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/Auth/Signup';
import HomeScreen from '../screens/HomeScreen';
type HomeStackParamList = {
  HomeScreen: undefined;
  SignupScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
