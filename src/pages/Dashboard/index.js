import React, { useContext, useState, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Container, SubTitle, Title, Wrapper } from '../Home/styles';

import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from '../../contexts/auth';


import { Button, ButtonText } from './styles';
import { Footer } from '../MatterChoose/styles';
import { SubmitButton, SubmitText } from '../SignIn/styles';

const Dashboard = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
      <Wrapper>
        <Container>
          <Title>Olá, {user && user.name}</Title>
          <SubTitle>O que você deseja fazer no LovePhysics?</SubTitle>

          <Button onPress={() => navigation.navigate('MatterChoose')} style={{
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

          <Button onPress={() => navigation.navigate('ScientistIndex')} style={{
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

        <Footer>
          <SubmitButton onPress={signOut} style={{ marginTop: 14 }}>
            <LinearGradient colors={['#FF5555', '#CF8686']} style={{
              height: 50,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
            }}>
           <SubmitText>Sair</SubmitText>
            </LinearGradient>
          </SubmitButton>
          </Footer>
      </Wrapper>
  );
}

export default Dashboard;