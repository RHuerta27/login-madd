import React, { useState, useEffect, useRef } from 'react';
import { verifyCode, sendVerificationCode } from '../services/api';
import styled from 'styled-components';

const Confirmation = ({ setStep, phoneNumber }) => {
  const [code, setCode] = useState('');
  const [resendAvailable, setResendAvailable] = useState(false);
  const [timer, setTimer] = useState(15);

  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setResendAvailable(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    setCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await verifyCode(phoneNumber, code);
    if (isValid === 200) {
      setStep(3);
    } else {
      alert('Código inválido');
    }
  };

  const handleResend = async () => {
    await sendVerificationCode(phoneNumber);
    setResendAvailable(false);
    setTimer(15);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Ingresa el código:</Label>
      <CodeInputContainer>
        {Array.from({ length: 6 }, (_, index) => (
          <CodeInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            type="text"
            value={code[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={1}
            required
          />
        ))}
      </CodeInputContainer>
      <Button type="submit">Verificar Código</Button>
      <ResendWrapper>
        <ResendButton
          type="button"
          onClick={handleResend}
          disabled={!resendAvailable}
        >
          {resendAvailable ? 'Reenviar Código' : `Reenviar en ${timer}s`}
        </ResendButton>
      </ResendWrapper>
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

const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CodeInput = styled.input`
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 30px;
  text-align: center;
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

const ResendWrapper = styled.div`
  margin-top: 20px;
`;

const ResendButton = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: ${props => (props.disabled ? '#ccc' : '#28a745')};
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#218838')};
  }
`;

export default Confirmation;
