import React, { useRef, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Container, SubTitle, Title, Wrapper } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';

import { QuestionButton, QuestionText, DifficultyText, DifficultyView } from './styles';
import { Footer } from '../MatterChoose/styles';
import { SubmitButton, SubmitText } from '../SignIn/styles';

const LessonIndex = ({ route, navigation }) => {
  const { question, content, matterKey } = route?.params;

  console.log(matterKey)


  const [key, setKey] = useState(null);
  const [finished, setFinished] = useState(null);

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

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
          keyExtractor={ item  => item.key}
          data={content}
          renderItem={({ item }) => 
            <QuestionButton onPress={() => navigation.navigate('QuestionIndex', {
              matterKey: question.key,
              difficultyKey: item.key,
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
        onPress={() => navigation.navigate('LessonCreate')}
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

      <Modalize snapPoint={240} ref={modalizeRef}>  
      <Wrapper>
        <Container>
          <Title>Deseja finalizar a matéria?</Title>
          <SubTitle>Você precisa finalizar essa matéria para enviá-la ao LovePhysics</SubTitle>

          <SubmitButton onPress={() => {}} 
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
            <SubmitText>Finalizar matéria</SubmitText>
            </LinearGradient>
            </SubmitButton>
        </Container>  
      </Wrapper>      
        
      </Modalize>
    </Wrapper>
  );
}

export default LessonIndex;