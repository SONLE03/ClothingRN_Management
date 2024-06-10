import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    ScrollView
  } from 'react-native';
import { CreateCoupon } from '../../api/coupon/CreateCoupon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CUSTOM_COLOR } from '../../theme/theme';
import CustomButton from '../../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dialog } from 'react-native-paper';
import { Datepicker } from '@ui-kitten/components';
import { UpdateCoupon } from '../../api/coupon/UpdateCoupon';
import { GetDetailCoupon } from '../../api/coupon/GetDetailCoupon';
const AddEditPromotionScreen = ({navigation, route} : any) => {
    const { item } = route.params;
    const [operation, setOperation] = useState('');
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [minimumBill, setMinimumBill] = useState('');
    const [quantity, setQuantity] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      if(item == null){
        setOperation("Create");
      }else{
        try {
          const data = await GetDetailCoupon(item.id);
          setOperation("Update");
          setName(data.name)
          setDiscountValue(data.discountValue.toString());
          setMinimumBill(data.minimumBill.toString());
          setQuantity(data.quantity.toString());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    const hideDialog = () => setVisible(false);
    const clearItem = () => {
      setName('')
      setDiscountValue('');
      setMinimumBill('');
      setQuantity('');
      setStartDate('');
      setEndDate('');
    }
    const handleAddUpdateCategory = async () => {
        try {
            const sDate = Date.parse(startDate);
            const eDate = Date.parse(endDate);
            const currentDate = new Date().getDate();
            if (name === '' || startDate === '' || endDate === '' || discountValue === '' || minimumBill === '' || quantity === '' ) {
                Alert.alert('Lack of information');
            }else if(sDate < currentDate || eDate < currentDate){
                Alert.alert('Start date and end date must be greater than the current date');
            }else if(sDate > eDate){
                Alert.alert('The end date must be greater than the start date');
            }else if(Number.parseInt(discountValue) >= 100){
                Alert.alert('Discount value must be less than 100');
            }else{
                if(item == null){
                  await CreateCoupon(name, startDate, endDate, discountValue, minimumBill, quantity);
                  clearItem();
                }else{
                  await UpdateCoupon(item.id, name, startDate, endDate, discountValue, minimumBill, quantity);
                }
                
                setVisible(true);
            }
        } catch (error) {
          console.error(`Failed to ${operation} coupon:`, error);
          Alert.alert(`Failed to ${operation} coupon`);
        }
      };
    return(
        <SafeAreaView className='flex-1 bg-gray-100 p-4'>
          <TouchableOpacity className='flex-row justify-between items-center mb-6 border border-gray-400 rounded-xl p-2 bg-white'>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#333" />
            <Text className='flex-row text-2xl font-semibold space-x-2 text-black'>
              <MaterialCommunityIcons className='mr-2' name="developer-board" size={30} color="#333" />
              {operation} Coupon</Text>
            <View style={{ width: 24 }} />  
          </TouchableOpacity>
          <ScrollView>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg text-gray-600' >Name of coupon <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600'
                  style={{flex: 1, fontSize: 17}}
                  placeholder='Enter coupon name..'
                  placeholderTextColor='#D1D5DB'
                  onChangeText={text => {
                      setName(text);
                  }}
                  value={name}
                />
                
              </View>
            </View>
          </>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg text-gray-600' >Start date <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              
                
                <Datepicker
                    placeholder='Pick start  date'
                    date={startDate}
                    onSelect={setStartDate}
                    style={{
                        width: '100%',
                        borderColor: 'gray-500',
                        borderWidth: 1,
                        borderRadius: 8, // Change this value to a numeric value
                        paddingHorizontal: 3,
                        paddingVertical: 2
                    }}
                />
                
             
            </View>
          </>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg text-gray-600' >End date <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              
                <Datepicker
                    placeholder='Pick end date'
                    date={endDate}
                    onSelect={setEndDate}
                    style={{
                        width: '100%',
                        borderColor: 'gray-500',
                        borderWidth: 1,
                        borderRadius: 8, // Change this value to a numeric value
                        paddingHorizontal: 3,
                        paddingVertical: 2
                    }}
                />
              
            </View>
          </>
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg text-gray-600' >Discount value  <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600'
                  style={{flex: 1, fontSize: 17}}
                  placeholder='Enter discount value..'
                  placeholderTextColor='#D1D5DB'
                  keyboardType='numeric'
                  onChangeText={text => {
                      setDiscountValue(text);
                  }}
                  value={discountValue}
                />
                
              </View>
            </View>
          </>   
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg text-gray-600' >Minimum bill  <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600'
                  style={{flex: 1, fontSize: 17}}
                  placeholder='Enter minimum bill..'
                  placeholderTextColor='#D1D5DB'
                  keyboardType='numeric'
                  onChangeText={text => {
                      setMinimumBill(text);
                  }}
                  value={minimumBill}
                />
                
              </View>
            </View>
          </>   
          <>
            <View className='flex flex-col w-full p-2 border border-gray-400 rounded-xl h-24 bg-white mt-8'>
              <View className='flex flex-row'>
                <Text className='font-semibold text-lg text-gray-600' >Quantity  <Text className='text-red-500 font-semibold'>*</Text></Text>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                
                <TextInput className=' border-b-gray-500 border border-x-white border-t-white mt-1 text-lg text-gray-600'
                  style={{flex: 1, fontSize: 17}}
                  placeholder='Enter quantity name..'
                  placeholderTextColor='#D1D5DB'
                  keyboardType='numeric'
                  onChangeText={text => {
                      setQuantity(text);
                  }}
                  value={quantity}
                />
                
              </View>
            </View>
          </>   
          </ScrollView>
            <View className='flex w-full mt-8'>
              <CustomButton  label={'Save'} onPress={handleAddUpdateCategory} />
            </View>
            

            <Dialog style={{ backgroundColor: '#F0FFF4' }} visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon="sticker-check-outline" size={35} color='green' />
              <Dialog.Title className="text-center text-green-600 font-semibold">Coupon {operation}d successfully!</Dialog.Title>
              <Dialog.Content>
                <Text className='text-center text-green-600' >Congratulation! You have successfully {operation}d a coupon!</Text>
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
export default AddEditPromotionScreen;