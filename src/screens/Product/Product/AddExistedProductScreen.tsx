import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { DataTable, Dialog, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, Size, ProductItemRequest } from '../../../types/Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetAllColor } from '../../../api/product/color/GetAllColor';
import { GetAllSize } from '../../../api/product/size/GetAllSize';
import { AddExistedProduct } from '../../../api/product/product/AddExistedProduct';
const AddExistedProductScreen = ({navigation, route} : any) => {
    const { item } = route.params;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState<ProductItemRequest[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [selectedColor, setSelectedColor] = useState<IndexPath>(new IndexPath(0));
    const [selectedSize, setSelectedSize] = useState<IndexPath>(new IndexPath(0));
    const hideDialog = () => setVisible(false);
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const fetchedColors = await GetAllColor();
          const fetchedSizes = await GetAllSize();
          setColors(fetchedColors);
          setSizes(fetchedSizes);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    const addProductItem = () => {
        if (selectedColor && selectedSize) {
          const newProductItem: ProductItemRequest = {
            color: colors[selectedColor.row].id,
            size: sizes[selectedSize.row].id,
          };
          setProductItems([...productItems, newProductItem]);
        }
      };
    const removeProductItem = (index: number) => {
        const updatedProductItems = [...productItems];
        updatedProductItems.splice(index, 1);
        setProductItems(updatedProductItems);
      };

      const handleAddProduct = async () => { 
        if(item == null){
            Alert.alert("Product not found");
            return;
        }   
        if(productItems.length < 1){
            Alert.alert("Lack of information")
            return;
        }
        setLoading(true);
        try {
          const response = await AddExistedProduct(item.id, productItems);
          setVisible(true);
          setLoading(false);   
          setSelectedColor(new IndexPath(0));
          setSelectedSize(new IndexPath(0));
          setProductItems([]);
        } catch (error) {
          console.error(error);
          setVisible(false);
        }
      };
    
    return(
        <SafeAreaView>
            <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
                <MaterialCommunityIcons className='mr-2' name="sticker-plus-outline" size={30} color="#333" />
                Add product item</Text>
                <View style={{ width: 24 }} />  
            </TouchableOpacity>
            <ScrollView className="p-4">
            <View className="flex flex-col space-y-3 mt-4 mb-4 p-2 border border-orange-500 rounded-xl border-dashed">
            <Text className="text-lg font-bold">Colors and Sizes</Text>
              {colors.length > 0 && (
                <Select 
                  status='warning'
                  selectedIndex={selectedColor}
                  onSelect={index => setSelectedColor(index as IndexPath)}
                  value={colors[selectedColor.row]?.name}
                  className="border border-gray-600 hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4"
                >
                  {colors.map((color, index) => (
                    <SelectItem title={color.name} key={index}>
                      
                    </SelectItem>
                  ))}
                </Select>
              )}

              {sizes.length > 0 && (
                <Select
                  status='warning'
                  selectedIndex={selectedSize}
                  onSelect={index => setSelectedSize(index as IndexPath)}
                  value={sizes[selectedSize.row]?.name}
                  className="border border-gray-400 hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4"
                >
                  {sizes.map((size, index) => (
                    <SelectItem title={size.name} key={index} />
                  ))}
                </Select>
              )}
            </View>

            <Button className='mt-3 bg-orange-500 rounded-xl border border-orange-800 text-white font-semibold' textColor='white' onPress={addProductItem} icon='sticker-plus-outline'> Add Item </Button>

            <DataTable className='mt-4 border border-gray-400 rounded-xl font-semibold text-lg '>
              <DataTable.Header>
                <DataTable.Title textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Color</DataTable.Title>
                <DataTable.Title textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Size</DataTable.Title>
                <DataTable.Title textStyle={{ color: 'orange', fontSize: 16, fontWeight: 'bold' }}>Action</DataTable.Title>
              </DataTable.Header>

              {productItems.map((item, index) => (
                <DataTable.Row className='border border-gray-400 rounded-xl' key={index}>
                  <DataTable.Cell>{colors.find(color => color.id === item.color)?.name}</DataTable.Cell>
                  <DataTable.Cell>{sizes.find(size => size.id === item.size)?.name}</DataTable.Cell>
                  <DataTable.Cell>
                    <Button textColor='orange'  onPress={() => removeProductItem(index)}> Remove </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>

            <Button className='mt-4 bg-orange-500 rounded-xl border border-orange-800 text-white font-semibold' textColor='white' onPress={handleAddProduct} loading={loading}> Add Product Item </Button>
            <View className="mt-10"></View>
            {loading && <Text>Loading...</Text>}
            {/* {message && <Text>{message}</Text> } */}

            
              <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
                <Dialog.Title className="text-center text-green-600 font-semibold">Product item added successfully!</Dialog.Title>
                <Dialog.Content>
                  <Text className='text-center text-green-600' >Congratulation! You have successfully added a product item!</Text>
                </Dialog.Content>
              </Dialog>
            </ScrollView>

        </SafeAreaView>
    )
}

export default AddExistedProductScreen;