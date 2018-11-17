import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MapView } from 'expo';
import moment from 'moment';

moment().format();

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  constructor(props) {
    super(props);
    this.state = {

    }
    this.markers = {};
  }

  render() {
    const currentTime = moment(this.props.screenProps.location.time);
    return (
      <MapView
        style={styles.mapViewContainer}
        initialRegion={{
          latitude: this.props.screenProps.location.lat,
          longitude: this.props.screenProps.location.lng,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={true}
      >
        {this.props.screenProps.events.map((eventObj, i) => (
          <MapView.Marker
            coordinate={{latitude: eventObj.lat, longitude: eventObj.lng}}
            title={eventObj.name}
            description={`${eventObj.distance}mi | Ending ${currentTime.to(moment(eventObj.endTime))}`}
            key={`${eventObj.lat}:${eventObj.lng}`}
          />
        ))}
      </MapView>
    );
  }
};

{/* <View style={styles.mapContainer}>
 <Button
  title='Go to List'
  onPress={() => this.props.navigation.navigate('List')}
/>
<Button
  title='Go back'
  onPress={() => this.props.navigation.goBack()}
/>
</View> */}

const styles = StyleSheet.create({
  mapViewContainer: {
    flex: 1,
  },
  checkInView: {
    backgroundColor: 'white',
  }
});
