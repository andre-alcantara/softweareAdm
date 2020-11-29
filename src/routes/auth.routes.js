import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ActionBarIcon() {
    return (
      <Image
      source={require('../assets/logo.png')}
      style={{ width: 92, height: 25, marginTop: -10, alignSelf: 'center'}} />
    );
  }

// screens
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen name='Home' component={Home} options={{ 
        headerTitle:  props => <ActionBarIcon {...props} />,
        title: 'Voltar',
        }}/>
      <Stack.Screen name='SignIn' component={SignIn} options={{
        headerTitle:  props => <ActionBarIcon {...props} />,
        title: 'Voltar',
      }} />
      <Stack.Screen name='SignUp' component={SignUp} options={{
        headerTitle:  props => <ActionBarIcon {...props} />,
        title: 'Voltar',
      }} />
    </Stack.Navigator> 
  )
}

export default AuthRoutes;