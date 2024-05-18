import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Title>Bienvenido - Página de inicio</Title>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export default Home;