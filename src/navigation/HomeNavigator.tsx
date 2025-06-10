import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CategoryMainScreen from '../screens/Category/CategoryMainScreen';
import CategoryScreen from '../screens/Category/Category/CategoryScreen';
import BranchScreen from '../screens/Category/Branch/BranchScreen';
import AddCategoryScreen from '../screens/Category/Category/AddCategoryScreen';
import EditCategoryScreen from '../screens/Category/Category/EditCategoryScreen';
import AddBranchScreen from '../screens/Category/Branch/AddBranchScreen';
import EditBranchScreen from '../screens/Category/Branch/EditBranchScreen';
import FTypeScreen from '../screens/Category/FurnitureType/FTypeScreen';
import AddFTypeScreen from '../screens/Category/FurnitureType/AddFTypeScreen';
import EditFTypeScreen from '../screens/Category/FurnitureType/EditFTypeScreen';
import ProductMainScreen from '../screens/Product/ProductMainScreen';
import ColorScreen from '../screens/Product/Color/ColorScreen';
import SizeScreen from '../screens/Product/Size/SizeScreen';
import AddSizeScreen from '../screens/Product/Size/AddSizeScreen';
import AddColorScreen from '../screens/Product/Color/AddColorScreen';
import ProductScreen from '../screens/Product/Product/ProductScreen';
import AddProductScreen from '../screens/Product/Product/AddProductScreen';
import PromotionScreen from '../screens/Promotion/PromotionScreen';
import AddEditPromotionScreen from '../screens/Promotion/AddEditPromotionScreen';
import CouponDetailScreen from '../screens/Promotion/CouponDetailScreen';
import AddExistedProductScreen from '../screens/Product/Product/AddExistedProductScreen';
import ProductDetailScreen from '../screens/Product/Product/ProductDetailScreen';
import ImportProductScreen from '../screens/Import/ImportProductScreen';
import AddImportProductScreen from '../screens/Import/AddImportProductScreen';
import OrderHistoryScreen from '../screens/Order/OrderHistoryScreen';
import ChangePasswordScreen from '../screens/Auth/ChangePassword';
import ProfileScreen from '../screens/Profile/Profile';
import UserScreen from '../screens/User/UserScreen';
import DailyReportScreen from '../screens/Report/DailyReport';
import AddUserScreen from '../screens/User/AddUserScreen';
import UserDetailScreen from '../screens/User/UserDetailScreen';
import CustomerScreen from '../screens/Customer/CustomerScreen';
import CustomerDetailScreen from '../screens/Customer/CustomerDetailScreen';
import CustomerOrderScreen from '../screens/Customer/CustomerOrderScreen';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

type HomeStackParamList = {
  HomeScreen: undefined;
  ChangePasswordScreen: undefined;
  CategoryMainScreen: undefined;
  CategoryScreen: undefined;
  BranchScreen: undefined;
  FTypeScreen: undefined;
  AddCategoryScreen: undefined;
  EditCategoryScreen: undefined;
  AddBranchScreen: undefined;
  EditBranchScreen: undefined;
  AddFTypeScreen: undefined;
  EditFTypeScreen: undefined;
  ProductMainScreen: undefined;
  ColorScreen: undefined;
  SizeScreen: undefined;
  AddSizeScreen: undefined;
  AddColorScreen: undefined;
  ProductScreen: undefined;
  AddProductScreen: undefined;
  PromotionScreen: undefined;
  AddEditPromotionScreen: undefined;
  CouponDetailScreen: undefined;
  AddExistedProductScreen: undefined;
  ProductDetailScreen: undefined;
  ImportProductScreen: undefined;
  AddImportProductScreen: undefined;
  OrderHistoryScreen: undefined;
  ProfileScreen: undefined;
  UserScreen: undefined;
  DailyReportScreen: undefined;
  AddUserScreen: undefined;
  UserDetailScreen: undefined;
  CustomerScreen: undefined;
  CustomerDetailScreen: undefined;
  CustomerOrderScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CategoryMainScreen" component={CategoryMainScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="BranchScreen" component={BranchScreen} />
        <Stack.Screen name="FTypeScreen" component={FTypeScreen} />
        <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} />
        <Stack.Screen name="EditCategoryScreen" component={EditCategoryScreen} />
        <Stack.Screen name="AddBranchScreen" component={AddBranchScreen} />
        <Stack.Screen name="EditBranchScreen" component={EditBranchScreen} />
        <Stack.Screen name="AddFTypeScreen" component={AddFTypeScreen} />
        <Stack.Screen name="EditFTypeScreen" component={EditFTypeScreen} />
        <Stack.Screen name="ProductMainScreen" component={ProductMainScreen} />
        <Stack.Screen name="ColorScreen" component={ColorScreen} />
        <Stack.Screen name="SizeScreen" component={SizeScreen} />
        <Stack.Screen name="AddSizeScreen" component={AddSizeScreen} />
        <Stack.Screen name="AddColorScreen" component={AddColorScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
        <Stack.Screen name="AddEditPromotionScreen" component={AddEditPromotionScreen} />
        <Stack.Screen name="CouponDetailScreen" component={CouponDetailScreen} />
        <Stack.Screen name="AddExistedProductScreen" component={AddExistedProductScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="ImportProductScreen" component={ImportProductScreen} />
        <Stack.Screen name="AddImportProductScreen" component={AddImportProductScreen} />
        <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="DailyReportScreen" component={DailyReportScreen} />
        <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
        <Stack.Screen name="CustomerScreen" component={CustomerScreen} />
        <Stack.Screen name="CustomerDetailScreen" component={CustomerDetailScreen} />
        <Stack.Screen name="CustomerOrderScreen" component={CustomerOrderScreen} />
      </Stack.Navigator>
    </ApplicationProvider>
  );
};

export default HomeNavigator;
