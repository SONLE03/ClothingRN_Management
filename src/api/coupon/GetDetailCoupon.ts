import axios from 'axios';
import { apiServer } from '../config';
import { ParseJSON } from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coupon } from '../../types/Coupon';

export const GetDetailCoupon = async (couponId: string): Promise<Coupon> => {
    const GetDetailCouponUrl = apiServer + `/coupons/couponId/${couponId}`
    const accessToken = await AsyncStorage.getItem('access_token');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'get',
            url: GetDetailCouponUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
          };
        const response = await axios.request<Coupon>(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};