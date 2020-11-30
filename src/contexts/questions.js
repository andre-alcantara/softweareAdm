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
      snapshot.forEach( (value)=> {
        let matter = {
          key : value.key,
          matterName : value.val().matterName,
          matterColor : value.val().matterColor,
          matterContent : value.val().matterContent,
          matterIcon : value.val().matterIcon,
          finished: value.val().finished
        }
        setMatters(oldMatter => [...oldMatter, matter]);
      });
    });

  }

  async function changeStatus(matterKey) {
    await firebase.database().ref('matter').child(matterKey).update({
      finished: true,
    })
    .then(() => {
      console.log('changeStatus')
    })
    .catch((error) => {
      console.log(error.code)
    });
  }

  async function addMatter(name, image, color) {
    listMatters();

    var len = matters.length;
    var lastKey = matters[len - 1].key;
    lastKey = parseInt(lastKey);

    uri = image.uri;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    await firebase.storage().ref('images/matter/').child(name).put(blob)
    .then(async () => {
      await firebase.storage().ref('images/matter/').child(name).getDownloadURL()
      .then(async (url) => {
        await firebase.database().ref('matter').child(lastKey + 1).set({
          finished: false,
          matterName: name,
          matterIcon: url,
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
      })
    })
    .catch((error) => {
      console.log(error.code)
    })

    blob.close();

  }

  async function updateMatter(matterKey, name, image, color) {

    if (typeof image === 'string'){
      await firebase.database().ref('matter').child(matterKey).update({
        finished: false,
        matterName: name,
        matterIcon: image,
        matterColor: color,
      })
      .then(() => {
        console.log('updateMatter');
      })
      .catch((error) => {
        console.log(error.code);
      });
    }

    else {

      var uri = image.uri;

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      await firebase.storage().ref('images/matter/').child(name).put(blob)
      .then(async () => {
        await firebase.storage().ref('images/matter/').child(name).getDownloadURL()
        .then(async (url) => {
          await firebase.database().ref('matter').child(matterKey).update({
            finished: false,
            matterName: name,
            matterIcon: url,
            matterColor: color,
          })
          .then(() => {
            console.log('updateMatter');
          })
          .catch((error) => {
            console.log(error.code);
          });
        })
        .catch((error) => {
          console.log(error.code);
        })
      })
      .catch((error) => {
        console.log(error.code);
      })
    }

  }

  async function updateDifficulty(matterKey, difficultyKey, title, description, hearts) {

    await firebase.database().ref('matter/' + matterKey).child(difficultyKey).update({
      title: title,
      description: description,
      star: hearts,
    })
    .then(async () => {
      await firebase.database().ref('matter').child(matterKey).set({
        finished: false,
      })
      .then(() => {
        console.log('updateDifficulty');
      })
      .catch((error) => {
        console.log(error.code);
      });
    })
    .catch((error) => {
      console.log(error.code)
    });

  }

  async function addQuestion(matterKey, difficultyKey, question, correction, answer1, answer2, answer3, answer4) {
    listMatters()

    // answers array example
    var answers = [
      {
        "answer" : answer1.answer,
        "correct" : answer1.correct
      }, {
        "answer" : answer2.answer,
        "correct" : answer2.correct
      }, {
        "answer" : answer3.answer,
        "correct" : answer3.correct
      }, {
        "answer" : answer4.answer,
        "correct" : answer4.correct
      }
    ];

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
    .then(async () => {
      await firebase.database().ref('matter').child(matterKey).set({
        finished: false,
      })
      .then(() => {
        console.log('addQuestion');
      })
      .catch((error) => {
        console.log(error.code);
      });
    })
    .catch((error) => {
      console.log(error.code)
    });

  }

  async function updateQuestion(matterKey, difficultyKey, questionKey, question, correction, answer1, answer2, answer3, answer4) {
    listMatters();


    // answers array example
    var answers = [
      {
        "answer" : answer1.answer,
        "correct" : answer1.correct
      }, {
        "answer" : answer2.answer,
        "correct" : answer2.correct
      }, {
        "answer" : answer3.answer,
        "correct" : answer3.correct
      }, {
        "answer" : answer4.answer,
        "correct" : answer4.correct
      }
    ];

    await firebase.database().ref('matter/'+ matterKey +'/matterContent/'+ difficultyKey +'/questions').child(questionKey).update({
      key: questionKey,
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

  async function delQuestion(matterKey, difficultyKey, questionKey) {
    await firebase.database().ref('matter/'+ matterKey +'/matterContent/'+ difficultyKey +'/questions').child(questionKey).remove()
    .then(() => {
      console.log("delQuestion");
    })
    .catch((error) => {
      console.log(error.code);
    })
  }


  return (
    <QuestionsContext.Provider value={{ listMatters, changeStatus, addMatter, updateMatter, updateDifficulty, addQuestion, updateQuestion, delQuestion, matters }}>
      { children }
    </QuestionsContext.Provider>
  );
}

export default QuestionsProvider;