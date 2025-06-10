import axios from "axios";
import { apiServer } from "../config";
import { ParseJSON } from "../ParseJSON";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageFile } from "../auth/change-avatar";

export const UpdateOrderStatus = async (orderId: string, EOrderStatus: number, Note?: string, ShipperId?: string, Images?: ImageFile[]) => {

    const UpdateOrderStatusUrl = apiServer + `/order/${orderId}/status`;

    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    const formData = new FormData();
    formData.append('EOrderStatus', EOrderStatus.toString());
    if (Note) {
        formData.append('Note', Note);
    }
    if (ShipperId) {
        formData.append('ShipperId', ShipperId);
    }
    if (Images) {
        for (let i = 0; i < Images.length; i++) {
            formData.append('Images', Images[i]);
        }
    }

    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: UpdateOrderStatusUrl,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    };
    try {
        const response = await axios.request(config);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}