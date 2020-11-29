import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { Alert } from 'react-native';


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

  async function updateScientist(key, name, image, life, who, nationality, known, award, navigation) {
   
    if (typeof image === 'string'){
      await firebase.database().ref('scientists').child(key).set({
        name: name,
        image: image,
        life: life,
        who: who,
        nationality: nationality,
        known: known,
        award: award
      })
      .then(() => {
        Alert.alert(
          "Adicionado com sucesso! 👏",
          "Seu cientista foi adicionado.",
          [
            { text: "OK", onPress: () => navigation.goBack() }
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.log(error.code)
      });
    }

    else {
      var uri = image.uri;
      console.log(uri);

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

      await firebase.storage().ref('images/scientist/').child(name).put(blob)
      .then(async () => {
        await firebase.storage().ref('images/scientist/').child(name).getDownloadURL()
        .then(async (url) => {
          console.log(url);
          await firebase.database().ref('scientists').child(key).update({
            name: name,
            image: url,
            life: life,
            who: who,
            nationality: nationality,
            known: known
          })
          .then(() => {
            Alert.alert(
              "Atualizado! 👏",
              "Seu cientista foi atualizado.",
              [
                { text: "OK", onPress: () => navigation.goBack() }
              ],
              { cancelable: false }
            );
          })
          .catch((error) => {
            console.log(error.code)
          });

        })
      })
      .catch((error) => {
        console.log(error.code)
      })

      blob.close();

    }

    listScientist('');

  }

  async function addScientist(name, image, life, who, nationality, known, award, navigation) {

    listScientist('');

    var len = scientists.length;
    var lastKey = scientists[len - 1].key;
    lastKey = parseInt(lastKey);

    var uri = image.uri;
    console.log(uri)

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

    await firebase.storage().ref('images/scientist/').child(name).put(blob)
    .then(async () => {
      await firebase.storage().ref('images/scientist/').child(name).getDownloadURL()
      .then(async (url) => {
        console.log(url);
        await firebase.database().ref('scientists').child(lastKey + 1).set({
          name: name,
          image: url,
          life: life,
          who: who,
          nationality: nationality,
          known: known,
          award: award
        })
        .then(() => {
          Alert.alert(
            "Adicionado com sucesso! 👏",
            "Seu cientista foi adicionado.",
            [
              { text: "OK", onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
          );
        })
        .catch((error) => {
          console.log(error.code)
        });

      })
    })
    .catch((error) => {
      console.log(error.code)
    })

    blob.close();

    listScientist('');
  }

  async function delScientist(index, navigation) {
    await firebase.database().ref('scientists').child(index).remove()
    .then(() => {
      Alert.alert(
        "Removido! 👋",
        "Seu cientista foi removido.",
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ],
        { cancelable: false }
      );
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