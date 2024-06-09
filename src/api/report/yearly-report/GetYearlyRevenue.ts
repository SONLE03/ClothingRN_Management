import axios from 'axios';
import { YearlyRevenue } from '../../../types/Report';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetYearlyRevenueURL = apiServer + '/reports/yearly-revenue';

export const GetYearlyRevenue = async (startYear: number, endYear: number): Promise<YearlyRevenue[]> => {
  const data = JSON.stringify({ startYear, endYear });

  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetYearlyRevenueURL,
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
    throw new Error('Failed to fetch yearly revenue');
  }
};
