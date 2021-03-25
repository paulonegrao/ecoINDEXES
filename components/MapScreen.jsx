import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default MapScreen = () => {
    return (
        <View style={styles.container}>
            <MapView
                style={{ height: '100%' }}
                provider={MapView.PROVIDER_GOOGLE}
                region={{
                    latitude: 0,
                    longitude: -37,
                    latitudeDelta: 150,
                    longitudeDelta: 150
                }}
            ></MapView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});