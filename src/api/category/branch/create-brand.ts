import axios from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateBrand} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

const AddBranchUrl = apiServer + '/brand';

// Multipart/form-data for adding a new brand
export const CreateNewBrand = async (data: CreateBrand) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  const formData = new FormData();

  // Append branch fields
  formData.append('BrandName', data.BrandName);
  formData.append('Description', data.Description);

  // Append images if available
  if (data.Image) {
    formData.append('Image', {
      uri: data.Image.uri,
      type: data.Image.type,
      name: data.Image.name,
    });
  }

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const response = await axios.post(AddBranchUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${parseToken}`,
    },
  });

  return response.data;
};
