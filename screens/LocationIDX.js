import React from 'react';
import { Block, Text } from 'expo-ui-kit';

export default ({ style }) => {
    return (
        <Block
            color="#9BD092"
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}>
            <Text h3 center>
                Location ecoINDEXES
      </Text>
            <Text bold>enter stuff here and bla, bla, bla</Text>
        </Block>
    );
};
