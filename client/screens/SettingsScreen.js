import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <Text>Settings Screen</Text>
        <Button
          title='Go to Favorites page'
          onPress={() => this.props.navigation.navigate('Favorites')}
        />
        <Button
          title='Go to List page'
          onPress={() => this.props.navigation.navigate('List') }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({

});

export default SettingsScreen;
