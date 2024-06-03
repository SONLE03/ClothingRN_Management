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
import { launchImageLibrary } from 'react-native-image-picker';  
const ChangeProfile: React.FC= () => {
    const navigation = useNavigation();
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
    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets != null) {
                // Gán đường dẫn của ảnh đã chọn vào state imageUri
            
            }
        });
    };
    return (
         <SafeAreaView style={styles.container}>
                <>
                    <>
                        <Text style = {{color:"#000000"}}> Change Profile</Text>
                    </>
                </>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: CUSTOM_COLOR.White,
    },
})
export default ChangeProfile;