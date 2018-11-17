import React, { Component } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Image, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

moment().format();

export default class EventModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentTime = moment(this.props.location.time);
    const endTime = moment(this.props.event.endTime);
    const categories = Object.keys(this.props.event.categories).map(category => {
      const firstCharCapital = category[0].toUpperCase();
      return firstCharCapital + category.slice(1);
    }).join(', ');
    return (
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback
          style={styles.touchArea}
          onPress={this.props.closeModal}
        >
          <FontAwesome name="close" size={25} style={styles.closeButton}/>
        </TouchableWithoutFeedback>
        <View style={styles.test2}>
          <View onStartShouldSetResponder={() => true}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.name}>{this.props.event.name}</Text>
              <Text>{`Host: ${this.props.event.host}`}</Text>
              <Text>{`Address: ${this.props.event.address}`}</Text>
              <Text>{`Categories: ${categories}`}</Text>
              <Text>{`Admission Fee: $${this.props.event.fee}`}</Text>
              <Text>{`Ends ${currentTime.to(endTime)}`}</Text>
              <Button
                title='Locate'
                onPress={() => {
                  this.props.closeModal();
                  setTimeout(() => {
                    this.props.navigation.navigate('Map', {
                      event: this.props.event,
                    });
                  }, 500);
                }}
              />
              <Text>{this.props.event.description}</Text>
              <Image
                source={{ uri: this.props.event.photos[0].uri }}
                style={styles.images}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  touchArea: {
    flexDirection: 'column',
    padding: 10,
  },
  closeButton: {
    marginLeft: '85%',
  },
  images: {
    height: 175,
    width: 270,
    marginBottom: 100,
    marginLeft: '5%'
  },
  scrollView: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});
