import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
  } from 'react-native';
import { CreateCategory } from '../../../api/category/category/AddNewCategory';
import { Gender, Category } from '../../../types/Category';
import { GetAllGender } from '../../../api/category/gender/GetAllGender';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../../theme/theme';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dialog } from 'react-native-paper';
const AddCategoryScreen = ({navigation} : any) => {
    // const navigation = useNavigation();
    const [name, setCateName] = useState('');
    const [productGender, setProductGender] = useState('');
    const [genders, setGenders] = useState<Gender[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFocus, setIsFocus] = useState(false);  

    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const genderData = await GetAllGender();
            setGenders(genderData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const handleAddCategory = async () => {
        try {
            if (name === '' || productGender == null) {
                Alert.alert('Lack of information');
            }else{
                await CreateCategory(name, productGender);
                fetchData();
                //Alert.alert('Category created successfully');
                setVisible(true);
                setCateName('');
                //setProductGender('');
            }
        } catch (error) {
          console.error('Failed to create category:', error);
          Alert.alert('Failed to create category');
        }
      };
    return(
        <SafeAreaView className='flex-1 bg-gray-100 p-4'>
          <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
              <MaterialCommunityIcons className='mr-2' name="developer-board" size={30} color="#333" />
              Add Category</Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg text-gray-500' >Name of category <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'
                  style={{flex: 1, fontSize: 17, color: "gray"}}
                  placeholder='Enter category name..'
                  placeholderTextColor='#D1D5DB'
                  onChangeText={text => {
                      setCateName(text);
                  }}
                  value={name}
                />
                
              </View>
            </View>
          </>
            <>
              <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-28 bg-white mt-8'>
                <View style={{width: '100%', height: 10}} />
                <View className='flex flex-row'>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-start'},
                    ]}>
                    
                    <Text className='font-semibold text-lg text-gray-500'>Product Gender</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        {color: CUSTOM_COLOR.Red},
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                  
                </View>
                {/* <View style={{width: '100%', height: 5}} /> */}
                <View className='flex flex-row mt-2 w-full justify-center items-center'>
                  <Dropdown 
                    style={[
                        styles.comboType,
                        isFocus && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        
                        iconStyle={styles.iconStyle}
                        data={genders}
                        maxHeight={200}
                        labelField="name"
                        valueField="id"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        value={productGender}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setProductGender(item.id as never);
                            setIsFocus(false);
                        }}

                        itemTextStyle={{color: 'black'}}
                        selectedTextStyle = {{color: "gray"}}
            
                    />
                 
                </View>
              </View>
            </>
            <View className='flex w-full mt-8'>
              <CustomButton  label={'Save'} onPress={handleAddCategory} />
            </View>
            

            <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
              <Dialog.Title className="text-center text-green-600 font-semibold">Category added successfully!</Dialog.Title>
              <Dialog.Content>
                <Text className='text-center text-green-600' >Congratulation! You have successfully added a new category!</Text>
              </Dialog.Content>
            </Dialog>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        elevation: 1.5,
        borderRadius: 0.5,
        shadowColor: CUSTOM_COLOR.Black,
        flexDirection: 'column',
      },
      unitTitleContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
      },
      titleInputStyle: {},
      comboxContainer: {
        width: '100%',
        elevation: 1.5,
        borderRadius: 0.5,
        shadowColor: CUSTOM_COLOR.Black,
        flexDirection: 'row',
      },
      unitComboContainer: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
      },
      comboType: {
        width: '85%',
        height: '85%',
        borderColor: CUSTOM_COLOR.MineShaft,
        borderWidth: 0.5,
        borderRadius: 30,
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
      
})
export default AddCategoryScreen;