import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { DataTable, Dialog, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, Size, ProductItemRequest, ProductItem } from '../../../types/Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetDetailProduct } from '../../../api/product/product/GetDetailProduct';
const ProductDetailScreen = ({navigation, route}: any) => {
    const { item } = route.params;
    const [productItems, setProductItems] = useState<ProductItem[]>([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        if(item == null){
            Alert.alert("Product not found");
            return;
        }
        try {
            const data = await GetDetailProduct(item.id);
            setProductItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <SafeAreaView>
            <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
                <MaterialCommunityIcons className='mr-2' name="sticker-plus-outline" size={30} color="#333" />
                Product Detail </Text>
                <View style={{ width: 24 }} />  
            </TouchableOpacity>
            <ScrollView className="p-4">
                <>
                    <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                        <Text className='font-semibold text-lg text-gray-600' >Name of product</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        
                        <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600' style={{flex: 1, fontSize: 17}}>
                        {item?.product_Name}</Text>
                        
                    </View>
                    </View>
                </>
                <>
                    <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                        <Text className='font-semibold text-lg text-gray-600' >Price</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        
                        <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600'style={{flex: 1, fontSize: 17}}>
                        {item?.price}</Text>
                        
                    </View>
                    </View>
                </>
                <>
                    <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                        <Text className='font-semibold text-lg text-gray-600' >Category</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        
                        <Text className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600'style={{flex: 1, fontSize: 17}}>
                        {item?.category}</Text>
                        
                    </View>
                    </View>
                </>
                <>
                    <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                        <Text className='font-semibold text-lg text-gray-600' >Branch</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        
                        <Text className='text-gray-600 border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                        {item?.branch}</Text>
                        
                    </View>
                    </View>
                </>
                <>
                    <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                    <View className='flex flex-row'>
                        <Text className='font-semibold text-lg text-gray-600' >Description</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        
                        <Text className='text-gray-600 border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'style={{flex: 1, fontSize: 17}}>
                        {item?.description}</Text>
                        
                    </View>
                    </View>
                </>
                <DataTable className='mt-4 border border-gray-400 rounded-xl font-semibold text-lg '>
                    <DataTable.Header>
                        <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Color</DataTable.Title>
                        <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Size</DataTable.Title>
                        <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Quantity</DataTable.Title>
                    </DataTable.Header>

                    {productItems.map((item, index) => (
                        <DataTable.Row className='border border-gray-400 rounded-xl' key={index}>
                            <DataTable.Cell className='flex justify-center items-center' textStyle={{color: '#4A5568', fontSize: 16 }}>{item.colorName}</DataTable.Cell>
                            <DataTable.Cell className='flex justify-center items-center' textStyle={{color: '#4A5568', fontSize: 16 }}>{item.sizeName}</DataTable.Cell>
                            <DataTable.Cell className='flex justify-center items-center' textStyle={{color: '#4A5568', fontSize: 16 }}>{item.quantity}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
                <View className="mt-64"></View>
            </ScrollView>
        </SafeAreaView>

    )
}
export default ProductDetailScreen;