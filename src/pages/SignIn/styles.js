import styled from 'styled-components';

export const Label = styled.Text `
    font-size: 16px;
    color: #121212;
    margin-top: 30px;
    margin-bottom: 14px;
    font-family: SF_Medium;
`;

export const Input = styled.TextInput `
    border-width: 1px;
    border-color: #EA80FC;
    height: 50px;
    border-radius: 6px;
    font-size: 15px;
    padding-left: 13px;
`;


export const SubmitButton = styled.TouchableOpacity `
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    margin-top: 40px;
`;

export const SubmitText = styled.Text `
    font-size: 16px;
    color: #FFF;
    font-weight: bold;
    font-family: SF_Bold;
`;
