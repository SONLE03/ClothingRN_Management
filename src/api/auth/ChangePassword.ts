import axios from 'axios';
import { apiServer } from '../config';

export const ChangePassword = async (email: string, password: string, repeatPassword: string) => {
    const ChangePasswordUrl = apiServer + `/users/changePassword/${email}`;

    let data = JSON.stringify({
        password,
        repeatPassword
    });


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: ChangePasswordUrl,
        headers: { 
            'Content-Type': 'application/json',
        },
        data : data
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        //throw error;
        return false;
    }
};