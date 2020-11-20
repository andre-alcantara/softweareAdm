import React, { useState } from 'react';
import { View } from 'react-native';
import { SubTitle, Title, Wrapper } from '../Home/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';
import { Container } from '../MatterCreate/styles';
import { Footer } from '../MatterChoose/styles';

import { Picker } from '@react-native-picker/picker';

import { LinearGradient } from 'expo-linear-gradient';

const QuestionCreate = () => {
  const [language, setLanguage] = useState('')

  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <Title>Criar pergunta</Title>
        <SubTitle >Para criar uma nova pergunta, é necessário 4 respostas.</SubTitle>

        <Label style={{
          marginTop: 5
        }}>Pergunta:</Label>
        <Input 
        numberOfLines={10}
        multiline={true}
        style={{
          height: 150,
          paddingTop: 10,
          paddingRight: 10
        }}></Input>

      <Label>Dificuldade:</Label>
      <Picker
        selectedValue={language}
        itemStyle={{ fontFamily: 'SF_Medium'  }}
        style={{ width: '100%', borderRadius: 6}}
        onValueChange={(itemValue, itemIndex) =>
          setLanguage(itemValue)
        }>
        <Picker.Item label="Fácil" value='Fácil' />
        <Picker.Item label="Intermediário" value='Fácil' />
        <Picker.Item label="Avançado" value='Fácil' />
      </Picker>

      <Label>Resposta 1:</Label>
      <Input></Input>

      <Label>Resposta 2:</Label>
      <Input></Input>

      <Label>Resposta 3:</Label>
      <Input></Input>

      <Label>Resposta 4:</Label>
      <Input></Input>

      </Container>

      <Footer>
        <SubmitButton style={{
            marginTop: 15,
            marginBottom: 10
          }}>
        <LinearGradient colors={['#80D8FF', '#EA80FC']} style={{
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
         }}>
           <SubmitText>Criar</SubmitText>
         </LinearGradient>
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
}

export default QuestionCreate;