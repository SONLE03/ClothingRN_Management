import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {EditBrand} from '../../../api/category/branch/edit-brand';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CUSTOM_COLOR} from '../../../theme/theme';
import CustomButton from '../../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar, IconButton} from 'react-native-paper';

const EditBranchScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const [id, setId] = useState('');
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    setId(item.Id);
    setBrandName(item.brandName);
    setDescription(item.description || '');
    setImage(
      item.imageSource
        ? {
            uri: item.imageSource,
            type: 'image/jpeg', // Adjust the type if necessary
            name: 'branch_image.jpg', // Adjust the name if necessary
          }
        : null,
    );
  };
  console.log('EditBranchScreen item:', item);
  console.log('image:', image);

  const handleEditBranch = async () => {
    try {
      if (brandName === '' || description === '') {
        Alert.alert('Lack of information');
      } else {
        await EditBrand(id, {
          BrandName: brandName,
          Description: description,
          Image: image,
        });
        Alert.alert('Branch modified successfully');
      }
    } catch (error) {
      console.error('Failed to modify branch:', error);
      Alert.alert('Failed to modify branch');
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#333"
        />
        <Text style={styles.backButtonText}>Edit Brand</Text>
      </TouchableOpacity>
      <>
        <View className="w-full h-10 mb-4 flex flex-row justify-center items-center mt-4">
          <View className="relative h-20 w-20">
            <Avatar.Image
              size={65}
              source={
                image
                  ? {uri: image.uri}
                  : item && item.ImageSource
                  ? {uri: item.ImageSource}
                  : require('../../../assets/logo.png')
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
              <Text style={styles.titleInputStyle}>Branch Name</Text>
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
                setBrandName(text);
              }}
              value={brandName}
              placeholder="Enter branch name.."
            />
            <View style={{width: '5%', height: '100%'}} />
          </View>
        </View>
        <View style={[styles.inputContainer, {height: 90}]}>
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
      </>
      <View style={styles.spaceContainer} />
      <View style={styles.spaceContainer} />
      <View style={styles.spaceContainer} />
      <CustomButton label={'Save Changes'} onPress={handleEditBranch} />
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
export default EditBranchScreen;
