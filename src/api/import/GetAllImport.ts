import axios, {AxiosResponse} from 'axios';
import {apiServer} from '../config';
import {ParseJSON} from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImportInvoice} from '../../entity/Import';

export const GetAllImport = async (): Promise<ImportInvoice[]> => {
  const ImportURL = apiServer + '/imports';
  const accessToken = await AsyncStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: ImportURL,
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const response: AxiosResponse<ImportInvoice[]> = await axios.request(
      config,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all import invoices failed');
  }
};
