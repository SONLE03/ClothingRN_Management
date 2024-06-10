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
import { EditPG } from '../../../api/category/gender/EditPGender';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../../theme/theme';
import CustomButton from '../../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const EditGenderScreen = ({navigation, route} : any) => {
    const { item } = route.params;
    const [id, setId] = useState('');
    const [name, setCateName] = useState('');

    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = () => {
      setId(item.id);
      setCateName(item.name);
    };

    const handleEditPG = async () => {
        try {
            if (name === '') {
                Alert.alert('Lack of information');
            }else{
                await EditPG(id, name);
                Alert.alert('Product gender modified successfully');
            }
        } catch (error) {
          console.error('Failed to modify product gender:', error);
          Alert.alert('Failed to modify product gender');
        }
      };
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
          <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
          <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
            <MaterialIcons className='mr-2' name="emoji-people" size={30} color="#333" />
            Edit Product gender</Text>
          <View style={{ width: 24 }} />  
        </TouchableOpacity>
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
                    <Text className='text-gray-500'>Name Of Product Gender</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        {color: CUSTOM_COLOR.Red},
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-end'},
                    ]}>
                    <View style={{width: '10%', height: '100%'}} />
                  </View>
                </View>
                {/* <View style={{width: '100%', height: 5}} /> */}
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <View style={{width: '5%', height: '100%'}} />
                  <TextInput className=' text-gray-500'
                    style={{flex: 1, fontSize: 17}}
                    onChangeText={text => {
                        setCateName(text);
                    }}
                    value={name}
                  />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View className='mt-8' />
            
            <CustomButton label={'Save'} onPress={handleEditPG} />
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
export default EditGenderScreen;