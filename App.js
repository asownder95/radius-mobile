import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ListScreen from './client/screens/ListScreen';
import Header from './client/components/Header';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };

  }
  render() {
    const props = {
      events: this.state.events,
    };
    const tabNavigation = createMaterialBottomTabNavigator({
      List: {
        screen: (props) => <ListScreen {...props} />,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => (<Ionicons name="ios-list" size={34} style={{color: 'white'}} />),
          tabBarColor: '#592CEA'
        }
      },
    });
    
    const RootStack = createStackNavigator({
      Tabs: {
        screen: tabNavigation,
        navigationOptions: {
          headerTitle: <Header />,
          headerStyle: {
            backgroundColor: '#592CEA',
          },
        },
      },
    });

    return (
      <RootStack screenProps={props} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
