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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, IconButton } from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Dialog } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { AddStaff } from '../../api/users/AddStaff';
const AddUserScreen = ({navigation} : any) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<{ uri: string, type: string, name: string } | null>(null);
    const [visible, setVisible] = useState(false);
    const hideDialog = () => setVisible(false);

    const pickImage = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            setImage({
                uri: image.path,
                type: image.mime,
                name: image.filename || 'profile.jpg',
            });
        }).catch(error => {
            console.error(error);
            Alert.alert('Error', 'Could not pick the image.');
        });
    };

    const clear = async() => {
        setFullName('');
        setPhone('');
        setImage(null);
        setEmail('');
        setPassword('');
    }
    const handleAddStaff = async() => {
        try {
            if (email === '' || fullName === '' || phone === '' || password ==='' ) {
                Alert.alert('Lack of information');
            }else{
                const response = await AddStaff(email, fullName, phone, password, image || undefined);
                setVisible(true);
                clear();
            }
        } catch (error) {
            Alert.alert('Failed to create staff');
            console.error('Failed to create staff:', error);
        }
    }
    return(
      
        <SafeAreaView className='flex-1 bg-gray-100 p-4'>
        <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
              <MaterialComunityIcons className='mr-2' name="format-color-fill" size={30} color="#333" />
              Add Staff</Text>
            <View style={{ width: 24 }} />  
        </TouchableOpacity>
        <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
                <View className='flex flex-row'>
                <Text className='font-semibold text-lg' >Avatar </Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                
                <View className="relative h-20 w-20 ">
                    <Avatar.Image 
                        size={65} 
                        source={image ? { uri: image } : require("../../assets/user-128-128.png")} 
                    />
                    <IconButton 
                        icon="pencil" 
                        size={15} 
                        onPress={pickImage} 
                        className="absolute bottom-0 right-0 bg-orange-500 text-white"
                    />
                </View>
                
                </View>
            </View>
        </>
        <>
          <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
            <View className='flex flex-row'>
              <Text className='font-semibold text-lg' >Email <Text className='text-red-500 font-semibold'>*</Text></Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              
              <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'
                style={{flex: 1, fontSize: 17}}
                placeholder='Enter email..'
                placeholderTextColor='#D1D5DB'
                onChangeText={text => {
                    setEmail(text);
                }}
                value={email}
              />
              
            </View>
          </View>
        </>
        <>
          <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
            <View className='flex flex-row'>
              <Text className='font-semibold text-lg' >Full name <Text className='text-red-500 font-semibold'>*</Text></Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              
              <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'
                style={{flex: 1, fontSize: 17}}
                placeholder='Enter full name..'
                placeholderTextColor='#D1D5DB'
                onChangeText={text => {
                    setFullName(text);
                }}
                value={fullName}
              />
              
            </View>
          </View>
        </>
        <>
          <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
            <View className='flex flex-row'>
              <Text className='font-semibold text-lg' >Phone <Text className='text-red-500 font-semibold'>*</Text></Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              
              <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'
                style={{flex: 1, fontSize: 17}}
                placeholder='Enter phone..'
                placeholderTextColor='#D1D5DB'
                onChangeText={text => {
                    setPhone(text);
                }}
                keyboardType='numeric'
                value={phone}
              />
              
            </View>
          </View>
        </>
        <>
          <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
            <View className='flex flex-row'>
              <Text className='font-semibold text-lg' >Password <Text className='text-red-500 font-semibold'>*</Text></Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row'}}>
              
              <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg'
                style={{flex: 1, fontSize: 17}}
                placeholder='Enter password..'
                placeholderTextColor='#D1D5DB'
                onChangeText={text => {
                    setPassword(text);
                }}
                value={password}
              />
              
            </View>
          </View>
        </>
      
        <Button className='mt-6 bg-orange-500 rounded-xl border border-orange-800 text-white text-xl font-semibold' textColor='white'  icon="format-color-fill" onPress={handleAddStaff}>Save staff</Button>
          <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
            <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
            <Dialog.Title className="text-center text-green-600 font-semibold">Staff added successfully!</Dialog.Title>
            <Dialog.Content>
              <Text className='text-center text-green-600' >Congratulation! You have successfully added a new staff!</Text>
            </Dialog.Content>
          </Dialog>
        </SafeAreaView>
      )
  }
export default AddUserScreen;