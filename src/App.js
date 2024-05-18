import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Confirmation from './components/Confirmation';
import Home from './components/Home';

const App = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
      setStep(3);
    }
  }, []);

  useEffect(() => {
    if (step === 3) {
      localStorage.setItem('isLoggedIn', true);
    }
  }, [step]);

  return (
    <div>
      {step === 1 && <Login setStep={setStep} setPhoneNumber={setPhoneNumber} />}
      {step === 2 && <Confirmation setStep={setStep} phoneNumber={phoneNumber} />}
      {step === 3 && <Home />}
    </div>
  );
};

export default App;
