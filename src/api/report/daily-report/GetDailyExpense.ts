import axios from 'axios';
import { apiServer } from '../../config';
import { DailyExpenseResponse } from '../../../types/Report';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetDailyExpenseUrl = apiServer + "/reports/daily-expense";


export const GetDailyExpense = async (startDate: string, endDate: string) => {
    let data = JSON.stringify({
        "startDate": startDate,
        "endDate": endDate
    });

    const accessToken = await AsyncStorage.getItem('access_token');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    let config = {
        method: 'post', // Change to 'post'
        maxBodyLength: Infinity,
        url: GetDailyExpenseUrl,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${parseToken}`
        },
        data: data
    };

    const response = await axios.request(config);
    return response.data;
};