import React from 'react';
import { FlatList } from 'react-native';
import { Container, SubTitle, Title, Wrapper } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';

import Questions from '../../data/question';

import { QuestionButton, QuestionText, DifficultyText, DifficultyView } from '../MatterIndex/styles';
import { Footer } from '../MatterChoose/styles';
import { SubmitButton, SubmitText } from '../SignIn/styles';

// import { Container } from './styles';

const QuestionIndex = ({ navigation, route }) => {
  const { questions, matter, difficulty } = route?.params;


  return (
    <Wrapper>
      <Container>
        <Title>{matter}</Title>
        <SubTitle>Questões disponíveis:</SubTitle>
        <FlatList 
        showsVerticalScrollIndicator={false}
        style={{
          height: '100%'
        }}
          contentContainerStyle={{
            paddingBottom: 195
          }}
          keyExtractor={ item  => item.key}
          data={questions}
          renderItem={({ item }) => 
            
            <QuestionButton onPress={() => navigation.navigate('QuestionControl', {
              answer: item.answers,
              question: item.question,
              correction: item.correction
            })}>
              <DifficultyText style={{ marginBottom: 10, color: '#989595' }}>QUESTÃO  {item.key + 1}</DifficultyText>
              <QuestionText numberOfLines={2}>{item.question}</QuestionText>
              <DifficultyView>
                <DifficultyText style={{
                  fontFamily: 'SF_Regular',
                  color: '#4B4949',
                }}>Correção: </DifficultyText>
                <DifficultyText style={{ color: '#413F3F', fontFamily: 'SF_Medium', width: '80%' }} numberOfLines={2}>{item.correction}</DifficultyText>
              </DifficultyView>      
            </QuestionButton>
          }
        />
      </Container>

      <Footer>
        <SubmitButton 
        onPress={() => navigation.navigate('QuestionCreate')}
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
            <SubmitText>Criar uma pergunta</SubmitText>
          </LinearGradient>
          
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
}

export default QuestionIndex;