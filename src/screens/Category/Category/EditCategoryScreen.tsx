import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {EditCategory} from '../../../api/category/category/edit-category';
import {FurnitureType, Category} from '../../../entity/Category';
import {GetAllFurnitureType} from '../../../api/category/furniture-type/get-type';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CUSTOM_COLOR} from '../../../theme/theme';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar, IconButton } from 'react-native-paper';
const EditCategoryScreen = ({navigation, route}: any) => {
  const {item} = route.params;
  const [id, setId] = useState('');
  const [name, setCateName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const [productFType, setProductFType] = useState('');
  const [fTypes, setFTypes] = useState<FurnitureType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setId(item.Id);
    setCateName(item.CategoryName);
    setProductFType(item.FurnitureTypeId);
    setDescription(item.Description || '');
    setLoading(true);
    try {
      const fTypeData = await GetAllFurnitureType();
      setFTypes(fTypeData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  const handleEditCategory = async () => {
    try {
      if (name === '' || productFType == null) {
        Alert.alert('Lack of information');
      } else {
        await EditCategory(id, {
          CategoryName: name,
          FurnitureTypeId: productFType,
          Description: description,
          Image: image,
        });
        Alert.alert('Category modified successfully');
      }
    } catch (error) {
      console.error('Failed to modify category:', error);
      Alert.alert('Failed to modify category');
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
        <Text style={styles.backButtonText}>Edit Category</Text>
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
        <View style={[styles.inputContainer, {height: 90}]}>
          <View style={{width: '100%', height: 10}} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={[
                styles.unitTitleContainer,
                {justifyContent: 'flex-start'},
              ]}>
              <View style={{width: '10%', height: '100%'}} />
              <Text className="text-gray-500"> Name Of Category</Text>
              <Text style={[{color: CUSTOM_COLOR.Red}]}> *</Text>
            </View>
            <View
              style={[styles.unitTitleContainer, {justifyContent: 'flex-end'}]}>
              <View style={{width: '10%', height: '100%'}} />
            </View>
          </View>
          {/* <View style={{width: '100%', height: 5}} /> */}
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%', padding: 10}} />
            <TextInput
              className="w-5/6 h-10 border border-gray-300 rounded-lg p-2"
              onChangeText={text => {
                setCateName(text);
              }}
              value={name}
            />
            <View style={{width: '5%', height: '100%'}} />
          </View>
        </View>
        <View style={[styles.inputContainer, {height: 90, marginTop: 20, marginBottom: 15}]}>
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
              className="w-5/6 h-10 border border-gray-300 rounded-lg p-2"
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
      <>
        <View style={[styles.inputContainer, {height: 90}]}>
          <View style={{width: '100%', height: 10}} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={[
                styles.unitTitleContainer,
                {justifyContent: 'flex-start'},
              ]}>
              <View style={{width: '10%', height: '100%'}} />
              <Text className="text-gray-500">Product FType</Text>
              <Text style={[{color: CUSTOM_COLOR.Red}]}> *</Text>
            </View>
            <View
              style={[styles.unitTitleContainer, {justifyContent: 'flex-end'}]}>
              <View style={{width: '10%', height: '100%'}} />
            </View>
          </View>

          {/* <View style={{width: '100%', height: 5}} /> */}
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{width: '5%', height: '100%'}} />
            <Dropdown
              style={[styles.comboType, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              iconStyle={styles.iconStyle}
              data={fTypes}
              maxHeight={200}
              labelField="FurnitureTypeName"
              valueField="Id"
              placeholder={!isFocus ? 'Select item' : '...'}
              value={productFType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setProductFType(item.Id as never);
                setIsFocus(false);
              }}
              itemTextStyle={{color: 'black'}}
              selectedTextStyle={{color: 'gray'}}
            />
            <View style={{width: '5%', height: '100%'}} />
          </View>
        </View>
      </>
      <View style={styles.spaceContainer} />
      <View style={styles.spaceContainer} />
      <View style={styles.spaceContainer} />
      <CustomButton label={'Save'} onPress={handleEditCategory} />
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
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'column',
  },
  unitTitleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  //titleInputStyle: {},
  comboxContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
  },
  unitComboContainer: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  comboType: {
    width: '85%',
    height: '70%',
    borderColor: CUSTOM_COLOR.MineShaft,
    borderWidth: 0.5,
    borderRadius: 1,
    paddingHorizontal: '5%',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dateContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'column',
  },
  unitDateContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  dateStyle: {
    width: '85%',
    height: '70%',
    borderColor: CUSTOM_COLOR.MineShaft,
    borderWidth: 0.5,
    borderRadius: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInputStyle: {
    color: 'gray',
  },
});
export default EditCategoryScreen;
