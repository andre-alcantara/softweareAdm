import styled from 'styled-components';

export const Wrapper = styled.SafeAreaView `
    flex: 1;
    background-color: #FFF;
`;

export const Container = styled.View `
    width: 90%;
    align-self: center;
`;

export const Title = styled.Text `
    font-family: SF_Bold;
    font-size: 23px;
    font-weight: bold;
    color: #121212;
    margin-top: 20px;
`;

export const SubTitle = styled.Text `
    font-family: SF_Regular;
    font-size: 17px;
    color: #5D5A5A;
    margin-top: 6px;
    margin-bottom: 30px;
`;

export const Content = styled.ScrollView `
    height: 100%;
    
`;

export const AppContainer = styled.TouchableOpacity `
    height: 200px;
    width: 100%;
    background-color: #FF5555; 
    border-radius: 10px;
`;