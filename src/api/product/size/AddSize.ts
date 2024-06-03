import axios from 'axios';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AddSize = async (data: string) => {
    const SizeURL = apiServer + '/size';
    const accessToken = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: SizeURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parseToken}`,
            },
            data: JSON.stringify(data),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}