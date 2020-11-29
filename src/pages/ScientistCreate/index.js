import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Title, Wrapper } from '../Home/styles';
import { Container, Photo, PhotoText, PhotoView } from '../MatterCreate/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';

import { Footer } from '../MatterChoose/styles';

import { ScientistsContext } from '../../contexts/scientist';

import { LinearGradient } from 'expo-linear-gradient';
// import { Container } from './styles';


const ScientistCreate = () => {
  const { addScientist } = useContext(ScientistsContext);
  const navigation = useNavigation();

  const [disabled, setDisabled] = useState(0.6)
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [who, setWho] = useState('');
  const [known, setKnown] = useState('');
  const [life, setLife] = useState('');
  const [nationality, setNationality] = useState('');
  const [award, setAward] = useState('');

  const handleAdd = () => {
    addScientist(name, image, life, who, nationality, known, award, navigation);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <Wrapper>
      
      <Container contentContainerStyle={{ paddingBottom: 110}} showsVerticalScrollIndicator={false}>
    
        
          <View>
          <Title>Inserir cientista</Title>

            <Label>Nome:</Label>
            <Input 
              autoCapitalize='words'
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            >
            </Input>

            <Label>Foto:</Label>
            <PhotoView onPress={pickImage}>
              <Photo>
              
              <Image 
                source={{ uri: `${image && image.uri}` }} 
                style={{ width: 110, height: 110, borderRadius: 8 }} 
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
          </View>
          
                
            
        
          
       
      

    
    </Container>
      
   

    <Footer>
        <SubmitButton 
        disabled={name === '' || who === '' || nationality === '' ||  known === '' || life === '' || award === '' ? true : false }
        onPress={handleAdd}
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
            opacity: name === '' || who === '' || nationality === '' ||  known === '' || life === '' || award === '' ? 0.6 : 1 
          }}>
            <SubmitText>Inserir</SubmitText>
          </LinearGradient>
          
        </SubmitButton>
      </Footer>
  </Wrapper>
  );
}

export default ScientistCreate;