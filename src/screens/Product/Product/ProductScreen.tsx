import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { DataTable, Menu, Divider, Provider } from 'react-native-paper';
import { GetAllProducts } from '../../../api/product/product/GetAllProducts';
import { Product } from '../../../types/Product';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoaderKit from 'react-native-loader-kit'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const ProductScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await GetAllProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filteredProduct = products.filter((product) =>
    product.product_Name.toLowerCase().includes(searchText)
  );

  const handleAddProduct = () => {
    navigation.navigate('AddProductScreen');
  };

  const handleEdit = (item: Product) => {
    navigation.navigate('EditProductScreen', { item: item });
  };

  const handleDelete = (id: string) => {
    // Delete logic
  };

  const openMenu = (product: Product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <SafeAreaView className="flex-1 bg-white p-2">
        <ScrollView>
          <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 space-y-0 text-black'>
              <MaterialIcons className='mr-2 mt-2' name="dataset" size={30} color="#333" />
              <Text className='ml-2'>Products List</Text>
            </Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
        <View className="flex-row justify-start items-center border border-orange-400 rounded-2xl p-4 mb-5 h-14">
          <MaterialComunityIcons name="home-search" size={25} className="mr-2" />
          <TextInput
            placeholder="Find your products here..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholderTextColor="#B0B0B0"
            className="flex-1 text-base h-10"
          />
          <TouchableOpacity onPress={fetchData}>
            <MaterialComunityIcons name="refresh" size={25} className="ml-2" />
          </TouchableOpacity>
        </View>
        {loading ? (

           <View className="flex justify-center items-center h-screen">
              <LoaderKit
                style={{ width: 100, height: 100 }}
                name={'BallGridPulse'} 
                color={'orange'} 
              />
           </View>
        ) : (
          <DataTable className='mt-4 border border-gray-400 rounded-xl font-semibold text-lg text-center '>
            <DataTable.Header className='border-b-gray-500'>
              <DataTable.Title textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Image</DataTable.Title>
              <DataTable.Title textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Name</DataTable.Title>
              <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }} >Price</DataTable.Title>
              <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Actions</DataTable.Title>
            </DataTable.Header>

            {filteredProduct.map((item) => (
              <DataTable.Row className='border-none border-b-gray-500 rounded-xl mb-2' key={item.id}>
                <DataTable.Cell>
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        resizeMode: 'cover',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/user-128-128.png')}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        resizeMode: 'cover',
                      }}
                    />
                  )}
                </DataTable.Cell>
                <DataTable.Cell>{item.product_Name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.price} VND</DataTable.Cell>
                <DataTable.Cell className='flex justify-center items-center'>
                  <Menu 
                    visible={visible && selectedProduct?.id === item.id}
                    onDismiss={closeMenu}
                    anchor={
                      <TouchableOpacity className='border border-gray-400 rounded-full p-1' onPress={() => openMenu(item)}>
                        <Ionicons  name="ellipsis-vertical" size={20} color="#333" />
                      </TouchableOpacity>
                    }
                  >
                    <Menu.Item 
                      onPress={() => handleEdit(item)} title="Edit" />
                    <Divider />
                    <Menu.Item 
                      onPress={() => {
                        handleDelete(item.id);
                        closeMenu();
                      }}
                      title="Delete"
                    />
                  </Menu>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
        <TouchableOpacity
          onPress={handleAddProduct}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: 'orange',
            borderRadius: 30,
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default ProductScreen;
