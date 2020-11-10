import React from 'react';
import { Image } from 'react-native';
import { Container, SubTitle, Title, Wrapper } from '../Home/styles';

import { Button, ButtonText } from './styles';

const Dashboard = () => {
  return (
      <Wrapper>
        <Container>
          <Title>Olá André Alcantara de Melo Pimentel</Title>
          <SubTitle>O que você deseja fazer no LovePhysics?</SubTitle>

          <Button onPress={() => {}} style={{
            backgroundColor: '#FF5555',
          }}>
            
            <ButtonText style={{
              color: '#FFF'
            }}>Perguntas</ButtonText>

            <Image
            style={{
              height: 75,
              width: 75,
            }} 
              source={require('../../img/perguntas.png')}
            />
          </Button>

          <Button onPress={() => {}} style={{
            backgroundColor: '#9BDCEA',
          }}>
            <ButtonText>Curiosidades</ButtonText>
            <Image
            style={{
              height: 75,
              width: 90,
            }} 
              source={require('../../img/curiosidades.png')}
            />
          </Button>

          <Button onPress={() => {}} style={{
            backgroundColor: '#323992',
          }}>
            <ButtonText style={{
              color: '#FFF'
            }}>Cientistas</ButtonText>
            <Image
            style={{
              height: 60,
              width: 85,
            }} 
              source={require('../../img/cientistas.png')}
            />
          </Button>

        </Container>
      </Wrapper>
  );
}

export default Dashboard;