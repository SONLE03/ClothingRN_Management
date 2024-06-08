import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Color, Size, ProductItemRequest, ProductItem, Product } from '../../types/Product';
import { GetAllProducts } from "../../api/product/product/GetAllProducts";
import { GetDetailProduct } from "../../api/product/product/GetDetailProduct";
const AddImportProductScreen = ({navigation} : any) => {
    const [products, setProduct] = useState<Product[]>([]);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IndexPath>(new IndexPath(0));
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const data = await GetAllProducts();
            setProduct(data);
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
                Import Product</Text>
                <View style={{ width: 24 }} />  
            </TouchableOpacity>
            <View className="flex flex-col space-y-3 mt-4 mb-4 p-2 border border-orange-500 rounded-xl border-dashed">
            <Text className="text-lg font-bold">Category and Branch</Text>
              {products.length > 0 && (
                <Select 
                  status='warning'
                  selectedIndex={selectedProduct}
                  onSelect={index => setSelectedProduct(index as IndexPath)}
                  value={products[selectedProduct.row]?.product_Name}
                  className="border border-gray-400 bg-white hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4"
                >
                  {products.map((product, index) => (
                    <SelectItem title={product.product_Name} key={index} />
                  ))}
                </Select>
              )}
            </View>

            <ScrollView className="p-4">

            </ScrollView>
        </SafeAreaView>
    )
}
export default AddImportProductScreen;