import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const DashboardScreen = () => {
    return (
      <View style={styles.container}>
      <Text> test</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#FFF'
  }
});

export default DashboardScreen;