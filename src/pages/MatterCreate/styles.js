import styled from 'styled-components';

export const Wrapper = styled.SafeAreaView `
  
    background-color: #FFF;
    height: 100%;
`;


export const Container = styled.ScrollView `
    width: 90%;
    height: 10%;
    align-self: center;
`;

export const PhotoView = styled.TouchableOpacity `
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.View `
    width: 110px;
    height: 110px;
    border-width: 1px;
    border-color: #EA80FC;
    border-radius: 8px;
    align-items: center;
    justify-content: center
`;

export const PhotoText = styled.Text `
    margin-left: 30px;
    font-size: 16px;
    color: #323992;
`;

