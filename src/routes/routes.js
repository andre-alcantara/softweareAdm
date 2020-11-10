import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// screens
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false, title: 'Voltar' }}/>
      <Stack.Screen name='SignIn' component={SignIn} options={{
        title: 'Login'
      }} />
       <Stack.Screen name='Dashboard' component={Dashboard} options={{
        headerShown: false
      }} />
    </Stack.Navigator> 
  )
}

export default Routes;