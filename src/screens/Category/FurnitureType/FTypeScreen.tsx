import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {DataTable, Menu, Divider, Provider} from 'react-native-paper';
import {FurnitureType} from '../../../entity/Category';
import {GetAllFurnitureType} from '../../../api/category/furniture-type/get-type';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DeleteFType} from '../../../api/category/furniture-type/delete-type';
import {
  BORDER_RADIUS,
  COLORS,
  CUSTOM_COLOR,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../../theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoaderKit from 'react-native-loader-kit';

const FTypeScreen = ({navigation}: any) => {
  const [furnitureType, setFurnitureType] = useState<FurnitureType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedFurnitureType, setSelectedFurnitureType] =
    useState<FurnitureType | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await GetAllFurnitureType();
      setFurnitureType(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filteredFType = furnitureType.filter(fType =>
    fType.FurnitureTypeName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleAddFType = () => {
    navigation.navigate('AddFTypeScreen');
  };

  const deleteFType = async (id: string) => {
    const result = await DeleteFType(id);
    Alert.alert(result);
    fetchData();
  };

  const handleEdit = (item: FurnitureType) => {
    navigation.navigate('EditFTypeScreen', {item});
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete this FType?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteFType(id),
        },
      ],
    );
  };

  const openMenu = (fType: FurnitureType) => {
    setSelectedFurnitureType(fType);
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity className="flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white">
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="#333"
          />
          <Text className="flex-row text-2xl font-semibold space-x-2 text-black">
            <MaterialIcons
              className="mr-2"
              name="emoji-people"
              size={30}
              color="#333"
            />
            FType List
          </Text>
          <View style={{width: 24}} />
        </TouchableOpacity>
        <View className="flex-row justify-start items-center border border-orange-400 rounded-2xl p-2 mb-5 h-14 space-x-0">
          <MaterialCommunityIcons
            name="home-search"
            size={25}
            color="gray"
            style={styles.InputIcon}
          />
          <TextInput
            placeholder="Find your product FType here..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor="#B0B0B0"
            className="flex-1 text-base h-10 mt-1 text-gray-500"
          />
          <TouchableOpacity onPress={fetchData}>
            <MaterialCommunityIcons
              name="refresh"
              size={25}
              color="gray"
              style={styles.InputIcon}
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
              <DataTable.Header>
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
                  FType Name
                </DataTable.Title>
                {/* Description */}
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
              {filteredFType.map(item => (
                <DataTable.Row key={item.Id}>
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
                    {item.FurnitureTypeName}
                  </DataTable.Cell>
                  <DataTable.Cell
                    className="flex justify-start"
                    textStyle={{color: 'gray'}}>
                    {item.Description || 'No description available'}
                  </DataTable.Cell>
                  <DataTable.Cell className="flex justify-end">
                    <Menu
                      visible={visible && selectedFurnitureType?.Id === item.Id}
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
          className="absolute bottom-5 right-5 bg-orange-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
          onPress={handleAddFType}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 24,
    color: '#333',
  },
  table: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.radius_20,
    backgroundColor: CUSTOM_COLOR.LightGray,
    alignItems: 'center',
    marginBottom: 10,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
});

export default FTypeScreen;
