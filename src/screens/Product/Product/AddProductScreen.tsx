import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { DataTable, Dialog, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

import { GetAllCategory } from '../../../api/category/category/GetAllCategory';
import { GetAllBranch } from '../../../api/category/branch/GetAllBranch';
import { GetAllColor } from '../../../api/product/color/GetAllColor';
import { GetAllSize } from '../../../api/product/size/GetAllSize';
import { AddProduct } from '../../../api/product/product/AddNewProduct';

import { Category, Branch } from '../../../types/Category';
import { Color, Size, CreateProductForm, ProductItemRequest, ProductRequest } from '../../../types/Product';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoaderKit from 'react-native-loader-kit'
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define a type that extends File with a uri property for image handling
interface ImageFile extends File {
  uri: string;
}

const AddProductScreen = ({ navigation }: any) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IndexPath>(new IndexPath(0));
  const [selectedBranch, setSelectedBranch] = useState<IndexPath>(new IndexPath(0));
  const [selectedColor, setSelectedColor] = useState<IndexPath>(new IndexPath(0));
  const [selectedSize, setSelectedSize] = useState<IndexPath>(new IndexPath(0));
  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [productItems, setProductItems] = useState<ProductItemRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isAttempted, setIsAttempted] = useState(false);

  const hideDialog = () => setVisible(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedCategories = await GetAllCategory();
      const fetchedBranches = await GetAllBranch();
      const fetchedColors = await GetAllColor();
      const fetchedSizes = await GetAllSize();
      setCategories(fetchedCategories);
      setBranches(fetchedBranches);
      setColors(fetchedColors);
      setSizes(fetchedSizes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 4,
      quality: 1,
    });

    if (!result.didCancel && result.assets) {
      const selectedImages = result.assets.slice(0, 4).map(asset => ({
        uri: asset.uri || '', // Ensuring uri is a string
        name: asset.fileName || 'image.jpg',
        type: asset.type || 'image/jpeg',
      })) as ImageFile[];
      setImages([...images, ...selectedImages].slice(0, 4));
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
    if (!categories[selectedCategory.row] || !branches[selectedBranch.row]) {
      setMessage('Please select category and branch.');
      return;
    }

    const productRequest: ProductRequest = {
      product_Name: productName,
      description,
      price: parseFloat(price),
      category: categories[selectedCategory.row].id,
      branch: branches[selectedBranch.row].id,
      productItemRequests: productItems,
    };

    const data: CreateProductForm = {
      productRequest,
      image: images as unknown as File[], // Type casting to File[]
    };

    
    setLoading(true);
    try {
      const response = await AddProduct(data);

      setVisible(true);
      //Alert.alert('Product added successfully!');
      setLoading(false);
      
      setIsProductAdded(true);

      setProductName('');
      setDescription('');
      setPrice('');
      setSelectedCategory(new IndexPath(0));
      setSelectedBranch(new IndexPath(0));
      setSelectedColor(new IndexPath(0));
      setSelectedSize(new IndexPath(0));
      setImages([]);
      setProductItems([]);
    } catch (error) {
      console.error(error);
      //Alert.alert('Failed to add product');
      setVisible(false);
      //setIsProductAdded(false);
    }
    //setLoading(false);
    setIsAttempted(true);
  };

  return (
    <SafeAreaView>
      <ScrollView className="p-4">
      <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
              <MaterialCommunityIcons className='mr-2' name="sticker-plus-outline" size={30} color="#333" />
              Add product</Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
            <View className="flex flex-col space-y-3 mt-4 mb-4 p-2 border border-orange-500 rounded-xl border-dashed">
              <Text className="text-lg font-bold mb-2">Upload Images</Text>
              <TouchableOpacity className="flex flex-row justify-center items-center space-x-2 bg-gray-200 p-4 rounded-lg border border-orange-400 border-dotted" onPress={pickImage}>
                <MaterialIcons name="add-to-photos" size={24} color="orange" />
                <Text className="text-center font-medium">Choose Images (Max 4)</Text>
              </TouchableOpacity>
              <View className="flex-row mt-4">
                {images.map((image, index) => (
                  <View key={index} className="relative mr-2">
                    <Image className='border border-gray-700 rounded-lg' source={{ uri: image.uri }} style={{ width: 50, height: 50 }} />
                    <TouchableOpacity
                      className="absolute top-0 right-0 bg-red-600 rounded-full w-4 h-4"
                      onPress={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      <MaterialCommunityIcons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
                
            <View className="flex flex-col space-y-3 mt-4 mb-4 p-2 border border-orange-500 rounded-xl border-dashed">
              <Text className="text-lg font-bold mb-2">Product Details</Text>   
              <TextInput
                className="border border-gray-400 hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4 bg-white"
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
              />
              <TextInput
                className="border border-gray-400 hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4 bg-white h-16"
                placeholder="Description"
                multiline
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                className="border border-gray-400 hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4 bg-white"
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>

            <View className="flex flex-col space-y-3 mt-4 mb-4 p-2 border border-orange-500 rounded-xl border-dashed">
            <Text className="text-lg font-bold">Category and Branch</Text>
              {categories.length > 0 && (
                <Select 
                  status='warning'
                  selectedIndex={selectedCategory}
                  onSelect={index => setSelectedCategory(index as IndexPath)}
                  value={categories[selectedCategory.row]?.name}
                  className="border border-gray-400 bg-white hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4"
                >
                  {categories.map((category, index) => (
                    <SelectItem title={category.name} key={index} />
                  ))}
                </Select>
              )}

              {branches.length > 0 && (
                <Select
                  status='warning'
                  selectedIndex={selectedBranch}
                  onSelect={index => setSelectedBranch(index as IndexPath)}
                  value={branches[selectedBranch.row]?.name}
                  className="border border-gray-400 hover:bg-blue-500 focus:border-blue-500 rounded-xl p-2 mb-4"
                >
                  {branches.map((branch, index) => (
                    <SelectItem title={branch.name} key={index} />
                  ))}
                </Select>
              )}
            </View>

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

            <Button className='mt-4 bg-orange-500 rounded-xl border border-orange-800 text-white font-semibold' textColor='white' onPress={handleAddProduct} loading={loading}> Add New Product </Button>
            <View className="mt-10"></View>
            {loading && <Text>Loading...</Text>}
            {/* {message && <Text>{message}</Text> } */}

            
              <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
                <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
                <Dialog.Title className="text-center text-green-600 font-semibold">Product added successfully!</Dialog.Title>
                <Dialog.Content>
                  <Text className='text-center text-green-600' >Congratulation! You have successfully added a new product!</Text>
                </Dialog.Content>
              </Dialog>
            
              {/*<Dialog style={{ backgroundColor: '#FED7D7' }} visible={true} onDismiss={hideDialog}>
                <Dialog.Icon icon="alert" size={35} color='red' />
                <Dialog.Title className="text-center text-red-600 font-semibold">Product added failed!</Dialog.Title>
                <Dialog.Content>
                  <Text className='text-center text-red-600' >Sorry! Something went wrong, Please try again!</Text>
                </Dialog.Content>
            </Dialog> */}
            
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductScreen;
