import React, { useState } from 'react';
import { sendVerificationCode } from '../services/api';
import PhoneInput from 'react-phone-input-2';
import styled from 'styled-components';
import 'react-phone-input-2/lib/style.css';

const Login = ({ setStep, setPhoneNumber }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    setPhoneNumber(formattedPhone);
    await sendVerificationCode(formattedPhone);
    setStep(2);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Inicia sesión con tu número telefónico</Label>
      <PhoneInputWrapper>
        <PhoneInput
          country={'mx'}
          value={phone}
          onChange={phone => setPhone(phone)}
          inputStyle={{
            width: '90%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
            left: 36,
          }}
        />
      </PhoneInputWrapper>
      <Button type="submit">Enviar Código</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;
const PhoneInputWrapper = styled.div`
  width: 100%;
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;


export default Login;
