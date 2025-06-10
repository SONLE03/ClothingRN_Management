import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProductGet, ProductVariantGet} from '../../../entity/Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GetDetailProduct} from '../../../api/product/product/get-product-details';
import {Image} from 'react-native-elements';

const ProductDetailScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const [productItems, setProductItems] = useState<ProductGet[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVariantGet[]>(
    [],
  );

  useEffect(() => {
    fetchData();
    setProductItems(item);
    setProductVariants(item.ProductVariants);
  }, []);

  const fetchData = async () => {
    if (item == null) {
      Alert.alert('Product not found');
      return;
    }
    try {
      const data = await GetDetailProduct(item.Id);
      setProductItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log('Product Items:', productItems);
  console.log('Item:', item);

  return (
    <SafeAreaView>
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
            name="sticker-plus-outline"
            size={30}
            color="#333"
          />
          Product Detail{' '}
        </Text>
        <View style={{width: 24}} />
      </TouchableOpacity>
      <ScrollView className="p-4">
        <>
          <Text className="text-xl font-semibold text-orange-600 mt-8">
            Product Information
          </Text>
          {/* ImageSource */}
          <View className='flex items-center justify-center mt-4 border border-gray-400 rounded-xl p-2 bg-white'>
            <Image
              source={{uri: item?.ImageSource}}
              style={{width: 200, height: 200}}
            />
          </View>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-600">
                Name of product
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600"
                style={{flex: 1, fontSize: 17}}>
                {item?.ProductName}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-600">Price</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600"
                style={{flex: 1, fontSize: 17}}>
                {item?.DisplayPrice}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-600">
                Category
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600"
                style={{flex: 1, fontSize: 17}}>
                {item?.CategoryName}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-600">Brand</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className="text-gray-600 border-b-gray-500 border border-x-white border-t-white mt-1 text-lg"
                style={{flex: 1, fontSize: 17}}>
                {item?.BrandName}
              </Text>
            </View>
          </View>
        </>
        <>
          <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
            <View className="flex flex-row">
              <Text className="font-semibold text-lg text-orange-600">
                Description
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              <Text
                className="text-gray-600 border-b-gray-500 border border-x-white border-t-white mt-1 text-lg"
                style={{flex: 1, fontSize: 17}}>
                {item?.Description}
              </Text>
            </View>
          </View>
        </>
        <Text className="text-xl font-semibold text-orange-600 mt-8">
          Product Variants
        </Text>
        <DataTable className="mt-4 border border-gray-400 rounded-xl font-semibold text-lg bg-white">
          <DataTable.Header>
            <DataTable.Title
              className="flex justify-start items-start"
              textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
              Color
            </DataTable.Title>
            <DataTable.Title
              className="flex justify-start items-center"
              textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
              Dimension
            </DataTable.Title>
            <DataTable.Title
              className="flex justify-center items-center"
              textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
              Quantity
            </DataTable.Title>
            <DataTable.Title
              className="flex justify-center items-end"
              textStyle={{color: 'orange', fontSize: 16, fontWeight: 'bold'}}>
              Price
            </DataTable.Title>
          </DataTable.Header>

          {productVariants?.map(item => (
            <DataTable.Row
              className="border border-gray-400 rounded-xl"
              key={item.Id}>
              <DataTable.Cell
                className="flex justify-start items-center"
                textStyle={{color: '#4A5568', fontSize: 16}}>
                {item?.ColorName}
              </DataTable.Cell>
              <DataTable.Cell
                className="flex justify-center items-center"
                textStyle={{color: '#4A5568', fontSize: 16}}>
                {item?.DisplayDimension}
              </DataTable.Cell>
              <DataTable.Cell
                className="flex justify-center items-center"
                textStyle={{color: '#4A5568', fontSize: 16}}>
                {item?.Quantity}
              </DataTable.Cell>
              <DataTable.Cell
                className="flex justify-center items-center"
                textStyle={{color: '#4A5568', fontSize: 16}}>
                {item?.Price}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <View className="mt-64"></View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProductDetailScreen;
