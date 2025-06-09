import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {CreateNewBrand} from '../../../api/category/branch/create-brand';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Button, Dialog, IconButton} from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const AddBranchScreen = ({navigation}: any) => {
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const handleAddBranch = async () => {
    try {
      if (brandName === '' || description === '') {
        Alert.alert('Lack of information');
      } else {
        await CreateNewBrand({
          BrandName: brandName,
          Description: description,
          Image: image,
        });
        //Alert.alert('Branch created successfully');
        setVisible(true);
        setBrandName('');
        setDescription('');
        setImage(null);
      }
    } catch (error) {
      console.error('Failed to create branch:', error);
      Alert.alert('Failed to create branch');
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
          Add Branch
        </Text>
        <View style={{width: 24}} />
      </TouchableOpacity>
      <>
        <View className="flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8">
          <View className="flex flex-row">
            <Text className="font-semibold text-lg text-gray-500">
              Brand Content{' '}
              <Text className="text-red-500 font-semibold">*</Text>
            </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <IconButton
              icon="pencil"
              size={15}
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-orange-500 text-white"
            />

            <TextInput
              className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500"
              style={{flex: 1, fontSize: 17}}
              placeholder="Enter branch name.."
              placeholderTextColor="#D1D5DB"
              onChangeText={text => {
                setBrandName(text);
              }}
              value={brandName}
            />

            <TextInput
              className=" border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-500 ml-2"
              style={{flex: 1, fontSize: 17}}
              placeholder="Enter branch description.."
              placeholderTextColor="#D1D5DB"
              onChangeText={text => {
                setDescription(text);
              }}
              value={description}
            />
          </View>
        </View>
      </>

      <Button
        className="mt-6 bg-orange-500 rounded-xl border border-orange-800 text-white text-xl font-semibold"
        textColor="white"
        icon="format-color-fill"
        onPress={handleAddBranch}>
        Save branch
      </Button>
      <Dialog
        style={{backgroundColor: '#F0FFF4'}}
        visible={visible}
        onDismiss={hideDialog}>
        <Dialog.Icon icon="sticker-check-outline" size={35} color="green" />
        <Dialog.Title className="text-center text-green-600 font-semibold">
          Branch added successfully!
        </Dialog.Title>
        <Dialog.Content>
          <Text className="text-center text-green-600">
            Congratulation! You have successfully added a new branch!
          </Text>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
  );
};

export default AddBranchScreen;
