import axios from 'axios';
import { ParseJSON } from '../ParseJSON';
import { apiServer } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GetUserById = async (id: string) => {
    const GetUserByIdUrl = apiServer + `/users/${id}`;
    const accessToken  = await AsyncStorage.getItem('access_token')
    if (accessToken) {
        const parsedToken = ParseJSON(accessToken);
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetUserByIdUrl,
            headers: {
                'Authorization': `Bearer ${parsedToken}`
            }
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('No access token found');
    }
}