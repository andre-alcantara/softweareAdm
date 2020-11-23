import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Title } from '../Home/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';
import { Footer } from '../MatterChoose/styles';

import { LinearGradient } from 'expo-linear-gradient';

import { Container, PhotoView, Photo, PhotoText, Wrapper, Content } from './styles';

const MatterCreate = () => {
  const backgroundColors = ['#5CD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#FF5555' ]
  const [color, setColor] = useState(backgroundColors[0])

  const renderColors = () => {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity
        key={color}
        style={{backgroundColor: color, width: 50, height: 50, borderRadius: 8}}
        onPress={() => {
          setColor(color);      
        }
        }
        >
      </TouchableOpacity>
      )
    })
  }

  return (
    <Wrapper>
    <Container contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>

       <Title>Criação de matéria</Title>

       <Label>Tema:</Label>
       <Input></Input>

       <Label>Foto:</Label>
       <PhotoView>
         <Photo></Photo>
         <PhotoText>Escolher imagem</PhotoText>
       </PhotoView>

       <Label>Cor:</Label>
       <PhotoView style={{
         backgroundColor: '#F2F1F1',
         borderRadius: 8,
         height: 100,
         marginBottom: 20,
         width: 220,
         paddingLeft: 10,
         
       }}>
        <Photo style={{
            height: 80,
            width: 80,
            backgroundColor: color,
            borderWidth: 0,
          }}></Photo>
          <PhotoText style={{
            color: color
          }}>{color}</PhotoText>
       </PhotoView>
       

       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
          {renderColors()}
       </View>
        

      </Container>
      
      <Footer>
        <SubmitButton onPress={() => navigation.navigate('ThemeCreate')} 
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
            <SubmitText>Criar</SubmitText>
            </LinearGradient>
            </SubmitButton>

      </Footer>
    </Wrapper>
  );
}

export default MatterCreate;
