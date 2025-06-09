import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import {DataTable, Menu, Divider, Provider} from 'react-native-paper';
import {Color} from '../../../entity/Product';
import {GetAllColor} from '../../../api/product/color/GetAllColor';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoaderKit from 'react-native-loader-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ColorScreen = ({navigation}: any) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await GetAllColor();
      setColors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filteredColors = colors.filter(color =>
    color.name.toLowerCase().includes(searchText),
  );

  const handleAddColor = () => {
    navigation.navigate('AddColorScreen');
  };

  const handleEdit = (item: Color) => {};

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete this color?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // deleteBranch(id);
          },
        },
      ],
    );
  };

  const openMenu = (color: Color) => {
    setSelectedColor(color);
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
              name="format-color-fill"
              size={30}
              color="#333"
            />
            Manage Colors
          </Text>
          <View style={{width: 24}} />
        </TouchableOpacity>
        <View className="flex-row justify-start items-center border border-orange-400 rounded-2xl p-4 mb-5 h-14 space-x-0">
          <MaterialComunityIcons
            name="home-search"
            color="gray"
            size={25}
            className="mr-2"
          />
          <TextInput
            placeholder="Find your colors here..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor="#B0B0B0"
            className="flex-1 text-base h-10 mt-1 text-gray-600"
          />
          <TouchableOpacity onPress={fetchData}>
            <MaterialComunityIcons
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
                  textStyle={{
                    color: 'orange',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Color
                </DataTable.Title>
                <DataTable.Title
                  textStyle={{
                    color: 'orange',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Name
                </DataTable.Title>
                <DataTable.Title
                  className="flex justify-center items-center"
                  textStyle={{
                    color: 'orange',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Actions
                </DataTable.Title>
              </DataTable.Header>
              {filteredColors.map(item => (
                <DataTable.Row
                  className="border-none border-b-gray-500 rounded-xl mb-2 text-lg"
                  key={item.id}>
                  <DataTable.Cell>
                    <View
                      className="w-8 h-8 rounded-full"
                      style={{backgroundColor: item.name.toLowerCase()}}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell className="flex justify-center items-center">
                    <Menu
                      visible={visible && selectedColor?.id === item.id}
                      onDismiss={closeMenu}
                      anchor={
                        <TouchableOpacity
                          className="border border-gray-400 rounded-full p-1"
                          onPress={() => openMenu(item)}>
                          <Ionicons
                            name="ellipsis-vertical"
                            size={20}
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
          </ScrollView>
        )}
        <TouchableOpacity
          onPress={handleAddColor}
          className="absolute bottom-5 right-5 bg-orange-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </Provider>
  );
};

export default ColorScreen;
