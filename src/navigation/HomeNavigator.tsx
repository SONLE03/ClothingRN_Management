import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangeProfile from '../screens/ChangeProfile';
import HomeScreen from '../screens/HomeScreen';
import CategoryMainScreen from '../screens/Category/CategoryMainScreen';
import CategoryScreen from '../screens/Category/Category/CategoryScreen';
import BranchScreen from '../screens/Category/Branch/BranchScreen';
import AddCategoryScreen from '../screens/Category/Category/AddCategoryScreen';
import EditCategoryScreen from '../screens/Category/Category/EditCategoryScreen';
import AddBranchScreen from '../screens/Category/Branch/AddBranchScreen';
import EditBranchScreen from '../screens/Category/Branch/EditBranchScreen';
import GenderScreen from '../screens/Category/Gender/GenderScreen';
import AddGenderScreen from '../screens/Category/Gender/AddGenderScreen';
import EditGenderScreen from '../screens/Category/Gender/EditGenderScreen';
import ProductMainScreen from '../screens/Product/ProductMainScreen';
import ColorScreen from '../screens/Product/Color/ColorScreen';
import SizeScreen from '../screens/Product/Size/SizeScreen';
import AddSizeScreen from '../screens/Product/Size/AddSizeScreen';
import AddColorScreen from '../screens/Product/Color/AddColorScreen';
import ProductScreen from '../screens/Product/Product/ProductScreen';
import AddProductScreen from '../screens/Product/Product/AddProductScreen';
import PromotionScreen from '../screens/Promotion/PromotionScreen';

import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

type HomeStackParamList = {
  HomeScreen: undefined;
  ChangeProfile: undefined;
  CategoryMainScreen: undefined;
  CategoryScreen: undefined;
  BranchScreen: undefined;
  GenderScreen: undefined;
  AddCategoryScreen: undefined;
  EditCategoryScreen: undefined;
  AddBranchScreen: undefined;
  EditBranchScreen: undefined;
  AddGenderScreen: undefined;
  EditGenderScreen: undefined;
  ProductMainScreen: undefined;
  ColorScreen: undefined;
  SizeScreen: undefined;
  AddSizeScreen: undefined;
  AddColorScreen: undefined;
  ProductScreen: undefined;
  AddProductScreen: undefined;
  PromotionScreen: undefined;

};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
        <Stack.Screen name="CategoryMainScreen" component={CategoryMainScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="BranchScreen" component={BranchScreen} />
        <Stack.Screen name="GenderScreen" component={GenderScreen} />
        <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} />
        <Stack.Screen name="EditCategoryScreen" component={EditCategoryScreen} />
        <Stack.Screen name="AddBranchScreen" component={AddBranchScreen} />
        <Stack.Screen name="EditBranchScreen" component={EditBranchScreen} />
        <Stack.Screen name="AddGenderScreen" component={AddGenderScreen} />
        <Stack.Screen name="EditGenderScreen" component={EditGenderScreen} />
        <Stack.Screen name="ProductMainScreen" component={ProductMainScreen} />
        <Stack.Screen name="ColorScreen" component={ColorScreen} />
        <Stack.Screen name="SizeScreen" component={SizeScreen} />
        <Stack.Screen name="AddSizeScreen" component={AddSizeScreen} />
        <Stack.Screen name="AddColorScreen" component={AddColorScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
      </Stack.Navigator>
    </ApplicationProvider>
  );
};

export default HomeNavigator;
