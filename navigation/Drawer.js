import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    DrawerItem,
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import * as Icon from "react-native-feather";
import { Block, Button, Text } from 'expo-ui-kit';

// screens
import Home from '../screens/Home';
import Top10 from '../screens/Top10';
import LocationIDX from '../screens/LocationIDX';
import About from '../screens/About';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DEFAULT_COLOR = "#212733";

const Screens = ({ navigation, style }) => {
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerLeft: () => (
                        <Button transparent onPress={() => navigation.openDrawer()}>
                            <Feather name="menu" size={40} color={DEFAULT_COLOR} style={{ paddingHorizontal: 15 }} />
                        </Button>
                    ),
                }}>
                <Stack.Screen name="Home">{props => <Home {...props} />}</Stack.Screen>
                <Stack.Screen name="Top10Green">{() => <Top10 top={'green'} />}</Stack.Screen>
                <Stack.Screen name="Top10Polluted">{() => <Top10 top={'polluted'} />}</Stack.Screen>
                <Stack.Screen name="LocationIDX">{props => <LocationIDX {...props} />}</Stack.Screen>
                <Stack.Screen name="About">{props => <About {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </Animated.View>
    );
};

const DrawerContent = props => {
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
            <Block>
                <Block flex={0.4} marginLeft={20} paddingTop={90} bottom>
                    <Image
                        source={{
                            uri: 'https://raw.githubusercontent.com/paulonegrao/assets/master/ecoINDEXES/ecoIDX.png',
                            height: 200,
                            width: 200,
                            scale: 1,
                        }}
                        resizeMode="center"
                    />
                    <Text green title>
                        Menu
                    </Text>
                    <Text green size={9}>
                        entrar bla, bla, bla aqui...
                    </Text>
                </Block>
                <Block>
                    <DrawerItem
                        label="Home"
                        labelStyle={{ color: { DEFAULT_COLOR }, marginLeft: -16 }}
                        // style={styles.drawerItem}
                        onPress={() => props.navigation.navigate('Home')}
                        icon={() => <Icon.Home
                            stroke={DEFAULT_COLOR}
                            strokeWidth={1}
                            width={40}
                            height={40}
                        />}
                    />
                    <DrawerItem
                        label="Top 10 Green"
                        labelStyle={{ color: { DEFAULT_COLOR }, marginLeft: -16 }}
                        onPress={() => props.navigation.navigate('Top10Green')}
                        icon={() => <Icon.Award
                            stroke='green'
                            strokeWidth={1}
                            width={40}
                            height={40}
                        />}
                    />
                    <DrawerItem
                        label="Top 10 Polluted"
                        labelStyle={{ color: { DEFAULT_COLOR }, marginLeft: -16 }}
                        onPress={() => props.navigation.navigate('Top10Polluted')}
                        icon={() => <Icon.Award
                            stroke='red'
                            strokeWidth={1}
                            width={40}
                            height={40}
                        />}
                    />
                    <DrawerItem
                        label="Location IDXs"
                        labelStyle={{ color: { DEFAULT_COLOR }, marginLeft: -16 }}
                        onPress={() => props.navigation.navigate('LocationIDX')}
                        icon={() => <Icon.MapPin
                            stroke={DEFAULT_COLOR}
                            strokeWidth={1}
                            width={40}
                            height={40}
                        />}
                    />
                    <DrawerItem
                        label="About"
                        labelStyle={{ color: { DEFAULT_COLOR }, marginLeft: -16 }}
                        onPress={() => props.navigation.navigate('About')}
                        icon={() => <Icon.Info
                            stroke={DEFAULT_COLOR}
                            strokeWidth={1}
                            width={40}
                            height={40}
                        />}
                    />
                </Block>
            </Block>
        </DrawerContentScrollView>
    );
};

export default () => {
    const [progress, setProgress] = React.useState(new Animated.Value(0));
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };

    return (
        <Drawer.Navigator
            // hideStatusBar
            drawerType="slide"
            overlayColor="transparent"
            drawerStyle={styles.drawerStyles}
            contentContainerStyle={{ flex: 1 }}
            drawerContentOptions={{
                activeBackgroundColor: 'transparent',
                activeTintColor: 'green',
                inactiveTintColor: 'green',
            }}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            drawerContent={props => {
                setProgress(props.progress);
                return <DrawerContent {...props} />;
            }}>
            <Drawer.Screen name="Screens">
                {props => <Screens {...props} style={animatedStyle} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: DEFAULT_COLOR,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,

    },
    drawerStyles: { flex: 1, width: '70%', backgroundColor: 'transparent' },

    drawerLabel: { color: 'green', marginLeft: -16 },

});