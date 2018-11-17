import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import moment from 'moment';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

moment().format();

class EventEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentTime = moment(this.props.currentTime);
    const endTime = moment(this.props.event.endTime);
    const categories = Object.keys(this.props.event.categories).map(category => {
      const firstCharCapital = category[0].toUpperCase();
      return firstCharCapital + category.slice(1);
    }).join(', ');
    const iconStorage = {
      Meetup: <Ionicons name="ios-people" size={20} />,
      Food: <MaterialCommunityIcons name="food-fork-drink" size={17} />,
      Birthday: <MaterialIcons name="cake" size={15} />,
      Workshop: <Ionicons name="md-school" size={17} />,
      Recreation: <Feather name="sun" size={15} />,
    }
  
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.openModal(this.props.event);
        }}
      >
        <View style={styles.entryContainer}>
          <View style={styles.row1}>
            <Text style={styles.name}>{this.props.event.name}</Text>
            <Text style={styles.distance}>{this.props.event.distance} mi</Text>
          </View>
          <View style={styles.row2}>
            {iconStorage[categories]}
            <Text style={styles.categories}>{categories}</Text>
            <Text style={styles.price}>{`Fee: $${this.props.event.fee}`}</Text>
            <Text style={styles.time}>Ends {currentTime.to(endTime)}</Text>
          </View>
        </View>
      </TouchableHighlight>
      
    );
  }
};

export default EventEntry;

const styles = StyleSheet.create({
  entryContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e6e6ff',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 5,
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
  },
  categories: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  price: {
    fontWeight: 'bold',
    position: 'absolute',
    left: '37%',
  },
  time: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
  },
  row1: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
  }
});
