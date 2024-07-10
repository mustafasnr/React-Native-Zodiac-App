import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ZodiacDetailScreen from './ZodiacDetailScreen';
const Stack = createStackNavigator();
function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="ZodiacDetail" component={ZodiacDetailScreen} options={({ route }) => ({ title: route.params.signName },{headerShown:false})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;