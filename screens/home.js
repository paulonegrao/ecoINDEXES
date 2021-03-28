
import React from 'react';
import { StatusBar } from 'react-native';
import { Block, Text } from 'expo-ui-kit';

export default ({ style }) => {
    return (
        <Block
            color="#65BC55"
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}>
            <StatusBar />
            <Text h2 white center>
                Home ecoINDEXES
      </Text>
        </Block>
    );
};