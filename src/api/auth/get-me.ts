import axios from 'axios';
import {apiServer} from '../config';
import {ParseJSON} from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetMe = async (userId: string) => {
  // Remove quotes from userId if they exist
  const cleanUserId = userId.replace(/['"]/g, '');

  // Add userId to the URL path, not as request body
  const GetMeUrl = apiServer + `/auth/me/${cleanUserId}`;
  console.log('GetMeUrl:', GetMeUrl);

  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    // Using GET method, no request body needed
    const response = await fetch(GetMeUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${parseToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText} ${response.url}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GetMe error:', error);
    throw error;
  }
};
