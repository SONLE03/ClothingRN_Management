import axios from "axios";
import { apiServer } from "../config";
import { ParseJSON } from "../ParseJSON";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const AddStaff = async(email: string, fullName: string, phone: string, password: string):Promise<any> => {
    const AddStaffUrl = apiServer + '/users';
    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }
    const parseToken = ParseJSON(accessToken);
    const data = new FormData();
    data.append('email', email);
    data.append('phone', phone);
    data.append('fullName', fullName);
    data.append('password', password);
    data.append('role', 1);
    data.append('enable', 1);
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: AddStaffUrl,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
            'Content-Type': 'multipart/form-data',
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        return false;
    }
}