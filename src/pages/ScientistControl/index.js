import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Title, Wrapper, SubTitle } from '../Home/styles';
import { Container, Photo, PhotoText, PhotoView } from '../MatterCreate/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';

import { Footer } from '../MatterChoose/styles';

import { ScientistsContext } from '../../contexts/scientist';

import { LinearGradient } from 'expo-linear-gradient';
// import { Container } from './styles';

const ScientistControl = ({ route }) => {
  const { info } = route?.params;
  const { updateScientist, delScientist } = useContext(ScientistsContext);
  const navigation = useNavigation();

  const [key, setKey] = useState(info.key);
  const [name, setName] = useState(info.name);
  const [image, setImage] = useState(info.image);
  const [who, setWho] = useState(info.who);
  const [known, setKnown] = useState(info.known);
  const [life, setLife] = useState(info.life);
  const [nationality, setNationality] = useState(info.nationality);
  const [award, setAward] = useState(info.award);

  const handleUpdate = () => {
    updateScientist(key, name, image, life, who, nationality, known, navigation);
  }

  const handleDelete = () => {
    delScientist(info.key, navigation);
  }

  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
        <Title>Controle de cientista</Title>

        <Label>Nome:</Label>
        <Input 
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        >
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
        <Input 
          value={who}
          onChangeText={(text) => setWho(text)}
          numberOfLines={30}
          multiline={true}
          style={{
            height: 150,
            paddingTop: 10,
            paddingRight: 10,
        }}>
          
        </Input>

        <Label>Nacionalidade:</Label>
        <Input
          value={nationality}
          onChangeText={(text) => setNationality(text)}
        >
        </Input>

        <Label>Conhecido por:</Label>
        <Input 
        value={known}
        onChangeText={(text) => setKnown(text)}
        numberOfLines={30}
        multiline={true}
        style={{
          height: 100,
          paddingTop: 10,
          paddingRight: 10
        }}>
        </Input>

        <Label>Data de nascimento e falecimento:</Label>
        <Input
        value={life}
        onChangeText={(text) => setLife(text)}
        >
        </Input>

        <Label>Homenagens e/ou prêmios:</Label>
        <Input 
        value={award}
        onChangeText={(text) => setAward(text)}
        numberOfLines={10}
        multiline={true}
        style={{
          height: 100,
          paddingTop: 10,
          paddingRight: 10
        }}>
        </Input>

      
      </Container>

      <Footer style={{
        paddingBottom: 150
      }}>
        <SubmitButton 
        onPress={handleUpdate}
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

        <SubmitButton 
        onPress={handleDelete}
        style={{ marginTop: 0, marginBottom: 20 }}>
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