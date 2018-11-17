import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerName}>Radius</Text>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  headerName: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: '42%',
  },
});
