import axios from 'axios';

const BASE_URL = 'https://api4sun.dudewhereismy.mx';
const KEYCODE = 'Flutt3rTest';
const FirebaseToken = 'Test';
const Type = 'A';

export const getAuthToken = async () => {
  try {
    console.log('Requesting auth token...');
    const response = await axios.post(`${BASE_URL}/sosroad/token`, { keycode: KEYCODE });
    console.log('Auth token received:', response.data);
    return response.data.data.Authorized; // Devuelve el token directamente
  } catch (error) {
    console.error('Error fetching auth token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const sendVerificationCode = async (phoneNumber, token) => {
  try {
    console.log('Sending verification code to:', phoneNumber);
    console.log('elTokenVerify:', token);
    console.log("url", `${BASE_URL}/sosroad/phone?token`, { phoneNumber } );
    const url = `${BASE_URL}/sosroad/phone?token=${encodeURIComponent(token)}&type=A&phone=${encodeURIComponent(phoneNumber)}`;
    const response = await axios.post(url, {}, {
    headers: {
        Authorization: `Bearer ${token}`, // Usa el token directamente
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
    console.log("elTokenTelefono", token);
    console.log('Verifying code for:', phoneNumber, 'with code:', code);
    console.log("URL", `${BASE_URL}/sosroad/phone?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phoneNumber)}`);
    console.log("tokenVerify", token);

    // Codificar los parámetros para incluirlos en la URL
    const url = `${BASE_URL}/sosroad/phone?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phoneNumber)}`;
    
    // Enviar solicitud GET con el token en los encabezados
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Usa el token directamente
      },
    });
    
    console.log('Respuesta:', response);

    console.log('Code verification response:', response.data.code);
    return response.data.code; // Asegúrate de retornar el campo correcto
  } catch (error) {
    console.error('Error verifying code:', error.response ? error.response.data : error.message);
    throw error;
  }
};