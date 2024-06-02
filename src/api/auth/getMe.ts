import { ParseJSON } from "../ParseJSON";
import { UserProps } from "../../types/user/User";
import { apiServer } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const GetMeUrl = apiServer + "auth/me";

export const GetMe = async (): Promise<UserProps> => {

    const accessToken  = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error("No access token found");
    }
    
    const parseToken = ParseJSON(accessToken);
    
    try {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: GetMeUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        };
        const response = await axios.request(config);
        return response.data;
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}