import axios from 'axios';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddColors = async (name: string): Promise<void> => {
    const AddColorUrl = apiServer + '/color';
    const accessToken = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    
    const config = {
        method: 'post',
        url: AddColorUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${parseToken}`,
        },
        data: JSON.stringify({ name }),
        maxBodyLength: Infinity,
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw error;
    }
}