import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

export const QuestionsContext = createContext({});

const QuestionsProvider = ({ children }) => {
  const [matters, setMatters] = useState([]);

  useEffect(() => {
    async function listMatters(){
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
    listMatters();
  }, []);

  return (
    <QuestionsContext.Provider value={{ matters }}>
      { children }
    </QuestionsContext.Provider>
  );
}

export default QuestionsProvider;