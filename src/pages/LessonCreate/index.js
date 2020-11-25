import React, { useState } from 'react';
import { SubTitle, Title, Wrapper } from '../Home/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';
import { Container } from '../MatterCreate/styles';
import { Footer } from '../MatterChoose/styles';

import { Picker } from '@react-native-picker/picker';

import { LinearGradient } from 'expo-linear-gradient';

const LessonCreate = () => {
  const [difficulty, setDifficulty] = useState('Fácil');
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <Title>Criar lição</Title>
        <SubTitle>Não se esqueça de escrever uma descrição bem completa.</SubTitle>

        <Label style={{
          marginTop: 5
        }}>Assunto da lição:</Label>
        <Input></Input>

        <Label>Descrição:</Label>
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
        selectedValue={difficulty}
        itemStyle={{ fontFamily: 'SF_Medium'  }}
        style={{ width: '100%', borderRadius: 6}}
        onValueChange={(itemValue, itemIndex) =>
          setDifficulty(itemValue)
        }>
        <Picker.Item label="Fácil" value='Fácil' />
        <Picker.Item label="Intermediário" value='Intermediário' />
        <Picker.Item label="Avançado" value='Avançado' />
      </Picker>

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

export default LessonCreate;