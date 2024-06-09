import axios from 'axios';
import { MonthlyRevenue } from '../../../types/Report';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetMonthlyRevenueURL = apiServer + '/reports/monthly-revenue';

export const GetMonthlyRevenue = async (year: number): Promise<MonthlyRevenue[]> => {
  const data = JSON.stringify({ year });

  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetMonthlyRevenueURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${parseToken}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch monthly revenue');
  }
};
