import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
  } from 'react-native';
import { AddPG } from '../../../api/category/gender/AddPGender';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../../theme/theme';
import CustomButton from '../../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, Dialog } from 'react-native-paper';
const AddGenderScreen = ({navigation} : any) => {
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    const handleAddPG = async () => {
        try {
            if (name === '') {
                Alert.alert('Lack of information');
            }else{
                await AddPG(name);
                Alert.alert('Product gender created successfully');
            }
        } catch (error) {
          console.error('Failed to create product gender:', error);
          Alert.alert('Failed to create product gender');
        }
      };
    return(
      <SafeAreaView className='flex-1 bg-gray-100 p-4'>
      <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
          <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
          <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
            <MaterialIcons className='mr-2' name="emoji-people" size={30} color="#333" />
            Add Product gender</Text>
          <View style={{ width: 24 }} />  
      </TouchableOpacity>
      <>
        <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
          <View className='flex flex-row'>
            <Text className='font-semibold text-lg' >Name of product gender <Text className='text-red-500 font-semibold'>*</Text></Text>
          </View>
          <View style={{flex: 2, flexDirection: 'row'}}>
            
            <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'
              style={{flex: 1, fontSize: 17}}
              placeholder='Enter gender name..'
              placeholderTextColor='#D1D5DB'
              onChangeText={text => {
                  setName(text);
              }}
              value={name}
            />
            
          </View>
        </View>
      </>
    
      <Button className='mt-6 bg-orange-500 rounded-xl border border-orange-800 text-white text-xl font-semibold' textColor='white' onPress={handleAddPG}>Save gender</Button>
        <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
          <Dialog.Title className="text-center text-green-600 font-semibold">Product gender added successfully!</Dialog.Title>
          <Dialog.Content>
            <Text className='text-center text-green-600' >Congratulation! You have successfully added a new product gender!</Text>
          </Dialog.Content>
        </Dialog>
      </SafeAreaView>
    )
}
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
})
export default AddGenderScreen;