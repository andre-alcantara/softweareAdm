import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ActionBarIcon() {
  return (
    <Image
    source={require('../assets/logo.png')}
    style={{ width: 92, height: 25, marginTop: -10}} />
  );
}

// login 
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';

// dashboard 
import Dashboard from '../pages/Dashboard';
import MatterChoose from '../pages/MatterChoose';
import MatterCreate from '../pages/MatterCreate';
import MatterIndex from '../pages/MatterIndex';
import QuestionCreate from '../pages/QuestionCreate';
import QuestionControl from '../pages/QuestionControl';

const Routes = () => {
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
      <Stack.Screen name='Dashboard' component={Dashboard} options={{
        headerTitle:  props => <ActionBarIcon {...props} />,
        title: 'Voltar',
      }} />
      <Stack.Screen name='MatterChoose' component={MatterChoose} options={{
        headerTitle:  props => <ActionBarIcon {...props} />,
        title: 'Voltar',
      }} />
      <Stack.Screen name='MatterCreate' component={MatterCreate} options={{
         headerTitle:  props => <ActionBarIcon {...props} />,
         title: 'Voltar',
      }} />
       <Stack.Screen name='MatterIndex' component={MatterIndex} options={{
         headerTitle:  props => <ActionBarIcon {...props} />,
         title: 'Voltar',
      }} />
      <Stack.Screen name='QuestionCreate' component={QuestionCreate} options={{
         headerTitle:  props => <ActionBarIcon {...props} />,
         title: 'Voltar',
      }} />
      <Stack.Screen name='QuestionControl' component={QuestionControl} options={{
         headerTitle:  props => <ActionBarIcon {...props} />,
         title: 'Voltar',
      }} />
    </Stack.Navigator> 
  )
}

export default Routes;