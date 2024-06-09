import axios from 'axios';
import { MonthlyExpense } from '../../../types/Report';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetMonthlyExpenseURL = apiServer + '/reports/monthly-expense';

export const GetMonthlyExpense = async (year: number): Promise<MonthlyExpense[]> => {
  const data = JSON.stringify({ year });

  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetMonthlyExpenseURL,
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
    throw new Error('Failed to fetch monthly expense');
  }
};
