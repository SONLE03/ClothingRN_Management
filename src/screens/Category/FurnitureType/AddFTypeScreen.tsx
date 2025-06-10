import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import { CreateNewFurnitureType } from '../../../api/category/furniture-type/add-new-type';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar, Button, Dialog, IconButton} from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOM_COLOR} from '../../../theme/theme';
import { RoomSpace } from '../../../entity/Category';
import { GetAllRoomSpace } from '../../../api/category/roomspace/get-roomspace';
import { Dropdown } from 'react-native-element-dropdown';
const AddFTypeScreen = ({navigation}: any) => {
  const [fTypeName, setFTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const [visible, setVisible] = useState(false);
  const [roomSpaces, setRoomSpaces] = useState<RoomSpace[]>([]);

  const [selectedRoomSpaceId, setSelectedRoomSpaceId] = useState<string>('');

  useEffect(() => {
    const fetchRoomSpaces = async () => {
      try {
        const spaces = await GetAllRoomSpace();
        setRoomSpaces(spaces);
      } catch (error) {
        console.error('Error fetching room spaces:', error);
      }
    };
    fetchRoomSpaces();
  }, []);

  console.log('Room Spaces:', roomSpaces);

  const hideDialog = () => setVisible(false);

  const handleAddFType = async () => {
    try {
      if (fTypeName === '' || description === '') {
        Alert.alert('Lack of information');
      } else {
        await CreateNewFurnitureType({
          FurnitureTypeName: fTypeName,
          Description: description,
          Image: image,
          RoomSpaceId: selectedRoomSpaceId,
        });
        //Alert.alert('FType created successfully');
        setVisible(true);
        setFTypeName('');
        setDescription('');
        setImage(null);
      }
    } catch (error) {
      console.error('Failed to create fType:', error);
      Alert.alert('Failed to create fType');
    }
  };

  const pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImage({
          uri: image.path,
          type: image.mime,
          name: image.filename || 'profile.jpg',
        });
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Could not pick the image.');
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <TouchableOpacity className="flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white">
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#333"
        />
        <Text className="flex-row text-2xl font-semibold space-x-2 text-black">
          <MaterialComunityIcons
            className="mr-2"
            name="format-color-fill"
            size={30}
            color="#333"
          />
          Add Furniture Type
        </Text>
        <View style={{width: 24}} />
      </TouchableOpacity>
      <>
        <View className="w-full h-10 mb-4 flex flex-row justify-center items-center mt-4">
          <View className="relative h-20 w-20">
            <Avatar.Image
              size={65}
              source={
                image ? {uri: image.uri} : require('../../../assets/logo.png')
              }
            />
            <IconButton
              icon="pencil"
              size={15}
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-orange-500 text-white"
            />
          </View>
        </View>
        <View
          style={[
            styles.inputContainer,
            {height: 90, marginBottom: 20, marginTop: 20},
          ]}>
          <View style={{width: '100%', height: 10}} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={[
                styles.unitTitleContainer,
                {justifyContent: 'flex-start'},
              ]}>
              <View style={{width: '10%', height: '100%'}} />
              <Text style={styles.titleInputStyle}>FType Name</Text>
              <Text style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                {' '}
                *
              </Text>
            </View>
            <View
              style={[styles.unitTitleContainer, {justifyContent: 'flex-end'}]}>
              <View style={{width: '10%', height: '100%'}} />
            </View>
          </View>

          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%'}} />
            <TextInput
              style={{flex: 1, fontSize: 17, color: 'gray'}}
              onChangeText={text => {
                setFTypeName(text);
              }}
              value={fTypeName}
              placeholder="Enter fType name.."
            />
            <View style={{width: '5%', height: '100%'}} />
          </View>
        </View>
        <View style={[styles.inputContainer, {height: 90, marginBottom: 20, marginTop: 20}]}>
          <View style={{width: '100%', height: 10}} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={[
                styles.unitTitleContainer,
                {justifyContent: 'flex-start'},
              ]}>
              <View style={{width: '10%', height: '100%'}} />
              <Text style={styles.titleInputStyle}>Description</Text>
              <Text style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                {' '}
                *
              </Text>
            </View>
            <View
              style={[styles.unitTitleContainer, {justifyContent: 'flex-end'}]}>
              <View style={{width: '10%', height: '100%'}} />
            </View>
          </View>

          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%'}} />
            <TextInput
              style={{flex: 1, fontSize: 17, color: 'gray'}}
              onChangeText={text => {
                setDescription(text);
              }}
              value={description}
              placeholder="Enter description..."
            />
            <View style={{width: '5%', height: '100%'}} />
          </View>
        </View>
        {/* Hey i want have a room space list to choose */}
        <View style={[styles.inputContainer, {height: 100, paddingBottom: 32}]}>
          <View style={{width: '100%', height: 10}} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={[
                styles.unitTitleContainer,
                {justifyContent: 'flex-start'},
              ]}>
              <View style={{width: '10%', height: '100%'}} />
              <Text style={styles.titleInputStyle}>Room Space</Text>
              <Text style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                {' '}
                *
              </Text>
            </View>
            <View
              style={[styles.unitTitleContainer, {justifyContent: 'flex-end'}]}>
              <View style={{width: '10%', height: '100%'}} />
            </View>
          </View>

          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%'}} />
            <Dropdown
              style={[
                styles.inputContainer,
                {height: 50, flex: 1, marginTop: 10, paddingHorizontal: 10},
              ]}
              
              data={roomSpaces.map(space => ({
                label: space.RoomSpaceName,
                value: space.Id,
              }))}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Room Space"
              searchPlaceholder="Search..."
              value={selectedRoomSpaceId}
              onChange={item => {
                setSelectedRoomSpaceId(item.value);
              }}
              itemTextStyle={{color: 'black'}}
              selectedTextStyle={{color: 'gray'}}
            />
            <View style={{width: '5%', height: '100%'}} />
          </View>
        </View>
      </>

      <Button
        className="mt-6 bg-orange-500 rounded-xl border border-orange-800 text-white text-xl font-semibold"
        textColor="white"
        icon="format-color-fill"
        onPress={handleAddFType}>
        Save Furniture Type
      </Button>
      <Dialog
        style={{backgroundColor: '#F0FFF4'}}
        visible={visible}
        onDismiss={hideDialog}>
        <Dialog.Icon icon="sticker-check-outline" size={35} color="green" />
        <Dialog.Title className="text-center text-green-600 font-semibold">
          FType added successfully!
        </Dialog.Title>
        <Dialog.Content>
          <Text className="text-center text-green-600">
            Congratulation! You have successfully added a new FType!
          </Text>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
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
  spaceContainer: {
    width: '100%',
    height: 10,
  },
  inputContainer: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'column',
    color: 'gray',
  },
  unitTitleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleInputStyle: {
    color: 'gray',
  },
});

export default AddFTypeScreen;
