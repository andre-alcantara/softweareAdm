import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Title, Wrapper, SubTitle } from '../Home/styles';
import { Container, Photo, PhotoText, PhotoView } from '../MatterCreate/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';

import { Footer } from '../MatterChoose/styles';

import { CuriositiesContext } from '../../contexts/curiosity';

import { LinearGradient } from 'expo-linear-gradient';
// import { Container } from './styles';

const CuriosityControl = ({ route }) => {
  const { info } = route?.params;
  const { updateCuriosity, delCuriosity } = useContext(CuriositiesContext);
  
  const navigation = useNavigation();

  const [key, setKey] = useState(info.key);
  const [title, setTitle] = useState(info.title);
  const [image, setImage] = useState(info.image);
  const [description, setDescription] = useState(info.description);

  const handleUpdate = () => {
    updateCuriosity(info.key, title, description, image, navigation);
  }

  const handleDelete = () => {
    delCuriosity(info.key, navigation);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  

  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
        <Title>Controle de cientista</Title>

        <Label>Nome:</Label>
        <Input 
          value={title}
          onChangeText={(text) => {
            setTitle(text);
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
          value={description}
          onChangeText={(text) => setDescription(text)}
          numberOfLines={30}
          multiline={true}
          style={{
            height: 150,
            paddingTop: 10,
            paddingRight: 10,
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

export default CuriosityControl;