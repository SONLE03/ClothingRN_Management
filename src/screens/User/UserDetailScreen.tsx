import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Alert,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserPropsDetail } from '../../types/User';
import { GetUserById } from '../../api/users/GetUserById';
const UserDetailScreen = ({navigation, route} : any) => {
    const { item } = route.params

    return(
        <SafeAreaView className='flex-1 bg-gray-100 p-4'>
            <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
                <MaterialComunityIcons className='mr-2' name="format-color-fill" size={30} color="#333" />
                Staff Detail</Text>
                <View style={{ width: 24 }} />  
            </TouchableOpacity>
            <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Email <Text className='text-red-500 font-semibold'>*</Text></Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                
                    <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                    {item?.email}</Text>
                
                </View>
            </View>
            </>
            <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Full name <Text className='text-red-500 font-semibold'>*</Text></Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                
                    <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                    {item?.fullName}</Text>
                
                </View>
            </View>
            </>
            <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Phone <Text className='text-red-500 font-semibold'>*</Text></Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                
                    <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                    {item?.phone}</Text>
                
                </View>
            </View>
            </>
        </SafeAreaView>
      )
  }
export default UserDetailScreen;