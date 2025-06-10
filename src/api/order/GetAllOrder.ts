import axios from "axios";
import { apiServer } from "../config";
import { ParseJSON } from "../ParseJSON";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetAllOrder = async () => {

    const GetAllOrder = apiServer + "/order";
    const token = await AsyncStorage.getItem("access_token");
    
    if (!token) {
        throw new Error("No access token found");
    }

    const parseToken = ParseJSON(token);
    const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: GetAllOrder,
        headers: {
            "Authorization": `Bearer ${parseToken}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}