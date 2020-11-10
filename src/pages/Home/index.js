import React from 'react';
import { View } from 'react-native';

import { Wrapper, Title, SubTitle, Container, Content, AppContainer } from './styles';

const Home = ({ navigation }) => {
  return (
    <Wrapper>
      <Container>
        <Title>Bem-vindo Administrador</Title>
        <SubTitle>Aplicativos disponíveis</SubTitle>

        <Content>
          <AppContainer onPress={() => navigation.navigate('SignIn')}>
            
          </AppContainer>
        </Content>
      </Container>
    </Wrapper>
  );
}

export default Home;