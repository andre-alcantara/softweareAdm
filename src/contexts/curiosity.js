import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { Alert } from 'react-native';


export const CuriositiesContext = createContext({});

const CuriositiesProvider = ({ children }) => {
  const [curiosities, setCuriosities] = useState([]);

  async function listCuriosities(title) {
    await firebase.database().ref('curiosity').on('value', (snapshot)=>{
      setCuriosities([]);
      if (title != '' ){
        snapshot.forEach((value) =>{
          let curiosity = {
            key: value.key,
            description: value.val().description,
            title: value.val().title,
            image: value.val().image,
          };
          if (value.val().title.indexOf(title) != -1){
            setCuriosities(oldCuriosity => [...oldCuriosity, curiosity]);
          }
        })
      }
      if (title == ''){
        snapshot.forEach((value) =>{
          let curiosity = {
            key: value.key,
            description: value.val().description,
            title: value.val().title,
            image: value.val().image,
          };
          setCuriosities(oldCuriosity => [...oldCuriosity, curiosity]);
        })
      }
    });
  }

  async function updateCuriosity(key, title, description, image, navigation) {

    if (typeof image === 'string'){
      await firebase.database().ref('curiosity').child(key).update({
        title: title,
        image: image,
        description: description,
      })
      .then(() => {
        Alert.alert(
          "Atualizada! 👏",
          "Sua curiosidade foi atualizada.",
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

      await firebase.storage().ref('images/curiosities/').child(title).put(blob)
      .then(async () => {
        await firebase.storage().ref('images/curiosities/').child(title).getDownloadURL()
        .then(async (url) => {
          await firebase.database().ref('curiosity').child(key).update({
            title: title,
            image: url,
            description: description,
          })
          .then(() => {
            Alert.alert(
              "Atualizada! 👏",
              "Sua curiosidade foi atualizada.",
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

  }

  async function addCuriosity(title, description, image, navigation) {

    listCuriosities('');

    var len = curiosities.length;
    var lastKey = curiosities[len - 1].key;
    lastKey = parseInt(lastKey);

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

      await firebase.storage().ref('images/curiosities/').child(title).put(blob)
      .then(async () => {
        await firebase.storage().ref('images/curiosities/').child(title).getDownloadURL()
        .then(async (url) => {
          await firebase.database().ref('curiosity').child(lastKey + 1).set({
            title: title,
            image: url,
            description: description,
          })
          .then(() => {
            Alert.alert(
              "Atualizada! 👏",
              "Sua curiosidade foi atualizada.",
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

  async function delCuriosity(index, navigation) {
    await firebase.database().ref('curiosity').child(index).remove()
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
      console.log(error.code);
    });
  }

  return (
    <CuriositiesContext.Provider value={{ listCuriosities, updateCuriosity, addCuriosity, delCuriosity, curiosities }}>
      { children }
    </CuriositiesContext.Provider>
  );
}

export default CuriositiesProvider;