
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import CarouselScreen from './components/CarouselScreen';
import Navigator from './routes/drawer'

export default function App() {

  return (
    <View style={styles.container}>

      {/* <CarouselScreen top={'polluted'} /> */}
      <Navigator />
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
