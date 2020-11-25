import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../contexts/auth';

import { Wrapper, Container, Title, SubTitle } from '../Home/styles';

import { Label, Input, SubmitButton, SubmitText } from './styles';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  const handleLogin = () => {
    if(email == '' && password == '') {
      Alert.alert(
        "Ops!",
        "Por favor, digite suas informações!",
        [
          { text: "OK", onPress: () => {} }
        ],
        { cancelable: false }
      );
    } 
    else {
      signIn(email, password);
    }
  }

  return (
    <Wrapper>
      <Container>
        <Title>Entre em sua conta</Title>
        <SubTitle>Para isso precisamos do seu email e senha de Administrador</SubTitle>

        <Label style={{ marginTop: 15 }}>Email</Label>
        <Input 
          autoCapitalize='none'
          placeholder='exemplo@exemplo.com'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Label>Senha</Label>
        <Input
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        
        <SubmitButton onPress={handleLogin}>
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