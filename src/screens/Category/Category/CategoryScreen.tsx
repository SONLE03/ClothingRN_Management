import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {DataTable, Menu, Divider, Provider} from 'react-native-paper';
import {Category} from '../../../entity/Category';
import {GetAllCategory} from '../../../api/category/category/get-category';
import {GetAllFurnitureType} from '../../../api/category/furniture-type/get-type';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DeleteCategory} from '../../../api/category/category/delete-category';

import LoaderKit from 'react-native-loader-kit';

const CategoryScreen = ({navigation}: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await GetAllCategory();
      console.log('Fetched categories:', data);
      const fTypeData = await GetAllFurnitureType();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filteredCategory = categories.filter(category =>
    category?.CategoryName.toLowerCase().includes(searchText),
  );

  const handleAddCategory = () => {
    navigation.navigate('AddCategoryScreen');
  };

  const deleteCategory = async (id: string) => {
    const result = await DeleteCategory(id);
    Alert.alert(result);
  };

  const handleEdit = (item: Category) => {
    navigation.navigate('EditCategoryScreen', {item: item});
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete this category?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCategory(id);
          },
        },
      ],
    );
  };

  const openMenu = (category: Category) => {
    setSelectedCategory(category);
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <SafeAreaView className="flex-1 bg-white p-5">
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
            Category List
          </Text>
          <View style={{width: 24}} />
        </TouchableOpacity>
        <View className="flex-row justify-start items-center border border-orange-400 rounded-2xl p-4 mb-5 h-14 space-x-0">
          <MaterialCommunityIcons
            name="home-search"
            size={25}
            color="gray"
            className="mr-2"
          />
          <TextInput
            placeholder="Find your categories here..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor="#B0B0B0"
            className="flex-1 text-base h-10 mt-1 text-gray-500"
          />
          <TouchableOpacity onPress={fetchData}>
            <MaterialCommunityIcons
              name="refresh"
              color="gray"
              size={25}
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <View className="flex justify-center items-center h-screen">
            <LoaderKit
              style={{width: 90, height: 90}}
              name={'BallGridPulse'}
              color={'orange'}
            />
          </View>
        ) : (
          <ScrollView>
            <DataTable className="mt-4 border border-gray-400 rounded-xl font-semibold text-lg text-center p-1 ">
              <DataTable.Header className="border-b-gray-500">
                <DataTable.Title
                  className="flex justify-start"
                  textStyle={{
                    color: 'orange',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Logo
                </DataTable.Title>
                <DataTable.Title
                  className="flex justify-start"
                  textStyle={{
                    color: 'orange',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Category Name
                </DataTable.Title>
                <DataTable.Title
                  className="flex justify-start"
                  textStyle={{
                    color: 'orange',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Description
                </DataTable.Title>
                <DataTable.Title
                  className="flex justify-end"
                  textStyle={{
                    color: 'orange',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Actions
                </DataTable.Title>
              </DataTable.Header>
              {filteredCategory.map(item => (
                <DataTable.Row
                  className="border-none border-b-gray-500 rounded-xl mb-2 text-lg"
                  key={item.Id}>
                  <DataTable.Cell className="flex justify-start">
                    {item.ImageSource ? (
                      <Image
                        source={{uri: item.ImageSource}}
                        style={{width: 32, height: 32, borderRadius: 25}}
                      />
                    ) : (
                      <Ionicons name="image" size={50} color="#ccc" />
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell
                    className="flex justify-start"
                    textStyle={{color: 'gray'}}>
                    {item.CategoryName}
                  </DataTable.Cell>
                  <DataTable.Cell
                    className="flex justify-end"
                    textStyle={{color: 'gray'}}>
                    {item.Description}
                  </DataTable.Cell>
                  <DataTable.Cell className="flex justify-end">
                    <Menu
                      visible={visible && selectedCategory?.Id === item.Id}
                      onDismiss={closeMenu}
                      anchor={
                        <TouchableOpacity
                          className="border border-gray-400 rounded-full p-1"
                          onPress={() => openMenu(item)}>
                          <Ionicons
                            name="ellipsis-vertical"
                            size={15}
                            color="#333"
                          />
                        </TouchableOpacity>
                      }>
                      <Menu.Item
                        onPress={() => handleEdit(item)}
                        title="Edit"
                      />
                      <Divider />
                      <Menu.Item
                        onPress={() => {
                          handleDelete(item.Id);
                          closeMenu();
                        }}
                        title="Delete"
                      />
                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        )}
        <TouchableOpacity
          onPress={handleAddCategory}
          className="absolute bottom-5 right-5 bg-orange-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </Provider>
  );
};

export default CategoryScreen;
