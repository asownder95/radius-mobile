import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class FavoritesScreen extends Component {
  static navigationOptions = {
    title: 'Favorites',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <Text>Favorites Screen</Text>
        <Button
          title='Go to Map page'
          onPress={() => {
            this.props.navigation.navigate('Map', {
              itemId: 86,
              otherParam: 'anything you want here',
            })}
          }
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

export default FavoritesScreen;
