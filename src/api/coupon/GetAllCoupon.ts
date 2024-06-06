import axios, { AxiosResponse } from 'axios';
import { apiServer } from '../config';
import { ParseJSON } from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coupon } from '../../types/Coupon';

export const GetAllCoupon = async (): Promise<Coupon[]> => {
    const CouponURL = apiServer + '/coupons';
    const accessToken = await AsyncStorage.getItem('access_token')
      if (!accessToken) {
          throw new Error('No access token found');
      }
  
      const parseToken = ParseJSON(accessToken);
      
      try {
          const config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: CouponURL,
              headers: {
                "Authorization": `Bearer ${parseToken}`,
              }
            };
          
            const response: AxiosResponse<Coupon[]> = await axios.request(config);
            return response.data;
      } catch (error) {
          console.error(error);
          throw new Error('Get all products failed');
      }
}