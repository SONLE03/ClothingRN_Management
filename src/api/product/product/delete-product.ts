import axios from 'axios';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeleteProduct = async (productId: string) => {
    const cleanProductId = productId.replace(/['"]/g, '');
    const DeleteProductUrl = apiServer + `/product/${cleanProductId}`;
    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: DeleteProductUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
        };
        return axios.request(config);
    } catch (error) {
        console.error(error);
    }
}