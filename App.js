import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';




  
  
  const App = () => {
    
  
    return (
      <NavigationContainer>
        <StatusBar 
          barStyle= 'dark-content'
        />
        <Routes /> 
      </NavigationContainer>
    )
  }
  
  export default App;