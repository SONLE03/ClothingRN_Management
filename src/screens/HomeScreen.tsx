import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    Modal
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CUSTOM_COLOR } from '../theme/theme';
import FONT_FAMILY from '../consts/fonts';
import ViewNow from '../components/ViewNow';
import FunctionCard from '../components/FunctionCard';
import { UserProps } from '../types/User';
import { useAuth } from '../util/AuthContext';
import logoutUser from '../api/auth/logout';
import { GetMe } from '../api/auth/getMe';
const HomeScreen = ({navigation} : any) => {
    const { authEmitter } = useAuth();
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [user, setUser] = useState<UserProps | null>(null);
    const [isAdmin, setIsAdmin] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = await AsyncStorage.getItem('user_id');
            const role = await AsyncStorage.getItem('role');
            if (role != null){
                if (JSON.parse(role) == "STAFF") { 
                    setIsAdmin(false);
                }
            }
            
            if (userId) {
                const data = await GetMe();
                setUser(data);
            } else {
                Alert.alert('No user ID found');
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        const data = await logoutUser();
        await AsyncStorage.clear();
        authEmitter.emit('loginStatusChanged');
    };

    return(
        <SafeAreaView className='flex-1 bg-gray-200'>
            <>
                
                    <View className='bg-orange-500 h-24' style={styles.menuContainer}>
                        <View  style={styles.storeContainer}>
                            <Image
                                source={require('../assets/logo2.png')}
                                style={{
                                    width: '15%',
                                    height: '15%',
                                    aspectRatio: 1,
                                    borderRadius: 60,
                                    resizeMode: 'center',
                                    borderColor: CUSTOM_COLOR.Black,
                                    borderWidth: 1,
                                }}
                                />
                            <Text className='text-xl font-bold text-white'> Real Clothes</Text>
                        </View>
                        <View  className='mr-2' style={{ width: 32, height: 37 }}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("ProfileScreen")}>
                                <FontAwesome name="user-o" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ width: 30, height: 30 }}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("abc")}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        
                        <View className='mr-2' style={{ width: 32, height: 32, marginHorizontal: 5 }}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => setLogoutModalVisible(true)}>
                                <MaterialIcons name="logout" size={24} color="white" />
                            </TouchableOpacity>
                            <Modal visible={logoutModalVisible} animationType="slide" transparent={true}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{
                                    backgroundColor: 'white',
                                    padding: 20,
                                    width: '80%', // Control width
                                    borderRadius: 10, // Optional: for rounded corners
                                    shadowColor: '#000', // Optional: for shadow
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5
                                }}>
                                    <Text className="text-lg mb-4 text-center p-1"><Ionicons name="warning" size={30} color="#dd6b20"/> Are you sure you want to log out?</Text>
                                    <View className="flex-row w-full justify-center items-center space-x-4 mt-4">
                                        <TouchableOpacity className='flex justify-center items-center border border-orange-500 rounded-xl w-1/2 h-12' onPress={() => setLogoutModalVisible(false)}>
                                            <Text className="text-lg font-semibold text-orange-600">Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className='flex justify-center items-center bg-orange-500 rounded-xl w-1/2 h-12' onPress={handleLogout}>
                                            <Text className="text-lg font-semibold text-white">OK</Text>
                                        </TouchableOpacity>            
                                    </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        
                    </View>
                
               
                <View className='flex flex-row w-full justify-start items-center p-2 h-40 rounded-xl'>
                    <View className='bg-white rounded-xl border border-gray-400' style={styles.accountContainer}>
                        <View style={styles.infoContainer}>
            
                            <View style={styles.avataContainer}>
                            {user?.image ? (
                                <Image
                                source={{ uri: user.image }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    aspectRatio: 1,
                                    borderRadius: 60,
                                    resizeMode: 'center',
                                    borderColor: 'orange',
                                    borderWidth: 2,
                                }}
                                />
                                ) : (
                                <Image
                                source={require('../assets/avatar.png')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    aspectRatio: 1,
                                    borderRadius: 60,
                                    resizeMode: 'center',
                                    borderColor: 'orange',
                                    borderWidth: 2,
                                }}
                                />
                            )}
                            </View>
                            
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={[styles.textViewStyles, { fontSize: 20 }]}>
                                    {user?.fullName}
                                </Text>
                                <View style={{ width: '100%', height: 5 }} />
                                    <Text className='text-sm text-orange-600 p-1 border border-orange-600 rounded-xl'>
                                        {user?.email}
                                    </Text>
                                </View>
                            </View>
                    </View>
                </View>
                <View className='flex flex-row w-full justify-start items-center p-2 h-48 rounded-xl'>
                    <View className='bg-white mb-1 rounded-xl border border-gray-400' style={styles.oderContainer}>
                    <View style={{ width: '100%', height: '5%' }} />
                    <View style={styles.textContainer}>
                        <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        <Text className='text-lg text-orange-600 font-semibold underline'>Order News</Text>
                        </View>
                        <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                        <Text
                            className='text-lg text-orange-600 font-semibold underline'
                            onPress={() => navigation.navigate('OrderHistoryScreen')}>
                            View Now{' '}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listOderConatiner}>
                        <ViewNow number={0} status={"Confirm"} />
                        <ViewNow number={0} status={"On wait"} />
                        <ViewNow number={0} status={"Delivered"} />
                        <ViewNow number={0} status={"Cancel"} />
                    </View>
                    </View>
                </View>
                <View className='flex flex-row w-full justify-start items-center p-2 h-[300] rounded-xl'>
                    <View className='bg-gray-50 mb-1 rounded-xl border border-gray-400' style={styles.functionContainer}>
                        <Text className='text-lg text-orange-600 font-semibold underline text-center'>Management Features</Text>
                    <View style={styles.unitContainer}>
                        <View style={styles.unitContainer}>
                        
                        <TouchableOpacity className='flex justify-center items-center bg-white border border-orange-600 shadow-2xl rounded-xl w-24 h-20 p-2'
                            onPress={() => navigation.navigate('CustomerScreen')}
                        >
                            <Ionicons name="accessibility" size={24} color="#c2410c" />
                            <Text className="text-sm font-semibold text-orange-600">Customer</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.unitContainer}>
                        <TouchableOpacity className='flex justify-center items-center bg-white border border-orange-600 shadow-2xl rounded-xl w-24 h-20 p-2'
                            onPress={() => navigation.navigate('ProductMainScreen')}
                        >
                            <Ionicons name="cube" size={24} color="#c2410c" />
                            <Text className="text-sm font-semibold text-orange-600">Products</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.unitContainer}>
                    
                        <TouchableOpacity className='flex justify-center items-center bg-white border border-orange-600 shadow-2xl rounded-xl w-24 h-20 p-2'
                            onPress={() => navigation.navigate('OrderHistoryScreen')}
                        >
                            <Ionicons name="documents" size={24} color="#c2410c" />
                            <Text className="text-sm font-semibold text-orange-600">Orders</Text>
                        </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.unitContainer}>
                        <View style={styles.unitContainer}>
                        <TouchableOpacity className='flex justify-center items-center bg-white border border-orange-600 shadow-2xl rounded-xl w-24 h-20 p-1'
                            onPress={() => navigation.navigate('PromotionScreen')}
                        >
                            <Ionicons name="ticket" size={24} color="#c2410c" />
                            <Text className="text-sm font-semibold text-orange-600">Promotion</Text>
                        </TouchableOpacity>
                        
                        
                        </View>
                        {isAdmin && (
                            <><View style={styles.unitContainer}>
                                    <TouchableOpacity
                                        className="flex justify-center items-center bg-white border border-orange-600 shadow-2xl rounded-xl w-24 h-20 p-1"
                                        onPress={() => navigation.navigate('DailyReportScreen')}
                                    >
                                        <Ionicons name="pie-chart" size={24} color="#c2410c" />
                                        <Text className="text-sm font-semibold text-orange-600">Reports</Text>
                                    </TouchableOpacity>
                                </View><View style={styles.unitContainer}>
                                        <TouchableOpacity
                                            className="flex justify-center items-center bg-white border border-orange-600 shadow-2xl rounded-xl w-24 h-20 p-1"
                                            onPress={() => navigation.navigate('UserScreen')}
                                            disabled={false}
                                        >
                                            <MaterialIcons name="supervisor-account" size={24} color="#c2410c" />
                                            <Text className="text-sm font-semibold text-orange-600">Users</Text>
                                        </TouchableOpacity>
                                    </View></>
                        )}

                    </View>
                </View>
            </View>
        </>                    
      </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    
    storeContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
      storeText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    spaceContainer: {
      flex: 0.5,
      backgroundColor: CUSTOM_COLOR.SlateGray,
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    iconContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountContainer: {
        flex: 4,
        flexDirection: 'row',
      },
      infoContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      avataContainer: {
        width: '33%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      },
      textViewStyles: {
        fontFamily: FONT_FAMILY.Semibold,
        fontSize: 15,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.Black,
      },
      viewShopContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      butViewShopContainer: {
        width: 100,
        height: 40,
        borderColor: CUSTOM_COLOR.FlushOrange,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 20,
      },
      oderContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textContainer: {
        width: '90%',
        height: '20%',
        flexDirection: 'row',
      },
      listOderConatiner: {
        height: '75%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      functionContainer: {
        flex: 10,
        flexDirection: 'column',
      },
      unitContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#000000"
      },
      modalButtonOK: {
        backgroundColor: CUSTOM_COLOR.Red,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
      },
      modalButtonCancel: {
        backgroundColor: CUSTOM_COLOR.SlateGray,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
      },
      modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
})

export default HomeScreen;