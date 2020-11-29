import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { Alert } from 'react-native';


export const CuriositiesContext = createContext({});

const CuriositiesProvider = ({ children }) => {
  const [curiosities, setCuriosities] = useState([]);
  const [imageUrl, setImageUrl] = useState('')

  async function uploadCuriosityImage(uri, title) {

    uri = uri.uri;

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
      .then((url) => {
        console.log(url)
        setImageUrl(url)
      })
    })
    .catch((error) => {
      console.log(error.code)
    })

    blob.close();

  }

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

  async function updateCuriosity(key, title, description, image) {
    
    if (typeof image === 'string'){
      setImageUrl(image);
    }

    else {
      uploadCuriosityImage(image, title);
    }

    await firebase.database().ref('curiosity').child(key).update({
      title: title,
      image: imageUrl,
      description: description,
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
  }

  async function addCuriosity(title, description, image, navigation) {

    listCuriosities('');

    uploadCuriosityImage(image, title);

    var len = curiosities.length;
    var lastKey = curiosities[len - 1].key;
    lastKey = parseInt(lastKey);

    await firebase.database().ref('curiosity').child(lastKey + 1).set({
      title: title,
      image: imageUrl,
      description: description,
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