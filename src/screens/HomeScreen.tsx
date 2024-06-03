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
    Image
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CUSTOM_COLOR } from '../theme/theme';
import FONT_FAMILY from '../consts/fonts';
import ViewNow from '../components/ViewNow';
import FunctionCard from '../components/FunctionCard';
import { UserProps } from '../types/User';
import { GetUserById } from '../api/users/GetUserById';
import { useAuth } from '../util/AuthContext';
import logoutUser from '../api/auth/logout';
import Modal from 'react-native-modal';
const HomeScreen = ({navigation} : any) => {
    // const navigation = useNavigation();
    const { authEmitter } = useAuth();
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = await AsyncStorage.getItem('user_id');
            if (userId) {
                const cleanUserId = userId.replace(/"/g, ''); // Remove any extraneous double quotes
                const data = await GetUserById(cleanUserId);
                setUser(data);
                setLoading(false);
            } else {
                Alert.alert('No user ID found');
                setLoading(false);
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
        <SafeAreaView style={styles.container}>
            <>
                <>
                    <View style={styles.menuContainer}>
                        <View style={styles.storeContainer}>
                            <Image
                                source={require('../assets/logo.png')}
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
                            <Text style={styles.storeText}> Real Clothes</Text>
                        </View>
                        <View style={{ width: 32, height: 37 }}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("ChangeProfile" as never)}>
                                <FontAwesome name="user-o" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 10, height: '100%' }} />
                        <View style={{ width: 30, height: 30 }}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("abc" as never)}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 5, height: '100%' }} />
                        <View style={{ width: 32, height: 32, marginHorizontal: 5 }}>
                            <TouchableOpacity style={styles.iconContainer} onPress={() => setLogoutModalVisible(true)}>
                                <MaterialIcons name="logout" size={24} color="black" />
                            </TouchableOpacity>
                            <Modal isVisible={logoutModalVisible}>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalText}>Đăng xuất khỏi tài khoản này?</Text>
                                    <TouchableOpacity style={styles.modalButtonOK} onPress={handleLogout}>
                                        <Text style={styles.modalButtonText}>Đăng xuất</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setLogoutModalVisible(false)}>
                                        <Text style={styles.modalButtonText}>Hủy</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ width: 10, height: '100%' }} />
                    </View>
                </>
                <View style={styles.spaceContainer} />
                <>
                    <View style={styles.accountContainer}>
                        <View style={styles.infoContainer}>
                            <View style={{ width: 10, height: '100%' }} />
                            <View style={styles.avataContainer}>
                            {imageUrl ? (
                                <Image
                                // source={{ uri: imageUrl }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    aspectRatio: 1,
                                    borderRadius: 60,
                                    resizeMode: 'center',
                                    borderColor: CUSTOM_COLOR.Black,
                                    borderWidth: 1,
                                }}
                                />
                                ) : (
                                <Image
                                source={require('../assets/user-128-128.png')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    aspectRatio: 1,
                                    borderRadius: 60,
                                    resizeMode: 'center',
                                    borderColor: CUSTOM_COLOR.Black,
                                    borderWidth: 1,
                                }}
                                />
                            )}
                            </View>
                            <View style={{ width: 15, height: '100%' }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={[styles.textViewStyles, { fontSize: 20 }]}>
                                    {user?.fullName}
                                </Text>
                                <View style={{ width: '100%', height: 5 }} />
                                    <Text style={[styles.textViewStyles, { fontSize: 15 }]}>
                                        {user?.email}
                                    </Text>
                                </View>
                            </View>
                    </View>
                </>
                <View style={styles.spaceContainer} />
                <>
                    <View style={styles.oderContainer}>
                    <View style={{ width: '100%', height: '5%' }} />
                    <View style={styles.textContainer}>
                        <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        <Text style={styles.textViewStyles}>Order New</Text>
                        </View>
                        <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                        <Text
                            style={styles.textViewStyles}
                            onPress={() => navigation.navigate('Order' as never)}>
                            View Now{' '}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listOderConatiner}>
                        {/* <FlatList
                        horizontal={true}
                        data={Order}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                            <ViewNow number={item.number} status={item.status} />
                            );
                        }}
                        /> */}

                        <ViewNow number={0} status={"Confirm"} />
                        <ViewNow number={0} status={"On wait"} />
                        <ViewNow number={0} status={"Delovering"} />
                        <ViewNow number={0} status={"Delivered"} />
                    </View>
                    </View>
                </>
                <View style={styles.spaceContainer} />
                <>
                    <View style={styles.functionContainer}>
                    <View style={styles.unitContainer}>
                        <View style={styles.unitContainer}>
                        <FunctionCard
                            onPress={() => navigation.navigate('CategoryMainScreen' as never)}
                            source= {null}
                            text="Categories"
                        />
                        </View>
                        <View style={styles.unitContainer}>
                        <FunctionCard
                            onPress={() => navigation.navigate('MyProduct' as never)}
                            source= {null}
                            text="Products"
                        />
                        </View>
                        <View style={styles.unitContainer}>
                        <FunctionCard
                            onPress={() => navigation.navigate('Order' as never)}
                            source= {null}
                            text="Orders"
                        />
                        </View>

                    </View>
                    <View style={styles.unitContainer}>
                        <View style={styles.unitContainer}>
                        <FunctionCard
                            onPress={() => navigation.navigate('Promotion' as never)}
                            source= {null}
                            text="Promotions"
                        />
                        </View>
                        <View style={styles.unitContainer}>
                        <FunctionCard
                            onPress={() => navigation.navigate('Report' as never)}
                            source= {null}
                            text="Financial Report"
                        />
                        </View>
                        <View style={styles.unitContainer}>
                        <FunctionCard
                            onPress={() => navigation.navigate('ManageUser' as never)}
                            source= {null}
                            text="Manage User"
                        />
                        </View>

                    </View>
                </View>
            </>
        </>                    
      </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: CUSTOM_COLOR.White,
    },
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
      flex: 2,
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