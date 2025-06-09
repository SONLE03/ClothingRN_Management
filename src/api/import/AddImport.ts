import axios from 'axios';
import {apiServer} from '../config';
import {AddImportItem} from '../../entity/Import';
import {ParseJSON} from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddNewImport = async (items: AddImportItem[]) => {
  const url = apiServer + '/imports';

  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  if (accessToken) {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parseToken}`,
      },
      data: JSON.stringify(items),
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('No access token found');
  }
};
