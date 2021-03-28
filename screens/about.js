import React from 'react';
import { Block, Text } from 'expo-ui-kit';

export default ({ style }) => {
    return (
        <Block
            color="#D7ECD3"
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}>
            <Text h3 center>
                About ecoINDEXES
      </Text>
            <Text bold>enter stuff here and bla, bla, bla</Text>
        </Block>
    );
};
