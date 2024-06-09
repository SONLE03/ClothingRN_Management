import { Alert } from "react-native";
import { apiServer } from "../config";

const loginUser = async (username: string, password: string) => {
    console.log(username, password);
    const envLogin = apiServer + "/auth/login"
    const email = username;
    const checkRole = apiServer + `/auth/${email}`;
    try {      
      const role = await fetch(checkRole, {
        method: 'GET',
        headers: {},
      });
      const roleData = await role.json();
      if (roleData === 2) {
        Alert.alert('Unable to log in with customer account');
          return false;
      }
      const response = await fetch(envLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        Alert.alert('Username or password incorrect');
        return false;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi khi đăng nhập');
      // throw new Error('Đã xảy ra lỗi khi đăng nhập');
      return false;
    }
  };
  
  export default loginUser;