import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {getOrdersAnalysisByCustomer} from '../../api/order/GetOrdersAnalysisByCustomer';
import {OrdersAnalysis} from '../../entity/Order';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';

const CustomerDetailScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const [orders, setOrders] = useState<OrdersAnalysis>();
  const handleCustomerHistory = (item: any) => {
    navigation.navigate('CustomerOrderScreen', {item: item});
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (item != null) {
        const data = await getOrdersAnalysisByCustomer(item.id);
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <TouchableOpacity className="flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white">
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#333"
        />
        <Text className="flex-row text-2xl font-semibold space-x-2 text-black">
          <MaterialComunityIcons
            className="mr-2"
            name="format-color-fill"
            size={30}
            color="#333"
          />
          Customer Detail
        </Text>
        <View style={{width: 24}} />
      </TouchableOpacity>
      <ScrollView>
        <>
          {/* Avatar */}
          <View className="flex-row justify-center w-full p-2  rounded-xl  mt-8">
            <Avatar.Image
              size={100}
              source={{
                uri: item?.ImageSource
                  ? item?.ImageSource
                  : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              }}
            />
          </View>

          <Text className="text-xl font-semibold text-orange-600 mt-8">
            Customer Information
          </Text>
          {/* Email */}
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Email{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
                style={{flex: 1, fontSize: 17}}>
                {item?.Email}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Full name{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
                style={{flex: 1, fontSize: 17}}>
                {item?.FullName}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Phone{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
                style={{flex: 1, fontSize: 17}}>
                {item?.PhoneNumber}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Date of birth{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
                style={{flex: 1, fontSize: 17}}>
                {item?.DateOfBirth.split('T')[0]}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Account status{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
                style={{flex: 1, fontSize: 17}}>
                {item?.IsLocked === true ? 'Locked' : 'Active'}
              </Text>
            </View>
          </View>
        </>
        <Text className="text-xl font-semibold text-orange-600 mt-8">
          Customer Purchase History
        </Text>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Total reached products{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
                style={{flex: 1, fontSize: 17}}>
                {orders?.distinctProductItemCount || 0} products
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Total bought products{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className="border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
                style={{flex: 1, fontSize: 17}}>
                {orders?.totalQuantity || 0} products
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-500">
                Total order amount{' '}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-gray-500 text-lg"
                style={{flex: 1, fontSize: 17}}>
                {orders?.totalAmount || 0} VND
              </Text>
            </View>
          </View>
        </>
      </ScrollView>
      <>
        <TouchableOpacity
          className="flex flex-row justify-center items-center h-12 bg-orange-500 p-2 rounded-xl mt-8"
          onPress={() => handleCustomerHistory(item)}>
          <Text className="text-white font-bold text-lg ">
            View order history
          </Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};
export default CustomerDetailScreen;
