import axios from 'axios';
import { apiServer } from '../config';
import { ParseJSON } from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UpdateCoupon = async (couponId: string, name : string, startDate: string, endDate: string, discountValue: string, minimumBill: string, quantity: string) => {
    const UpdateCouponUrl = apiServer + `/coupons/couponId/${couponId}`
    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }
    const coupon = {
        id: couponId,
        name: name, 
        startDate: startDate,
        endDate : endDate,
        discountValue: discountValue,
        minimumBill: minimumBill,
        quantity: quantity, 
        status: 0
    }
      const parseToken = ParseJSON(accessToken);
    
    try {
    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: UpdateCouponUrl,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`,
        },
        data: JSON.stringify(coupon),
    };

    const response = await axios.request(config);
    return response.data;
    } catch (error) {
    console.error(error);
    throw new Error('Failed to update coupon');
    }
    
};