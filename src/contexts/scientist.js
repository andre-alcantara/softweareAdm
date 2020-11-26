import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';


export const ScientistsContext = createContext({});

const ScientistsProvider = ({ children }) => {
  const [scientists, setScientists] = useState([]);
  
  async function listScientist(name) {
    await firebase.database().ref('scientists').on('value', (snapshot)=>{
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

  async function updateScientist(key, name, image, life, who, nationality, known) {
    await firebase.database().ref('scientists').child(key).update({
      name: name,
      image: image,
      life: life,
      who: who,
      nationality: nationality,
      known: known
    })
    .then(() => {
      console.log('update foi')
    })
    .catch((error) => {
      console.log(error.code)
    });
  }

  async function addScientist(scientist) {

    var len = scientists.length;
    var lastKey = scientists[len - 1].key;
    lastKey = parseInt(lastKey);

    await firebase.database().ref('scientists').child(lastKey + 1).set({
      name: scientist.name,
      image: scientist.image,
      life: scientist.life,
      who: scientist.who,
      nationality: scientist.nationality,
      known: scientist.known
    })
    .then(() => {
      console.log('add foi')
    })
    .catch((error) => {
      console.log(error.code)
    });
  }

  async function delScientist(index) {
    await firebase.database().ref('scientists').child(index).remove()
    .then(() => {
      console.log('remove foi')
    })
    .catch((error) => {
      console.log(error.code)
    });
  }

  return (
    <ScientistsContext.Provider value={{ listScientist, updateScientist, addScientist, delScientist, scientists }}>
      { children }
    </ScientistsContext.Provider>
  );
}

export default ScientistsProvider;