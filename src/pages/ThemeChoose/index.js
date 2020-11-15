import React from 'react';
import { FlatList, Image } from 'react-native';
import { Button, ButtonText } from '../Dashboard/styles';
import { SubTitle, Title, Wrapper, Container } from '../Home/styles';

import { Footer } from './styles';

import Activity from '../../data/activity';
import { color } from 'react-native-reanimated';
import { SubmitButton, SubmitText } from '../SignIn/styles';

const ThemeChoose = ({ navigation }) => {


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
          data={Activity}
          renderItem={({ item }) => 
            <Button style={{
              backgroundColor: item.color
            }}>
              <ButtonText>{item.title}</ButtonText>
              <Image 
                style={{
                  width: 70,
                  height: 70,
                }}
                source={{uri: `https://lovephysics.blob.core.windows.net/${item.icon}`}}
              />         
            
            </Button>
          }
        />

      

      </Container>
      
          <Footer>
            <SubmitButton onPress={() => navigation.navigate('ThemeCreate')} 
            style={{
              marginTop: 15,
              marginBottom: 10
            }}>
              <SubmitText>Criar uma matéria</SubmitText>
            </SubmitButton>
          </Footer>
    
     
    </Wrapper>
  );
}

export default ThemeChoose;