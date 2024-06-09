import axios from "axios";
import { apiServer } from "../config";
import { ParseJSON } from "../ParseJSON";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOrdersAnalysisByCustomer = async (customerId: string) => {

    const getOrdersAnalysisByCustomer = apiServer + `/orders/analysis/customer/${customerId}`;
    const token = await AsyncStorage.getItem("access_token");
    
    if (!token) {
        throw new Error("No access token found");
    }

    const parseToken = ParseJSON(token);
    const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: getOrdersAnalysisByCustomer,
        headers: {
            "Authorization": `Bearer ${parseToken}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}