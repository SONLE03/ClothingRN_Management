import axios from 'axios';
import { apiServer } from '../config';
import { ParseJSON } from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CreateCoupon = async (name : string, startDate: string, endDate: string, discountValue: string, minimumBill: string, quantity: string) => {
    const AddCouponUrl = apiServer + '/coupons';
    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }
    const coupon = {
        name: name, 
        startDate: startDate,
        endDate : endDate,
        discountValue: discountValue,
        minimumBill: minimumBill,
        quantity: quantity
    }
      const parseToken = ParseJSON(accessToken);
    
    try {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AddCouponUrl,
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
    throw new Error('Failed to add coupon');
    }
    
};