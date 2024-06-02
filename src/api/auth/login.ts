import { apiServer } from "../config";

const loginUser = async (username: string, password: string) => {
    console.log(username, password);
    const envLogin = apiServer + "/auth/login"
    try {
      const response = await fetch(envLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Đã xảy ra lỗi khi đăng nhập');
    }
  };
  
  export default loginUser;