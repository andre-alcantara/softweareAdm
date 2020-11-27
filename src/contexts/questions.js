import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

export const QuestionsContext = createContext({});

const QuestionsProvider = ({ children }) => {

  const [matters, setMatters] = useState([]);

  async function listMatters() {

    await firebase.database().ref('matter').once('value')
    .then((snapshot) => {
      setMatters([]);
      snapshot.forEach( (value)=>{
        let matter = {
          key : value.key,
          matterName : value.val().matterName,
          matterColor : value.val().matterColor,
          matterContent : value.val().matterContent,
          matterIcon : value.val().matterIcon
        }
        setMatters(oldMatter => [...oldMatter, matter]);
      });
    });

  }

  async function changeStatus(matterKey, status) {
    await firebase.database().ref('matter').child(matterKey).update({
      finished: status,
    })
    .then(() => {
      console.log("changeStatus")
    })
    .catch((error) => {
      console.log(error.code)
    });
  }

  async function addMatter(name, icon, color) {
    listMatters();

    var len = matters.length;
    var lastKey = matters[len - 1].key;
    lastKey = parseInt(lastKey);

    await firebase.database().ref('matter').child(lastKey + 1).set({
      finished: false,
      matterName: name,
      matterIcon: icon,
      matterColor: color,
      matterContent: [
        {
          title: "Adicione um titulo",
          description: "Adicione uma descrição",
          difficulty: "Iniciante",
          star: 0,
          questions: [
            {
              question: "Adicione uma questão",
              correction: "Adicione uma correção",
              answers: [
                {
                  "answer" : "Resposta 1",
                  "correct" : "true"
                }, {
                  "answer" : "Resposta 2",
                  "correct" : "false"
                }, {
                  "answer" : "Resposta 4",
                  "correct" : "false"
                }, {
                  "answer" : "Resposta 5",
                  "correct" : "false"
                }
              ]
            }
          ]
        },
        {
          title: "Adicione um titulo",
          description: "Adicione uma descrição",
          difficulty: "Intermediario",
          star: 0,
          questions: [
            {
              question: "Adicione uma questão",
              correction: "Adicione uma correção",
              answers: [
                {
                  "answer" : "Resposta 1",
                  "correct" : "true"
                }, {
                  "answer" : "Resposta 2",
                  "correct" : "false"
                }, {
                  "answer" : "Resposta 4",
                  "correct" : "false"
                }, {
                  "answer" : "Resposta 5",
                  "correct" : "false"
                }
              ]
            }
          ]
        },
        {
          title: "Adicione um titulo",
          description: "Adicione uma descrição",
          difficulty: "Avançado",
          star: 0,
          questions: [
            {
              question: "Adicione uma questão",
              correction: "Adicione uma correção",
              answers: [
                {
                  "answer" : "Resposta 1",
                  "correct" : "true"
                }, {
                  "answer" : "Resposta 2",
                  "correct" : "false"
                }, {
                  "answer" : "Resposta 4",
                  "correct" : "false"
                }, {
                  "answer" : "Resposta 5",
                  "correct" : "false"
                }
              ]
            }
          ]
        }
      ]
    })
    .then(() => {
      console.log('addMatter');
    })
    .catch((error) => {
      console.log(error.code);
    });
  }

  async function updateMatter(matterKey, name, icon, color) {
    await firebase.database().ref('matter').child(matterKey).set({
      finished: false,
      matterName: name,
      matterIcon: icon,
      matterColor: color,
    })
    .then(() => {
      console.log('updateMatter');
    })
    .catch((error) => {
      console.log(error.code);
    });

  }

  async function updateDifficulty(matterKey, difficultyKey, title, description, hearts, difficulty) {

    await firebase.database().ref('matter/' + matterKey).child(difficultyKey).update({
      title: title,
      description: description,
      difficulty: difficulty,
      star: hearts,
    })
    .then(() => {
      console.log('updateDifficulty')
    })
    .catch((error) => {
      console.log(error.code)
    });

  }

  async function addQuestion(matterKey, difficultyKey, question, correction, answers) {
    listMatters()

    // answers array example
    // var answers = [
    //   {
    //     "answer" : "Resposta 1",
    //     "correct" : "true"
    //   }, {
    //     "answer" : "Resposta 2",
    //     "correct" : "false"
    //   }, {
    //     "answer" : "Resposta 4",
    //     "correct" : "false"
    //   }, {
    //     "answer" : "Resposta 5",
    //     "correct" : "false"
    //   }
    // ]

    var len = matters[matterKey].matterContent[difficultyKey].questions.length;
    var lastKey = matters[matterKey].matterContent[difficultyKey].questions[len - 1].key;
    lastKey = parseInt(lastKey);
    var newKey = lastKey + 1

    await firebase.database().ref('matter/'+ matterKey +'/matterContent/'+ difficultyKey +'/questions').child(newKey).set({
      key: newKey,
      question: question,
      correction: correction,
      answers: answers,
    })
    .then(() => {
      console.log('addQuestion')
    })
    .catch((error) => {
      console.log(error.code)
    });

  }

  async function updateQuestion(matterKey, difficultyKey, question, correction, answers) {
    listMatters()

    // answers array example
    // var answers = [
    //   {
    //     "answer" : "Resposta 1",
    //     "correct" : "true"
    //   }, {
    //     "answer" : "Resposta 2",
    //     "correct" : "false"
    //   }, {
    //     "answer" : "Resposta 4",
    //     "correct" : "false"
    //   }, {
    //     "answer" : "Resposta 5",
    //     "correct" : "false"
    //   }
    // ]

    var len = matters[matterKey].matterContent[difficultyKey].questions.length;
    var lastKey = matters[matterKey].matterContent[difficultyKey].questions[len - 1].key;
    lastKey = parseInt(lastKey);
    var newKey = lastKey + 1

    await firebase.database().ref('matter/'+ matterKey +'/matterContent/'+ difficultyKey +'/questions').child(newKey).update({
      key: newKey,
      question: question,
      correction: correction,
      answers: answers,
    })
    .then(() => {
      console.log('updateQuestion')
    })
    .catch((error) => {
      console.log(error.code)
    });

  }


  return (
    <QuestionsContext.Provider value={{ listMatters, changeStatus, addMatter, updateMatter, updateDifficulty, addQuestion, updateQuestion, matters }}>
      { children }
    </QuestionsContext.Provider>
  );
}

export default QuestionsProvider;