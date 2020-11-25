import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../contexts/auth';

import { Wrapper, Container, Title, SubTitle } from '../Home/styles';

import { Label, Input, SubmitButton, SubmitText } from './styles';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { signUp } = useContext(AuthContext);

  const handleSignUp = () => {
    if(email == '' && password == '' && name == '') {
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
      signUp(email, password, name);
    }
  }

  return (
    <Wrapper>
      <Container>
        <Title>Criar uma conta de Administrador</Title>
        <SubTitle>Não se esqueça de nos fornecer um e-mail válido, OK? 😉</SubTitle>
        
        <Label style={{ marginTop: 15 }}>Nome completo</Label>
        <Input
          autoCapitalize='words'
          value={name}
          onChangeText={(text) => setName(text)}
        />  

        <Label>Email</Label>
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

        

        
        <SubmitButton onPress={handleSignUp}>
          <LinearGradient colors={['#80D8FF', '#EA80FC']} style={{
            height: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
          }}>
            <SubmitText>Criar Conta</SubmitText>
            </LinearGradient>
          </SubmitButton>
       
        
      </Container>
    </Wrapper>

  );
}

export default SignIn;