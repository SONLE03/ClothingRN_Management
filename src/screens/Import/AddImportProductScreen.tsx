import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Alert, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {AddNewImport} from '../../api/import/AddImport';
import {GetAllProducts} from '../../api/product/product/GetAllProducts';
import {GetDetailProduct} from '../../api/product/product/GetDetailProduct';

import {Product, ProductItem} from '../../entity/Product';
import {AddImportItem} from '../../entity/Import';
import {Dropdown} from 'react-native-element-dropdown';
import {Dialog} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddImport = ({navigation}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [selectedProductItem, setSelectedProductItem] =
    useState<ProductItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [importItems, setImportItems] = useState<AddImportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
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
      const selected =
        products.find(product => product.id === productId) || null;
      setSelectedProduct(selected);

      const items = await GetDetailProduct(productId);
      setProductItems(items);
      setSelectedProductItem(null);
      setQuantity(null);
      setPrice(null);
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
        total: quantity * price,
      };
      setImportItems([...importItems, newItem]);
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
      await AddNewImport(importItems);
      setVisible(true);
      setLoading(false);
      // setTimeout(() => {
      //     navigation.navigate('ListImports');
      // }, 1500);
    } catch (error) {
      Alert.alert('Error', 'Failed to add import');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <TouchableOpacity className="flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white">
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#333"
        />
        <Text className="flex-row text-2xl font-semibold space-x-2 text-black">
          <MaterialCommunityIcons
            className="mr-2"
            name="developer-board"
            size={30}
            color="#333"
          />
          Import products
        </Text>
        <View style={{width: 24}} />
      </TouchableOpacity>
      <View className="flex-1 p-2">
        <View className="mb-2 flex w-full p-2 h-12 border border-orange-500 rounded-xl">
          <Dropdown
            labelField="label"
            valueField="value"
            placeholder={
              selectedProduct
                ? selectedProduct.product_Name
                : 'Select a product'
            }
            placeholderStyle={{color: 'gray'}}
            value={selectedProduct?.id}
            onChange={item => handleProductChange(item.value)}
            data={products.map(product => ({
              label: `${product.product_Name}`,
              value: product.id,
            }))}
            itemTextStyle={{color: 'black'}}
            selectedTextStyle={{color: 'gray'}}
          />
        </View>

        <View className="mb-6 mt-2 flex w-full p-2 h-12 border border-orange-500 rounded-xl">
          <Dropdown
            labelField="label"
            valueField="value"
            placeholder="Select a product item"
            placeholderStyle={{color: 'gray'}}
            value={selectedProductItem?.id}
            onChange={item =>
              setSelectedProductItem(
                productItems.find(
                  productItem => productItem.id === item.value,
                ) || null,
              )
            }
            data={productItems.map(item => ({
              label: `${item.sizeName} - ${item.colorName}`,
              value: item.id,
            }))}
            itemTextStyle={{color: 'black'}}
            selectedTextStyle={{color: 'gray'}}
          />
        </View>
        <Input
          className="border border-orange-500 rounded-xl p-2 text-gray-600"
          label="Quantity"
          keyboardType="numeric"
          onChangeText={value => setQuantity(Number(value))}
          value={quantity ? quantity.toString() : ''}
        />
        <Input
          className="border border-orange-500 rounded-xl p-2 text-gray-600"
          label="Price"
          keyboardType="numeric"
          onChangeText={value => setPrice(Number(value))}
          value={price ? price.toString() : ''}
        />

        <View className="flex flex-row justify-center items-center w-full h-14 mb-2">
          <TouchableOpacity
            className=" bg-orange-500 rounded-xl mt-1 p-2 w-1/2 h-10 flex justify-center items-center"
            onPress={handleAddItem}>
            <Text className="text-white font-semibold">Add Item</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          className="border border-orange-500 rounded-xl p-2 mt-2 mb-4"
          data={importItems}
          keyExtractor={item => item.productItemId}
          ListEmptyComponent={() => (
            <Text className="text-center font-semibold">
              <Ionicons name="sad-outline" size={20} color="#333" /> No items
              added
            </Text>
          )}
          renderItem={({item, index}) => (
            <View className="flex-col border border-orange-500 rounded-xl p-2">
              <Text className="mb-1 font-semibold text-gray-500">
                Product Item: {item.productItemId}
              </Text>
              <Text className="mb-1 font-semibold text-gray-500">
                Quantity: {item.quantity}
              </Text>
              <Text className="mb-1 font-semibold text-gray-500">
                Price: {item.price}
              </Text>
              <Text className="mb-1 font-semibold text-gray-500">
                Total: {item.total}
              </Text>

              <TouchableOpacity
                className=" bg-orange-500 rounded-xl mt-1 p-2 w-full h-10 flex justify-center items-center"
                onPress={() => handleRemoveItem(index)}>
                <Text className="text-white font-semibold">Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View className="flex flex-row justify-center items-center w-full h-14 mb-2">
          <TouchableOpacity
            className=" bg-orange-500 rounded-xl mt-1 p-2 w-full h-10 flex justify-center items-center"
            onPress={handleFinish}
            disabled={!importItems.length}>
            <Text className="text-white font-semibold">Import products</Text>
          </TouchableOpacity>
        </View>

        <Dialog
          style={{backgroundColor: '#F0FFF4'}}
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Icon icon="sticker-check-outline" size={35} color="green" />
          <Dialog.Title className="text-center text-green-600 font-semibold">
            Import products successfully!
          </Dialog.Title>
          <Dialog.Content>
            <Text className="text-center text-green-600">
              Congratulation! You have successfully import new products!
            </Text>
          </Dialog.Content>
        </Dialog>
      </View>
    </View>
  );
};

export default AddImport;
