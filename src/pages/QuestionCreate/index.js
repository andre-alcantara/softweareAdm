import React, { useEffect, useState, useContext } from 'react';
import { SubTitle, Title, Wrapper } from '../Home/styles';
import { Input, Label, SubmitButton, SubmitText } from '../SignIn/styles';
import { Container } from '../MatterCreate/styles';
import { Footer } from '../MatterChoose/styles';
import { RadioButton, Text } from 'react-native-paper';
import { QuestionsContext } from '../../contexts/questions';

import { View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';

const QuestionCreate = ({ route }) => {
  const { matterKey, difficultyKey } = route?.params;
  const { addQuestion } = useContext(QuestionsContext);

  const [question, setQuestion] = useState('');
  const [correction, setCorrection] = useState('');
  const [value, setValue] = useState("first");
  const [answer1, setAnswer1] = useState({});
  const [answer2, setAnswer2] = useState({});
  const [answer3, setAnswer3] = useState({});
  const [answer4, setAnswer4] = useState({});

  useEffect(() => {
    setAnswer1({});
    setAnswer2({});
    setAnswer3({});
    setAnswer4({});
  }, [])

  const addNewQuestion = () => {
    addQuestion(matterKey, difficultyKey, question, correction, answer1, answer2, answer3, answer4)
  }

  return (
    <Wrapper>
      <Container contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <Title>Criar pergunta</Title>
        <SubTitle>Para criar uma nova pergunta, é necessário 4 respostas.</SubTitle>

        <Label style={{
          marginTop: 5
        }}>Pergunta:</Label>
        <Input 
        value={question}
        onChangeText={(text) => setQuestion(text)}
        numberOfLines={10}
        multiline={true}
        style={{
          height: 150,
          paddingTop: 10,
          paddingRight: 10
        }}></Input>

        <Label>Correção:</Label>
        <Input 
        value={correction}
        onChangeText={(text) => setCorrection(text)}
        numberOfLines={10}
        multiline={true}
        style={{
          height: 150,
          paddingTop: 10,
          paddingRight: 10,
          paddingBottom: 10
        }}>
          
        </Input>

      
      <Label>Resposta 1:</Label>
      <Input
      value={answer1}
      onChangeText={(text) =>  
      value === "first" ?  
      setAnswer1({
        "answer": text,
        "correct": "true"
      })
      :
      setAnswer1({
        "answer": text,
        "correct": "false"
      })
      }
    
      />

      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View>
        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === "first" ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value={"first"} />
      </View>
     
    
    
      <Label>Resposta 2:</Label>
      <Input
      value={answer2}
      onChangeText={(text) =>  
      value === "second" ?  
      setAnswer2({
        "answer": text,
        "correct": "true"
      })
      :
      setAnswer2({
        "answer": text,
        "correct": "false"
      })
      }
      />
      <View>
        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === "second" ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value="second" />
      </View>
      
      <Label>Resposta 3:</Label>
      <Input
      value={answer3}
      onChangeText={(text) =>  
      value === "third" ?  
      setAnswer3({
        "answer": text,
        "correct": "true"
      })
      :
      setAnswer3({
        "answer": text,
        "correct": "false"
      })
      }
      />
      <View>

        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === "third" ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value="third" />
      </View>

      <Label>Resposta 4:</Label>
      <Input
      value={answer4}
      onChangeText={(text) =>  
      value === "fourth" ?  
      setAnswer4({
        "answer": text,
        "correct": "true"
      })
      :
      setAnswer4({
        "answer": text,
        "correct": "false"
      })
      }
      />
      <View>
        <RadioButton.Item color='#FF5555' 
        style={{
          marginTop: 13,
          borderRadius: 8,
          height: 50,
          borderWidth: value === "fourth" ? 0.3 : 0,
        }}
        labelStyle={{
          fontFamily: 'SF_Medium',
          fontSize: 16
        }} label="Resposta correta" value="fourth" />
      </View>

      </RadioButton.Group>

      </Container>

      <Footer>
        <SubmitButton 
        onPress={addNewQuestion}
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

export default QuestionCreate;