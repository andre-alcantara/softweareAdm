import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Title, Wrapper } from '../Home/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';
import { Footer } from '../ThemeChoose/styles';

import { Container, PhotoView, Photo, PhotoText } from './styles';

const ThemeCreate = () => {
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
          alert(color)
        }
        }
        >

        </TouchableOpacity>
      )
    })
  }

  return (
    <Wrapper>
      <Container>
       <Title>Criação de matéria</Title>

       <Label>Tema:</Label>
       <Input></Input>

       <Label>Foto:</Label>
       <PhotoView>
         <Photo></Photo>
         <PhotoText>Escolher imagem</PhotoText>
       </PhotoView>

       <Label>Cor:</Label>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
          {renderColors()}
       </View>
        <TouchableOpacity></TouchableOpacity>

      </Container>

      <Footer>
        <SubmitButton  
        style={{
          marginTop: 15,
          marginBottom: 10
        }}>
          <SubmitText>Criar</SubmitText>
        </SubmitButton>

      </Footer>
    </Wrapper>
  );
}

export default ThemeCreate;
