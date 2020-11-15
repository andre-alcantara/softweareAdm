import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Wrapper, Container, Title, SubTitle } from '../Home/styles';

import { Label, Input, SubmitButton, SubmitText } from './styles';

const SignIn = ({ navigation }) => {
  return (
    <Wrapper>
      <Container>
        <Title>Entre em sua conta</Title>
        <SubTitle>Para isso precisamos do seu email e senha de Administrador</SubTitle>

        <Label style={{ marginTop: 15 }}>Email</Label>
        <Input />

        <Label>Senha</Label>
        <Input />

        
        <SubmitButton onPress={() => navigation.navigate('Dashboard')}>
          <LinearGradient colors={['#80D8FF', '#EA80FC']} style={{
            height: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
          }}>
            <SubmitText>Entrar</SubmitText>
            </LinearGradient>
          </SubmitButton>
       
        
      </Container>
    </Wrapper>

  );
}

export default SignIn;