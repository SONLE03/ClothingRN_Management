import axios from 'axios';
import { apiServer } from '../config';
import { ParseJSON } from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeleteCoupon = async (couponId: string) => {

    const DeleteCouponUrl = apiServer + `/coupons/couponId/${couponId}`
    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: DeleteCouponUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
        };
        return axios.request(config);
    } catch (error) {
        console.error(error);
    }
}