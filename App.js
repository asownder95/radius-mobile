import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';
import ListScreen from './client/screens/ListScreen';
import MapScreen from './client/screens/MapScreen';
import FavoritesScreen from './client/screens/FavoritesScreen';
import Header from './client/components/Header';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      events: [],
      havePermission: null,
    };
  }

  componentWillMount() {
    this.getLocation();
  }

  async getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('FINISHED ASKING FOR PERMISION', status);
    if (status !== 'granted') {
      this.setState({
        permission: false,
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      const time = new Date(location.timestamp).toISOString();
      this.getEventData(time, location.coords.latitude, location.coords.longitude);
    }
  }
  
  getEventData(timestamp, lat, lng) {
    console.log('Entered the getEventData function!');    
    axios(`http://192.168.43.18:3000/events?timestamp=${timestamp}&lat=${lat}&lng=${lng}`)
    .then(response => {
      this.setState({
        location: {
          lat,
          lng,
          time: timestamp,
        },
        events: response.data,
        permission: true,
      });
    })
    .catch(err => console.error(err));
  }

  render() {
    const props = {
      events: this.state.events,
      location: this.state.location,
    };
    const tabNavigation = createMaterialBottomTabNavigator({
      List: {
        screen: (props) => <ListScreen {...props} />,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => (<Ionicons name="ios-list" size={34} style={{color: 'white'}} />),
          tabBarColor: '#592CEA'
        }
      },
      Map: {
        screen: (props) => <MapScreen {...props} />,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => (<MaterialCommunityIcons name="map-marker-radius" size={24} style={{color: 'white'}} />),
          tabBarColor: '#2A68F6',
        }
      },
      Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => (<MaterialIcons name="favorite-border" size={22} style={{color: 'white'}} />),
          tabBarColor: '#00cc99',
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

    let text = 'Finding popular events near you...';
    if (this.state.havePermission === false) {
      text = 'Permission to access location services denied. This application requires the use of location services to display nearby events. You will need to allow access to location services to use this application.';
    }
    return (
      !this.state.location ? (
        <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
      ) : <RootStack screenProps={props}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
