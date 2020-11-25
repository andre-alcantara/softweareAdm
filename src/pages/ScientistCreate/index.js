import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { Title, Wrapper } from '../Home/styles';
import { Container, Photo, PhotoText, PhotoView } from '../MatterCreate/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';

import { Footer } from '../MatterChoose/styles';

import { ScientistsContext } from '../../contexts/scientist';

import { LinearGradient } from 'expo-linear-gradient';
// import { Container } from './styles';


const ScientistCreate = ({ navigation }) => {

  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <Title>Inserir cientista</Title>

        <Label>Nome:</Label>
        <Input></Input>

        <Label>Foto:</Label>
        <PhotoView>
          <Photo></Photo>
          <PhotoText>Escolher Imagem</PhotoText>
        </PhotoView>

        <Label>Quem foi? (breve explicação):</Label>
        <Input numberOfLines={30}
        multiline={true}
        style={{
          height: 150,
          paddingTop: 10,
          paddingRight: 10
        }}></Input>

      <Label>Nacionalidade:</Label>
        <Input></Input>

        <Label>Data de nascimento e falecimento:</Label>
        <Input></Input>

        <Label>Homenagens e/ou prêmios:</Label>
        <Input></Input>

      </Container>

      <Footer>
        <SubmitButton
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
           <SubmitText>Inserir</SubmitText>
         </LinearGradient>
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
}

export default ScientistCreate;