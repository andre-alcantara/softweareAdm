import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { Button, ButtonText } from '../Dashboard/styles';
import { SubTitle, Title, Wrapper, Container } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Modalize } from 'react-native-modalize';

import { Footer } from './styles';

import { SubmitButton, SubmitText } from '../SignIn/styles';

import { QuestionsContext } from '../../contexts/questions';


const MatterChoose = ({ navigation }) => {
  const [question, setQuestion] = useState(null);
  const [content, setContent] = useState(null);
  const [key, setKey] = useState(null);
  const [finished, setFinished] = useState(null);

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const finishedMatter = () => {
    if(finished == false) {
      changeStatus(key, finished)
    }
    
  }

  const { matters, listMatters, changeStatus } = useContext(QuestionsContext);
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
          keyExtractor={ item  => item.key}
          data={matters}
          renderItem={({ item }) =>
            <Button onPress={() => {
              if(item.finished) {
                navigation.navigate('LessonIndex', {
                  question: item,
                  content: item.matterContent
                })
              }
              else {
                setQuestion(item);
                setContent(item.matterContent);
                setKey(item.key);
                setFinished(item.finished);
                onOpen();
              }
          }}
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

      <Modalize snapPoint={240} ref={modalizeRef}>  
      <Wrapper>
        <Container>
          <Title>Deseja finalizar a matéria?</Title>
          <SubTitle>Você precisa finalizar essa matéria para enviá-la ao LovePhysics</SubTitle>

          <SubmitButton onPress={finishedMatter} 
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