import axios from 'axios';

const BASE_URL = 'https://api4sun.dudewhereismy.mx';
const KEYCODE = 'Flutt3rTest';

export const getAuthToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/sosroad/token`, { keycode: KEYCODE });
    return response.data.data.Authorized;
  } catch (error) {
    console.error('Error fetching auth token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const sendVerificationCode = async (phoneNumber, token) => {
  try {
    const url = `${BASE_URL}/sosroad/phone?token=${encodeURIComponent(token)}&type=A&phone=${encodeURIComponent(phoneNumber)}`;
    const response = await axios.post(url, {}, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  });
    console.log('Verification code sent:', response.data);
  } catch (error) {
    console.error('Error sending verification code:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const verifyCode = async (phoneNumber, code, token) => {
  try {

    const url = `${BASE_URL}/sosroad/phone?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phoneNumber)}`;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Respuesta:', response);

    return response.data.code;
  } catch (error) {
    console.error('Error verifying code:', error.response ? error.response.data : error.message);
    throw error;
  }
};