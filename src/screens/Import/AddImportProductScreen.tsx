import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, Button, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-paper';
import { Input, Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddNewImport } from '../../api/import/AddImport';
import { GetAllProducts } from '../../api/product/product/GetAllProducts';
import { GetDetailProduct } from '../../api/product/product/GetDetailProduct';

import { Product, ProductItem } from '../../types/Product';
import { AddImportItem } from '../../types/Import';
//import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import HeaderBar from '../../components/HeaderBar';
import { Dialog } from 'react-native-paper';

const AddImport = ({navigation}: any) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [selectedProductItem, setSelectedProductItem] = useState<ProductItem | null>(null);
    const [importItems, setImportItems] = useState<AddImportItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    //const navigation = useNavigation();

    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await GetAllProducts();
                setProducts(response);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    const handleProductChange = async (productId: string) => {
        try {
            const items = await GetDetailProduct(productId);
            setProductItems(items);
            setSelectedProductItem(null);
            setQuantity(null);
            setPrice(null);
            setVisible(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch product details');
        }
    };

    const handleAddItem = () => {
        if (selectedProductItem && quantity && price) {
            const newItem: AddImportItem = {
                productItemId: selectedProductItem.id,
                quantity,
                price,
                total: quantity * price
            };
            importItems.push(newItem);
            setImportItems(importItems);
            //console.log(importItems);
            //console.log(newItem);
            setSelectedProductItem(null);
            setQuantity(null);
            setPrice(null);
        } else {
            Alert.alert('Error', 'Please complete all fields');
        }
    };

    const handleRemoveItem = (index: number) => {
        const newItems = importItems.filter((_, i) => i !== index);
        setImportItems(newItems);
    };

    const handleFinish = async () => {
        setLoading(true);
        try {
          console.log(importItems);
            await AddNewImport(importItems);

            Alert.alert('Success', 'Import added successfully');
            setTimeout(() => {
                navigation.navigate('ListImports');
            }, 1500);
        } catch (error) {
            Alert.alert('Error', 'Failed to add import');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className='flex-1 bg-gray-100'>
          <HeaderBar title="Import products" />
          <View className='flex-1 p-2'>
          <View className='mb-2 flex w-full p-2 h-12 border border-orange-500 rounded-xl'>
            <Dropdown 
                  labelField="label"
                  valueField="value"
                  placeholder="Select a product"
                  value={selectedProductItem?.id}
                  onChange={item => handleProductChange(item.value)}
                  data={products.map(product => ({ label: product.product_Name, value: product.id }))}
              />
          </View>

          <View className='mb-6 mt-2 flex w-full p-2 h-12 border border-orange-500 rounded-xl'>  
              <Dropdown
                  labelField="label"
                  valueField="value"
                  placeholder="Select a product item"
                  value={selectedProductItem?.id}
                  onChange={item => setSelectedProductItem(productItems.find(productItem => productItem.id === item.value) || null)}
                  data={productItems.map(item => ({ label: `${item.sizeName} - ${item.colorName}`, value: item.id }))}
              />
          </View>
            <Input className='border border-orange-500 rounded-xl p-2'
                label="Quantity"
                keyboardType="numeric"
                onChangeText={value => setQuantity(Number(value))}
                value={quantity ? quantity.toString() : ''}
            />
            <Input className='border border-orange-500 rounded-xl p-2'
                label="Price"
                keyboardType="numeric"
                onChangeText={value => setPrice(Number(value))}
                value={price ? price.toString() : ''}
            />

            <View className='flex flex-row justify-center items-center w-full h-14 mb-2'>
              <TouchableOpacity className=' bg-orange-500 rounded-xl mt-1 p-2 w-1/2 h-10 flex justify-center items-center' onPress={handleAddItem}>
                  <Text className='text-white font-semibold'>Add Item</Text>
              </TouchableOpacity>

            </View>
            
            <FlatList className='border border-orange-500 rounded-xl p-2 mt-2 mb-4'
                data={importItems}
                keyExtractor={item => item.productItemId}
                renderItem={({ item, index }) => (
                    <View className='flex-col'>
                        <Text>Product Item: {item.productItemId}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Text>Price: {item.price}</Text>
                        <Text>Total: {item.total}</Text>
                        <Button title="Remove" onPress={() => handleRemoveItem(index)} />
                    </View>
                )}
            />

            
            <View className='flex flex-row justify-center items-center w-full h-14 mb-2'>
              <TouchableOpacity className=' bg-orange-500 rounded-xl mt-1 p-2 w-full h-10 flex justify-center items-center' onPress={handleFinish}  disabled={!importItems.length}>
                  <Text className='text-white font-semibold'>Import products</Text>
              </TouchableOpacity>

            </View>

            <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
              <Dialog.Title className="text-center text-green-600 font-semibold">Category added successfully!</Dialog.Title>
              <Dialog.Content>
                <Text className='text-center text-green-600' >Congratulation! You have successfully added a new category!</Text>
              </Dialog.Content>
            </Dialog>

            
          </View>
          
        </View>
    );
};

export default AddImport;
