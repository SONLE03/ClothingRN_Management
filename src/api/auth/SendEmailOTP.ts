import axios from 'axios';
import { apiServer } from '../config';
import { ParseJSON } from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SendOtp = async (email: string) => {

    const Emailurl = apiServer + `/email/verifyEmail/${email}`;
    console.log(Emailurl);

    // const accessToken  = await AsyncStorage.getItem('access_token')
    // if (!accessToken) {
    //     throw new Error("No access token found");
    // }
    
    //const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Emailurl,
            headers: {
                //'Authorization': `Bearer ${parseToken}`,
            }
        };
    
        return axios.request(config);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//export default SendOtp;

