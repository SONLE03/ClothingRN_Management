import axios from 'axios';
import { CreateProductForm, ProductItemRequest } from '../../../types/Product';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AddExistedProduct = async (productId: string, productItemRequests: ProductItemRequest[]) => {
    const AddExistedProductUrl = apiServer + `/products/${productId}`;
    const accessToken = await AsyncStorage.getItem('access_token');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const response = await axios.post(AddExistedProductUrl, JSON.stringify(productItemRequests), {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`,
        },
    });

    return response.data;
};

