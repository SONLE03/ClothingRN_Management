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
import { AddSize } from '../../../api/product/size/AddSize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../../theme/theme';

import CustomButton from '../../../components/CustomButton';
import { Button, Dialog } from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddSizeScreen = ({navigation} : any) => {
    const [name, setCateName] = useState('');
    const [visible, setVisible] = useState(false);
    

    const hideDialog = () => setVisible(false);

    const handleAddSize = async () => {
        try {
            if (name === '') {
                Alert.alert('Lack of information');
            }else{
                await AddSize(name);
                setVisible(true);
                setCateName('');
                //Alert.alert('Size created successfully');
            }
        } catch (error) {
          console.error('Failed to create size:', error);
          Alert.alert('Failed to create size');
        }
      };
    return(
<SafeAreaView className='flex-1 bg-gray-100 p-4'>
            <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
                <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
                  <MaterialComunityIcons className='mr-2' name="developer-board" size={30} color="#333" />
                  Add Size</Text>
                <View style={{ width: 24 }} />  
            </TouchableOpacity>
            <>
              <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                <View className='flex flex-row'>
                  <Text className='font-semibold text-lg' >Name of Size <Text className='text-red-500 font-semibold'>*</Text></Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  
                  <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'
                    style={{flex: 1, fontSize: 17}}
                    placeholder='Enter product size name...'
                    placeholderTextColor='#D1D5DB'
                    onChangeText={text => {
                        setCateName(text);
                    }}
                    value={name}
                    
                  />
                  
                </View>
              </View>
            </>
          
            <Button className='mt-6 bg-orange-500 rounded-xl border border-orange-800 text-white text-xl font-semibold' textColor='white'  icon="developer-board" onPress={handleAddSize}>Save new size</Button>
            <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
              <Dialog.Title className="text-center text-green-600 font-semibold">Product size added successfully!</Dialog.Title>
              <Dialog.Content>
                <Text className='text-center text-green-600' >Congratulation! You have successfully added a new size!</Text>
              </Dialog.Content>
            </Dialog>
        </SafeAreaView>
    )
}

export default AddSizeScreen;