import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import DashboardRoutes from './dashboard.routes';

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  if(loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#131313'/>
      </View>
    )
  } 

  return (
    signed ? <DashboardRoutes /> : <AuthRoutes />
  ) 
}

export default Routes;