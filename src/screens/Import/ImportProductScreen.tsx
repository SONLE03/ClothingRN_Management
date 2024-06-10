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
  Modal
} from 'react-native';
import { DataTable, Menu, Divider, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoaderKit from 'react-native-loader-kit'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import Modal from 'react-native-modal';
import { GetAllImport } from '../../api/import/GetAllImport';
import { ImportDetailResponse, ImportInvoice } from '../../types/Import';
import { GetUserById } from '../../api/users/GetUserById';
import { UserProps } from '../../types/User';
import { GetImportById } from '../../api/import/GetImportDetais';

const ImportProductScreen = ({ navigation }: any) => {
  const [imports, setImports] = useState<ImportInvoice[]>([]);
  const [selectedImport, setSelectedImport] = useState<ImportInvoice | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [importDetails, setImportDetails] = useState<ImportDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
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

  const handleViewDetails = async (record: ImportInvoice) => {
    try {
        const userData = await GetUserById(record.createdBy);
        setUser(userData);
        const importData = await GetImportById(record.id);
        setImportDetails(importData.data);
        setSelectedImport(record);
        setDrawerVisible(true);
    } catch (error) {
        console.error('Failed to fetch import details:', error);
    }
};


  const handleAddImport = () => {
    navigation.navigate('AddImportProductScreen');
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
              <Text className='ml-2 text-gray-800'>Imports List</Text>
            </Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
        <View className="flex-row justify-start items-center border border-orange-400 rounded-2xl p-4 mb-5 h-14">
          <MaterialComunityIcons name="home-search" color="gray" size={25} className="mr-2" />
          <TextInput
            placeholder="Find your imports here..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholderTextColor="#B0B0B0"
            className="flex-1 text-base h-10 text-gray-500"
          />
          <TouchableOpacity onPress={fetchData}>
            <MaterialComunityIcons name="refresh" color="gray" size={25} className="ml-2" />
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
                <DataTable.Row className='border-none border-b-gray-500 rounded-xl mb-2' key={item.id} onPress={() => handleViewDetails(item)}>
                  <DataTable.Cell className='flex justify-center items-center'textStyle={{ color: '#4A5568', fontSize: 16 }} >{item.createdAt}</DataTable.Cell>
                  <DataTable.Cell className='flex justify-center items-center' textStyle={{ color: '#4A5568', fontSize: 16 }} numeric>{item.total} VND</DataTable.Cell>
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
                        onPress={() => handleViewDetails(item)} title="View detail" />
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

        <Modal visible={drawerVisible} animationType="slide">
                <View className="p-4 flex-1">
                    <View className="flex-row justify-center items-center bg-orange-500 h-12 rounded-2xl p-2">
                        <Text className="text-xl font-bold text-center text-white "><Ionicons name="sparkles" size={25} color="white" /> Import Details</Text>
                    </View>  
                    
                    {selectedImport && (
                        <>
                            <View className="flex-row justify-between items-center border border-b-gray-300 border-x-white border-t-white mt-16">
                                <Text className="font-bold text-lg text-gray-600"><Ionicons name="calendar-outline" size={20} color="black" />  Import Date:</Text>
                                <Text className="text-gray-600 text-lg">
                                    {new Intl.DateTimeFormat('default', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false // Use 24-hour format
                                    }).format(new Date(selectedImport.createdAt))}
                                </Text>
                            </View>

                            <View className="flex-row justify-between items-center mt-6 border border-b-gray-300 border-x-white border-t-white">
                                <Text className="font-bold text-lg text-gray-600"> <Ionicons name="person-outline" size={20} color="black" /> Importer:</Text>
                                <Text className="text-gray-600 text-lg">{user ? user.fullName : selectedImport.createdBy}</Text>
                            </View>

                            <View className="flex-row justify-between items-center mt-6 border border-b-gray-300 border-x-white border-t-white">
                                <Text className="font-bold text-lg text-gray-600"><Ionicons name="cash-outline" size={20} color="black" />  Total bills:</Text>
                                <Text className="text-gray-600 text-lg">{selectedImport.total}</Text>
                            </View>

                            <View className="flex-row justify-between items-center mt-8 border border-b-gray-300 border-x-white border-t-white">
                                <Text className="font-bold text-lg text-center text-gray-600"> List of products imported</Text>
                                
                            </View>
                        </>
                    )}
                    <DataTable className='mt-2 border border-gray-400 rounded-xl font-semibold text-lg text-center p-1 '>
                        <DataTable.Header>
                           
                            <DataTable.Title className='flex justify-start' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Product Name</DataTable.Title>
                            <DataTable.Title className='flex justify-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Quantity</DataTable.Title>
                            <DataTable.Title className='flex justify-center' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Price</DataTable.Title>
                            <DataTable.Title className='flex justify-end' textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Total</DataTable.Title>
                        </DataTable.Header>
                        {importDetails && importDetails.importItemResponseList?.map((item, index) => (
                            <DataTable.Row key={index}>
                                
                                <DataTable.Cell>{item.productItem}</DataTable.Cell>
                                <DataTable.Cell className='flex justify-center' textStyle={{ color: '#4A5568', fontSize: 16}}>{item.quantity}</DataTable.Cell>
                                <DataTable.Cell className='flex justify-center' textStyle={{ color: '#4A5568', fontSize: 16}}>{item.price}</DataTable.Cell>
                                <DataTable.Cell className='flex justify-end' textStyle={{ color: '#4A5568', fontSize: 16}}>{item.total}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    
                    
                    <TouchableOpacity className= 'flex flex-row justify-center items-center h-12 bg-orange-500 p-2 rounded-xl mt-8'  onPress={() => setDrawerVisible(false)} >
                        <Text className="text-white font-bold text-lg">Close</Text>
                    </TouchableOpacity>
                    
                    </View>
                    
            
            </Modal>
        
      </SafeAreaView>
    </Provider>
  );
}
export default ImportProductScreen;
