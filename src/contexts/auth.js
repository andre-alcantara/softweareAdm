import React, { useState, createContext, useEffect } from 'react';
import { Alert } from 'react-native';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');

      if(storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }

    loadStorage();

  }, []);


  async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;
      await firebase.database().ref('admins').child(uid).once('value')
      .then((snapshot) => {
        var data = {
          uid: uid,
          name: snapshot.val().name,
          email: value.user.email,
        };
        setUser(data);
        storageUser(data);
      })
    })
    .catch((error) => {
      if (error.code === "auth/invalid-email") {
        return Alert.alert(
          "Ops!",
          "E-mail e/ou senha inválida, revise-os"
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
      else if (error.code === "auth/user-disabled") {
        return Alert.alert(
          "Ops!",
          "E-mail e/ou senha inválida, revise-os",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
      else if (error.code === "auth/user-not-found") {
        return Alert.alert(
          "Ops!",
          "E-mail e/ou senha inválida, revise-os",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
      else if (error.code === "auth/wrong-password") {
        return Alert.alert(
          "Ops!",
          "E-mail e/ou senha inválida, revise-os",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
      else {
        return Alert.alert(
          "Ops!",
          "Ocorreu um erro"
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
    })
  }
  
  async function signUp(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;
      await value.user.sendEmailVerification();
      await firebase.database().ref('admins').child(uid).set({
        name: name,
      })
      .then(() => {
        var data = {
          uid: uid,
          name: name,
          email: value.user.email,
        };
        setUser(data);
        storageUser(data);
        Alert.alert(
          "Verifique seu e-mail",
          "Nós te enviamos um e-mail de confirmação, caso não receba, edite-o nos Ajustes para um e-mail válido",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      })
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        return Alert.alert(
          "Ops!",
          "Este e-mail já está em uso",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      
      }
      else if (error.code === "auth/invalid-email") {
        return Alert.alert(
          "Ops!",
          "E-mail inválido",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
      else if (error.code === "auth/weak-password") {
        return Alert.alert(
          "Ops!",
          "Sua senha precisa de no mínimo, 6 caracteres",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
      else {
        return Alert.alert(
          "Ops",
          "Ocorreu um erro",
          [
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      }
    })
  }



  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  async function signOut() {
    await firebase.auth().signOut();
    
    await AsyncStorage.clear()
    .then(() => {
      setUser(null);
    })
  }

  return (
    <AuthContext.Provider value={{ signed:!!user, user, setUser, loading, signUp, signIn, signOut  }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;