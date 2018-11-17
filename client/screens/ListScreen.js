import React, { Component } from 'react';
import { Text, View, Button, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import SearchBar from '../components/SearchBar';
import EventEntry from '../components/EventEntry';
import EventModal from '../components/EventModal';

class ListScreen extends Component {
  static navigationOptions = {
    title: 'List',
  };

  constructor(props) {
    super(props);
    this.state = {
      displayEvents: this.props.screenProps.events,
      modalVisible: false,
      modalEvent: null,
      filter: null,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.search = this.search.bind(this);
  }

  openModal(event) {
    this.setState({
      modalVisible: true,
      modalEvent: event,
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }

  search(events, input, filter) {
    let results;
    if (filter === undefined) {
      return;
    } else if (filter === 'By Name') {
      results = events.filter(event => event.name.includes(input));
    } else if (filter === 'By Category') {
      results = events.filter(event => event.categories[input.toLowerCase()]);
    } else if (filter === 'By Host') {
      results = events.filter(event => (event.host.toLowerCase() === input.toLowerCase()));
    }
    this.setState({
      displayEvents: results,
    });
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <SearchBar events={this.props.screenProps.events} search={this.search}/>
        <FlatList
          data={this.state.displayEvents}
          renderItem={({item}) => <EventEntry event={item} currentTime={this.props.screenProps.location.time} openModal={this.openModal} />}
          keyExtractor={(item, index) => `${index}`}
          style={styles.flatList}
        />
        <Modal
          isVisible={this.state.modalVisible}
          style={styles.modal}
        >
          <EventModal event={this.state.modalEvent} location={this.props.screenProps.location} closeModal={this.closeModal} navigation={this.props.navigation} />
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
  },
  flatList: {
    flex: 1,
    width: '100%',
    padding: 10,
    margin: 0,
  },
  modal: {
    flex: 0,
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 150,
    height: 400,
  },
});

export default ListScreen;
