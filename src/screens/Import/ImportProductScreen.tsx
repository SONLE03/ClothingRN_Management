import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { DataTable, Menu, Divider, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoaderKit from 'react-native-loader-kit'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { GetAllImport } from '../../api/import/GetAllImport';
import { ImportInvoice } from '../../types/Import';

const ImportProductScreen = ({ navigation }: any) => {
  const [imports, setImports] = useState<ImportInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ImportInvoice | null>(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await GetAllImport();
      setImports(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filteredImport = imports.filter((invoice) =>
    invoice.createdAt.includes(searchText)
  );

  const handleAddImport = () => {
    navigation.navigate('AddImportProductScreen');
  };

  const handleViewDetail = (item: ImportInvoice) => {
    navigation.navigate('ImportDetail', { item: item });
  };
  const openMenu = (product: ImportInvoice) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <SafeAreaView className="flex-1 bg-white p-2">
          <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 space-y-0 text-black'>
              <MaterialIcons className='mr-2 mt-2' name="dataset" size={30} color="#333" />
              <Text className='ml-2'>Imports List</Text>
            </Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
        <View className="flex-row justify-start items-center border border-orange-400 rounded-2xl p-4 mb-5 h-14">
          <MaterialComunityIcons name="home-search" size={25} className="mr-2" />
          <TextInput
            placeholder="Find your imports here..."
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
          <ScrollView>
            <DataTable className='mt-4 border border-gray-400 rounded-xl font-semibold text-lg text-center '>
              <DataTable.Header className='border-b-gray-500'>
                <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Date</DataTable.Title>
                <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }} >Total</DataTable.Title>
                <DataTable.Title className='flex justify-center items-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Actions</DataTable.Title>
              </DataTable.Header>

              {filteredImport.map((item) => (
                <DataTable.Row className='border-none border-b-gray-500 rounded-xl mb-2' key={item.id} onPress={() => handleViewDetail(item)}>
                  <DataTable.Cell className='flex justify-center items-center' >{item.createdAt}</DataTable.Cell>
                  <DataTable.Cell className='flex justify-center items-center' numeric>{item.total} VND</DataTable.Cell>
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
                        onPress={() => handleViewDetail(item)} title="View detail" />
                      <Divider />
                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        )}
        <TouchableOpacity
          onPress={handleAddImport}
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
        
      </SafeAreaView>
    </Provider>
  );
}
export default ImportProductScreen;
