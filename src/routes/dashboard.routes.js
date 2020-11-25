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

// dashboard 
import Dashboard from '../pages/Dashboard';
import MatterChoose from '../pages/MatterChoose';
import MatterCreate from '../pages/MatterCreate';
import LessonIndex from '../pages/LessonIndex';
import LessonCreate from '../pages/LessonCreate';
import QuestionIndex from '../pages/QuestionIndex';
import QuestionCreate from '../pages/QuestionCreate';
import QuestionControl from '../pages/QuestionControl';

const DashboardRoutes = () => {
  return (
    <Stack.Navigator>
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
       <Stack.Screen name='LessonIndex' component={LessonIndex} options={{
         headerTitle:  props => <ActionBarIcon {...props} />,
         title: 'Voltar',
      }} />
      <Stack.Screen name='LessonCreate' component={LessonCreate} options={{
         headerTitle:  props => <ActionBarIcon {...props} />,
         title: 'Voltar',
      }} />
       <Stack.Screen name='QuestionIndex' component={QuestionIndex} options={{
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

export default DashboardRoutes;