import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GetDetailCoupon } from '../../api/coupon/GetDetailCoupon';
import { Coupon } from '../../types/Coupon';
const CouponDetailScreen = ({navigation, route} : any) => {
    const { item } = route.params;
    const [coupon, setCoupon] = useState<Coupon>();
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
          const data = await GetDetailCoupon(item.id);
          setCoupon(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    return(
        <SafeAreaView className='flex-1 bg-gray-100 p-4'>
          <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
              <MaterialCommunityIcons className='mr-2' name="developer-board" size={30} color="#333" />
              Coupon Detail</Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
          <ScrollView>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Name of coupon <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                {coupon?.name}</Text>
                
              </View>
            </View>
          </>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Start date <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
              <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
              {coupon?.startDate.toString()}</Text>
                
              </View>
            </View>
          </>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >End date <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                {coupon?.endDate.toString()}</Text>
              </View>
            </View>
          </>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Discount value  <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                {coupon?.discountValue}</Text>
                
              </View>
            </View>
          </>   
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Minimum bill  <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                {coupon?.minimumBill}</Text>
                
              </View>
            </View>
          </>   
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Quantity  <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>  
                <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                {coupon?.quantity}</Text>              
              </View>
            </View>
          </>   
          </ScrollView>
        </SafeAreaView>
    )
}
export default CouponDetailScreen;