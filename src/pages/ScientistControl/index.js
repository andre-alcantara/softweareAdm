import React from 'react';
import { Image } from 'react-native';
import { Title, Wrapper, SubTitle } from '../Home/styles';
import { Container, Photo, PhotoText, PhotoView } from '../MatterCreate/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';

import { Footer } from '../MatterChoose/styles';

import { LinearGradient } from 'expo-linear-gradient';
// import { Container } from './styles';

const ScientistControl = ({ navigation, route }) => {
  const { info } = route?.params;

  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
        <Title>Controle de cientista</Title>

        <Label>Nome:</Label>
        <Input>
          <SubTitle style={{ fontSize: 18, color: '#121212' }}>{info.name}</SubTitle>
        </Input>

        <Label>Foto:</Label>
        <PhotoView>
          <Photo>
          <Image 
            style={{
              width: 110,
              height: 110
            }}
            source={{ uri: `${info.image}` }}
          />
          </Photo>
          <PhotoText>Escolher Imagem</PhotoText>
        </PhotoView>

        <Label>Quem foi? (breve explicação):</Label>
        <Input numberOfLines={30}
        multiline={true}
        style={{
          height: 150,
          paddingTop: 10,
          paddingRight: 10
        }}>
          <SubTitle style={{ fontSize: 17, color: '#121212' }}>{info.who}</SubTitle>
        </Input>

        <Label>Nacionalidade:</Label>
        <Input>
          <SubTitle style={{ fontSize: 17, color: '#121212' }}>{info.nationality}</SubTitle>
        </Input>

        <Label>Data de nascimento e falecimento:</Label>
        <Input>
          <SubTitle style={{ fontSize: 17, color: '#121212' }}>{info.life}</SubTitle>
        </Input>

        <Label>Homenagens e/ou prêmios:</Label>
        <Input numberOfLines={10}
        multiline={true}
        style={{
          height: 100,
          paddingTop: 10,
          paddingRight: 10
        }}>
          <SubTitle style={{ fontSize: 17, color: '#121212' }}>{info.award}</SubTitle>
        </Input>

      
      </Container>

      <Footer style={{
        paddingBottom: 150
      }}>
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

export default ScientistControl;