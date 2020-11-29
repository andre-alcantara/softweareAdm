import React, { useContext, useEffect } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Container, SubTitle, Title, Wrapper } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';

import { QuestionButton, QuestionText, DifficultyText, DifficultyView } from '../LessonIndex/styles';
import { Footer } from '../MatterChoose/styles';
import { SubmitButton, SubmitText } from '../SignIn/styles';

import { CuriositiesContext } from '../../contexts/curiosity';


const CuriosityIndex = ({ navigation }) => {
  const { curiosities, listCuriosities } = useContext(CuriositiesContext);

  useEffect(() => {
    listCuriosities('');
  }, [])

  return (
    <Wrapper>
      <Container>
        <Title>Curiosidades</Title>
        <SubTitle>Curiosidades disponíveis:</SubTitle>

        <FlatList 
        showsVerticalScrollIndicator={false}
        style={{
          height: '100%'
        }}
          contentContainerStyle={{
            paddingBottom: 195
          }}
          keyExtractor={ item  => item.key}
          data={curiosities}
          renderItem={({ item }) => 
            <QuestionButton 
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={() => navigation.navigate('CurisityControl', {
                info: item
            })}>
              
              <View>
              <QuestionText style={{
                  width: 270,
              }} numberOfLines={2}>{item.title}</QuestionText>
                
              </View>   
              <Image 
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 4
                }}
                source={{ uri: `${item.image}` }}
                />   
            </QuestionButton>
          }
        />
      </Container>

      <Footer>
        <SubmitButton 
        onPress={() => navigation.navigate('CuriosityCreate')}
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
            <SubmitText>Adicionar uma curiosidade</SubmitText>
          </LinearGradient>
          
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
}

export default CuriosityIndex;