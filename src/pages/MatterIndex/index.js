import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Container, SubTitle, Title, Wrapper } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';

import { QuestionButton, QuestionText, DifficultyText, DifficultyView } from './styles';
import { Footer } from '../MatterChoose/styles';
import { SubmitButton, SubmitText } from '../SignIn/styles';

const MatterIndex = ({ route, navigation }) => {
  const { question, content } = route?.params;


  return (
    <Wrapper>
      <Container>
        <Title>{question.matterName}</Title>
        <SubTitle>Lições disponíveis:</SubTitle>
        <FlatList 
        showsVerticalScrollIndicator={false}
        style={{
          height: '100%'
        }}
          contentContainerStyle={{
            paddingBottom: 195
          }}
          keyExtractor={ item  => item.id}
          data={content}
          renderItem={({ item }) => 
            <QuestionButton onPress={() => navigation.navigate('QuestionIndex', {
              questions: item.questions,
              matter: item.title,
              difficulty: item.difficulty
            })}>
              <QuestionText numberOfLines={2}>{item.title}</QuestionText>
              <DifficultyView>
                <DifficultyText style={{
                  fontFamily: 'SF_Regular',
                  color: '#4B4949'
                }}>Dificuldade: </DifficultyText>
                <DifficultyText>{item.difficulty}</DifficultyText>
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
            <SubmitText>Criar uma lição</SubmitText>
          </LinearGradient>
          
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
}

export default MatterIndex;