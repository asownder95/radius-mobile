import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.searchOptions = [
      {value: 'By Name'},
      {value: 'By Category'},
      {value: 'By Host'},
    ];
    this.query = null;
    this.filter = null;
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput
            placeholder="Search for events"
            style={styles.searchBarInput}
            onChangeText={(value) => this.query = value}
            onSubmitEditing={() => {
              this.props.search(this.props.events, this.query, this.filter);
              console.log('submitted');
            }}
        />
        <Dropdown
          data={this.searchOptions}
          containerStyle={styles.searchBarOptions}
          dropdownPosition={0}
          label="Options"
          onChangeText={(value) => this.filter = value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    width: '100%',
    height: '15%',
  },
  searchBarInput: {
    flexWrap: 'wrap',
    width: '60%',
    height: 60,
    marginLeft: 10,
    marginTop: 10,
  },
  searchBarOptions: {
    width: '25%',
    marginLeft: 15,
  }
});

export default SearchBar;
