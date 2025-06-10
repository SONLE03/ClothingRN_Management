import axios from 'axios';
import {apiServer} from '../../config';
import {ParseJSON} from '../../ParseJSON';
import {DailyRevenueResponse} from '../../../entity/Report';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetRevenue = async (startDate: string, endDate: string) => {
  const GetRevenue = apiServer + '/analysis/order-analytics';
  console.log(GetRevenue);
  const accessToken = await AsyncStorage.getItem('access_token');
  if (accessToken) {
    const parsedToken = ParseJSON(accessToken);

    let data = JSON.stringify({
      startDate: startDate,
      endDate: endDate,
    });

    let config = {
      method: 'post', // Change to 'post'
      maxBodyLength: Infinity,
      url: GetRevenue,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  }
};
