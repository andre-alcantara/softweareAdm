import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/auth';
import QuestionsProvider from './src/contexts/questions';
import ScientistsProvider from './src/contexts/scientist';
import CuriositiesProvider from './src/contexts/curiosity';
  
  const App = () => {
    let [fontsLoaded] = useFonts({
      'SF_Regular': require('./src/fonts/SFProDisplay-Regular.ttf'),
      'SF_Medium': require('./src/fonts/SFProDisplay-Medium.ttf'),
      'SF_SemiBold': require('./src/fonts/SFProDisplay-SemiBold.ttf'),
      'SF_Bold': require('./src/fonts/SFProDisplay-Bold.ttf')
    });
    
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
  
    return (
     
      <NavigationContainer>
        <AuthProvider>
          <QuestionsProvider>
            <ScientistsProvider>
              <CuriositiesProvider>
                <StatusBar 
                  barStyle= 'dark-content'
                  backgroundColor='transparent'
                />
                <Routes /> 
              </CuriositiesProvider>
            </ScientistsProvider>
          </QuestionsProvider>
        </AuthProvider>
      </NavigationContainer>
    )
  }
}
  
  export default App;