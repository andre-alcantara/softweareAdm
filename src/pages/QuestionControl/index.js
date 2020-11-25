import React, { useState } from 'react';

import { View } from 'react-native';

import { SubTitle, Title, Wrapper } from '../Home/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';
import { Container } from '../MatterCreate/styles';
import { Footer } from './styles';

import { Picker } from '@react-native-picker/picker';
import { RadioButton, Text } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';

const QuestionControl = ({ route, navigation }) => {
  const { question, correction, answer } = route?.params;

  const [value, setValue] = React.useState('first');
  const [language, setLanguage] = useState('');


  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        <Title>Controle de pergunta</Title>
        <SubTitle>Atualize ou exclua uma pergunta existente</SubTitle>


        <Label style={{
          marginTop: 5
        }}>Pergunta:</Label>
        <Input 
        numberOfLines={10}
        multiline={true}
        style={{
          height: 150,
          paddingTop: 10,
          paddingRight: 10,
          paddingBottom: 10
        }}>
          <SubTitle style={{ fontSize: 18, color: '#121212' }}>{question}</SubTitle>
        </Input>

        <Label>Correção:</Label>
        <Input 
        numberOfLines={10}
        multiline={true}
        style={{
          height: 150,
          paddingTop: 10,
          paddingRight: 10,
          paddingBottom: 10
        }}>
          <SubTitle style={{ fontSize: 18, color: '#121212' }}>{correction}</SubTitle>
        </Input>

      <Label>Dificuldade:</Label>
      <Picker
        selectedValue={language}
        itemStyle={{ fontFamily: 'SF_Medium'  }}
        style={{ width: '100%', borderRadius: 6}}
        onValueChange={(itemValue, itemIndex) =>
          setLanguage(itemValue)
        }>
        <Picker.Item label="Fácil" value='Fácil' />
        <Picker.Item label="Intermediário" value='Intermediário' />
        <Picker.Item label="Avançado" value='Avançado' />
      </Picker>

      <Label>Resposta 1:</Label>
      <Input>{answer[0].answer}</Input>

      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View>
        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === 'first' ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value="first" />
      </View>
     
    
    
      <Label>Resposta 2:</Label>
      <Input>{answer[1].answer}</Input>
      <View>
        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === 'second' ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value="second" />
      </View>
      
      <Label>Resposta 3:</Label>
      <Input>{answer[2].answer}</Input>
      <View>
        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === 'third' ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value="third" />
      </View>

      <Label>Resposta 4:</Label>
      <Input>{answer[3].answer}</Input>
      <View>
        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === 'fourth' ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value="fourth" />
      </View>

      </RadioButton.Group>
      </Container>

      <Footer>
        <SubmitButton 
        onPress={() => {}}
        style={{
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
           <SubmitText>Atualizar</SubmitText>
         </LinearGradient>
        </SubmitButton>

        <SubmitButton style={{ marginTop: 0, marginBottom: 20 }}>
        <LinearGradient colors={['#FF5555', '#CF8686']} style={{
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
         }}>
           <SubmitText>Excluir</SubmitText>
         </LinearGradient>
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
}

export default QuestionControl;