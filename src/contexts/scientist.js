import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';


export const ScientistsContext = createContext({});

const ScientistsProvider = ({ children }) => {
  const [scientists, setScientists] = useState([]);

  async function listScientist(name) {
    await firebase.database().ref('scientists').orderByChild('name').on('value', (snapshot)=>{
      setScientists([]);
      if (name != '' ){
        snapshot.forEach((value) =>{
          let scientist = {
            key: value.key,
            award: value.val().award,
            image: value.val().image,
            life: value.val().life,
            name: value.val().name,
            who: value.val().who,
            nationality: value.val().nationality,
            known: value.val().known
          };
          if (value.val().name.indexOf(name) != -1){
            setScientists(oldScientist => [...oldScientist, scientist]);
          }
        })
      }
      if (name == ''){
        snapshot.forEach((value) =>{
          let scientist = {
            key: value.key,
            award: value.val().award,
            image: value.val().image,
            life: value.val().life,
            name: value.val().name,
            who: value.val().who,
            nationality: value.val().nationality,
            known: value.val().known
          };
          setScientists(oldScientist => [...oldScientist, scientist]);
        })
      }

    });
  }

  return (
    <ScientistsContext.Provider value={{ listScientist, scientists }}>
      { children }
    </ScientistsContext.Provider>
  );
}

export default ScientistsProvider;