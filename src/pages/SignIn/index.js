import React from 'react';
import { View } from 'react-native';

import { Wrapper, Container, Title, SubTitle } from '../Home/styles';

import { Label, Input, SubmitButton, SubmitText } from './styles';

const SignIn = ({ navigation }) => {
  return (
    <Wrapper>
      <Container>
        <Title>Entre em sua conta</Title>
        <SubTitle>Para isso precisamos do seu email e senha de um Administrador</SubTitle>

        <Label style={{ marginTop: 15 }}>Email</Label>
        <Input />

        <Label>Senha</Label>
        <Input />

        <SubmitButton onPress={() => navigation.navigate('Dashboard')}>
          <SubmitText>Entrar</SubmitText>
        </SubmitButton>
      </Container>
    </Wrapper>

  );
}

export default SignIn;