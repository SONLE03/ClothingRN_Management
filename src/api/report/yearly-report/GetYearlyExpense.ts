import axios from 'axios';
import { YearlyExpense } from '../../../types/Report';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetYearlyExpenseURL = apiServer + '/reports/yearly-expense';

export const GetYearlyExpense = async (startYear: number, endYear: number): Promise<YearlyExpense[]> => {
  const data = JSON.stringify({ startYear, endYear });

  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetYearlyExpenseURL,
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
    throw new Error('Failed to fetch yearly expense');
  }
};
