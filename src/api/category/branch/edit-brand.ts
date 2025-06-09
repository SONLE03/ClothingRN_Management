import axios from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateBrand} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

// multipart/form-data for editing a branch
export const EditBrand = async (brandId: string, data: CreateBrand) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  const formData = new FormData();
  console.log('EditBranch id:', brandId);
  // Append branch fields
  formData.append('BrandName', data.BrandName);
  formData.append('Description', data.Description);
  console.log('EditBranch data:', data);  

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
  const brandIdCleaned = brandId.replace(/['"]/g, ''); // Clean brandId if it has quotes
  const EditBranchUrl = apiServer + `/brand/${brandIdCleaned}`;

  const response = await axios.put(EditBranchUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${parseToken}`,
    },
  });

  return response.data;
};
