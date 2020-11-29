import React, { useContext, useEffect } from 'react';
import { FlatList, Image } from 'react-native';
import { Button, ButtonText } from '../Dashboard/styles';
import { SubTitle, Title, Wrapper, Container } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';

import { Footer } from './styles';

import { SubmitButton, SubmitText } from '../SignIn/styles';

import { QuestionsContext } from '../../contexts/questions';


const MatterChoose = ({ navigation }) => {
  const { matters, listMatters } = useContext(QuestionsContext);
  useEffect(() => {
    listMatters();
    
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>Perguntas</Title>
        <SubTitle style={{
          marginBottom: 10
        }}>Escolha uma matéria:</SubTitle>

        <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          height: '100%'
        }}
          contentContainerStyle={{
            paddingBottom: 195
          }}
          keyExtractor={ item  => item.id}
          data={matters}
          renderItem={({ item }) =>
            <Button onPress={() => navigation.navigate('LessonIndex', {
              question: item,
              content: item.matterContent
            })}
              style={{
                backgroundColor: item.matterColor
            }}>
              <ButtonText style={{
                color: '#FFF'
              }}>{item.matterName}</ButtonText>
              <Image
                style={{
                  width: 70,
                  height: 70,
                }}
                source={{uri: `${item.matterIcon}`}}
              />
            </Button>
          }
        />


      </Container>

          <Footer>
            <SubmitButton onPress={() => navigation.navigate('MatterCreate')} 
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
            <SubmitText>Criar uma matéria</SubmitText>
            </LinearGradient>
            </SubmitButton>
          </Footer>
    
     
    </Wrapper>
  );
}

export default MatterChoose;