import { getOrdersAnalysisByCustomer } from '../../api/order/getOrdersAnalysisByCustomer';
import { OrdersAnalysis } from '../../types/Order';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const CustomerDetailScreen = ({navigation, route} : any) => {
    const { item } = route.params
    const [orders, setOrders] = useState<OrdersAnalysis>();
    const handleCustomerHistory = (item : any) => {
        navigation.navigate('CustomerOrderScreen', {item: item});
    } 
    useEffect(() => {
        fetchData();
      }, []);
    
    const fetchData = async () => {
    try {
        if (item != null){
            const data = await getOrdersAnalysisByCustomer(item.id);
            setOrders(data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
      };
    return(
        <SafeAreaView className='flex-1 bg-gray-100 p-4'>
            <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
                <MaterialComunityIcons className='mr-2' name="format-color-fill" size={30} color="#333" />
                Customer Detail</Text>
                <View style={{ width: 24 }} />  
            </TouchableOpacity>
            <ScrollView>
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
                <>
                <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                    <Text className='font-semibold text-lg' >Số sản phẩm tiếp cận <Text className='text-red-500 font-semibold'>*</Text></Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                    
                        <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                        {orders?.distinctProductItemCount}</Text>
                    
                    </View>
                </View>
                </>
                <>
                <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                    <Text className='font-semibold text-lg' >Tổng số sản phẩm đã mua <Text className='text-red-500 font-semibold'>*</Text></Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                    
                        <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                        {orders?.totalQuantity}</Text>
                    
                    </View>
                </View>
                </>
                <>
                <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                    <Text className='font-semibold text-lg' >Số tiền đã mua hàng <Text className='text-red-500 font-semibold'>*</Text></Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                    
                        <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                        {orders?.totalAmount} VND</Text>
                    
                    </View>
                </View>
                </>
            </ScrollView>
            <>
                <TouchableOpacity className= 'flex flex-row justify-center items-center h-12 bg-orange-500 p-2 rounded-xl mt-8'  onPress={() => handleCustomerHistory(item)} >
                    <Text className="text-white font-bold text-lg">View order history</Text>
                </TouchableOpacity>
            </>
        </SafeAreaView>
      )
  }
export default CustomerDetailScreen;