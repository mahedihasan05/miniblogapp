import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloAppProvider } from './src/apollo/client';
import { ThemeProvider } from './src/context/ThemeContext';
import PostList from './src/screens/PostList';
import PostDetails from './src/screens/PostDetails';
import Favorites from './src/screens/Favorites';


const Stack = createStackNavigator();


export default function App() {
return (
<ApolloAppProvider>
<ThemeProvider>
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="Home" component={PostList} />
<Stack.Screen name="Details" component={PostDetails} />
<Stack.Screen name="Favorites" component={Favorites} />
</Stack.Navigator>
</NavigationContainer>
</ThemeProvider>
</ApolloAppProvider>
);
}