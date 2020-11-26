import React, { useContext, useEffect } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Container, SubTitle, Title, Wrapper } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';

import { QuestionButton, QuestionText, DifficultyText, DifficultyView } from '../LessonIndex/styles';
import { Footer } from '../MatterChoose/styles';
import { SubmitButton, SubmitText } from '../SignIn/styles';

import { ScientistsContext } from '../../contexts/scientist';


const ScientistIndex = ({ navigation }) => {
  const { listScientist, scientists } = useContext(ScientistsContext);

  useEffect(() => {
    listScientist('');
  }, [])

  return (
    <Wrapper>
      <Container>
        <Title>Cientistas</Title>
        <SubTitle>Cientistas disponíveis:</SubTitle>

        <FlatList 
        showsVerticalScrollIndicator={false}
        style={{
          height: '100%'
        }}
          contentContainerStyle={{
            paddingBottom: 195
          }}
          keyExtractor={ item  => item.id}
          data={scientists}
          renderItem={({ item }) => 
            <QuestionButton 
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={() => navigation.navigate('ScientistControl', {
              info: item
            })}>
              
              <View>
              <QuestionText numberOfLines={2}>{item.name}</QuestionText>
                <DifficultyText style={{
                  fontFamily: 'SF_Medium',
                  color: '#4B4949',
                  marginTop: 6
                }}>{item.nationality} </DifficultyText>
                
              </View>   
              <Image 
                style={{
                  width: 45,
                  height: 45
                }}
                source={{ uri: `${item.image}` }}
                />   
            </QuestionButton>
          }
        />
      </Container>

      <Footer>
        <SubmitButton 
        onPress={() => navigation.navigate('ScientistCreate')}
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
            <SubmitText>Adicionar um cientista</SubmitText>
          </LinearGradient>
          
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
}

export default ScientistIndex;