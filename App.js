import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import Home from './assets/screens/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home : { screen : Home },
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === 'Home') {
          return (
            <Image
              style={{ width: 35, height: 30, borderRadius: 50 }}
              source={{
                uri:
                  'https://cdn4.iconfinder.com/data/icons/bold-circular-app-web-icons/1153/circle_home_bold-512.png',
              }}
            />
          );
        } 
      }
    }),
  }
);
const AppContainer = createAppContainer(TabNavigator);


