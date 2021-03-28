import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import ProgressCircle from 'react-native-progress-circle';
import { Award } from "react-native-feather";

export default Top10 = ({ top }) => {
    const GREEN_TITLE = 'Top 10 Green'
    const POLLUTED_TITLE = 'Top 10 Polluted'
    const ORIENTATION_CALLOUT = 'Slide cards or drag map \n to swap between cities'
    const GREEN_COLOR = 'green'
    const GREEN_COLOR_ALPHA = 'rgba(48, 166, 50, 0.6)'
    const POLLUTED_COLOR = 'red'
    const POLLUTED_COLOR_ALPHA = 'rgba(252, 59, 63, 0.6)'
    const CITY_IMAGES_URI = 'https://raw.githubusercontent.com/paulonegrao/assets/master/ecoINDEXES/cities/';

    const [markers] = useState([]);
    const [coordinates, setCoordinates] = useState(
        [{
            pos: '',
            name: ORIENTATION_CALLOUT,
            pIDX: '',
            latitude: 0,
            longitude: -40,
            image: require('../assets/ecoIDX.png')
        }]);

    let coordMatch = [...coordinates];

    useEffect(() => {
        getIDXandCities()
            .then(([dataIDXs, dataCities]) => {
                // loop to get city NAME & POLLUTION INDEX from Numbeo API
                // and get city LAT & LON from Numbeo API

                setMatch(0, dataIDXs, dataCities)



                setCoordinates(coordMatch.slice())
            })

    }, []);

    const setMatch = (i, dataIDXs, dataCities) => {

        let position = 0
        for (top == 'green' ? i = dataIDXs.length - 1 : i = 0;
            top == 'green' ? i > dataIDXs.length - 11 : i < 10;
            top == 'green' ? i-- : i++) {
            for (let j = 0; j < dataCities.cities.length; j++) {
                if (dataIDXs[i].city_id == dataCities.cities[j].city_id) {
                    let posMatch = ++position
                    let nameMatch = dataCities.cities[j].city
                    // eliminates the word 'City' from name: avoid formatting/space issues
                    nameMatch = nameMatch.replace('City', '').trim()
                    let latMatch = dataCities.cities[j].latitude
                    let lonMatch = dataCities.cities[j].longitude
                    let pIDXMatch = top == 'green' ? (100 - dataIDXs[i].pollution_index) : dataIDXs[i].pollution_index
                    let randImage = Math.floor(Math.random() * 2) + 1
                    imageW = `${CITY_IMAGES_URI}${nameMatch.replace(/ /g, '_')}_${randImage}.jpeg`
                    let imageMatch = { uri: imageW }
                    console.log('>>>' + imageMatch)
                    let eleMatch = {
                        pos: posMatch,
                        name: nameMatch,
                        pIDX: parseInt(pIDXMatch),
                        latitude: latMatch,
                        longitude: lonMatch,
                        image: imageMatch
                    }

                    coordMatch.push(eleMatch)

                    j = dataCities.cities.length

                }
            }
        }
    }

    const getIDXs = async () => {
        return await fetch(`https://www.numbeo.com/api/rankings_by_city_current?api_key=9dzoy81on65u1c&section=8`)
            .then((response) => response.json())
    };

    const getCities = async () => {
        const data = await fetch(`https://www.numbeo.com/api/cities?api_key=9dzoy81on65u1c`)
        const reg = await data.json();
        return (reg);
    };

    // Promise.all` returns a new Promise that resolves when all of its arguments resolve.
    const getIDXandCities = () => {
        return Promise.all([getIDXs(), getCities()])
    }

    onCarouselItemChange = (index) => {
        let location = coordinates[index];

        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: index == 0 ? 100 : 10,
            longitudeDelta: index == 0 ? 100 : 10
        })

        markers[index].showCallout()
    };

    onMarkerPressed = (location, index) => {
        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 12,
            longitudeDelta: 12
        });

        this._carousel.snapToItem(index);
    };

    renderCarouselItem = ({ item, index }) => {
        return (<View style={{
            ...styles.cardContainer,
            backgroundColor: top == 'green'
                ? GREEN_COLOR_ALPHA
                : POLLUTED_COLOR_ALPHA
        }}>
            {index == 0
                ? <Text style={{ ...styles.cardTitle, paddingTop: 10 }}>{top == 'green' ? GREEN_TITLE : POLLUTED_TITLE} </Text>
                : <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.cardTitle}>{item.pos}</Text>
                        <Text style={{ ...styles.cardTitle, flex: 3 }}>{item.name}</Text>
                        <View style={styles.cardTitle} >
                            <ProgressCircle
                                percent={94}
                                radius={25}
                                borderWidth={3}
                                color={top == 'green' ? GREEN_COLOR : POLLUTED_COLOR}
                                shadowColor={top == 'green' ? POLLUTED_COLOR : GREEN_COLOR}
                                bgColor='none'
                            >
                                <Text style={styles.IDX}>{item.pIDX}</Text>
                            </ProgressCircle>
                        </View>
                    </View>
                    <Award
                        style={styles.award}
                        stroke={top == 'green' ? GREEN_COLOR : POLLUTED_COLOR}
                        strokeWidth={1}
                        width={78}
                        height={78} />
                </>
            }
            <Image style={styles.cardImage} source={item.image}
            />
        </View>);
    }

    return (
        <View
            style={styles.container}>

            <MapView
                ref={map => this._map = map}
                style={{ height: '100%' }}
                provider={MapView.PROVIDER_GOOGLE}
                region={{
                    latitude: 0,
                    longitude: -40,
                    latitudeDelta: 100,
                    longitudeDelta: 100
                }}
            >
                {
                    coordinates.map((marker, index) => (

                        <Marker

                            key={marker.name}
                            opacity={index == 0 ? 0 : 1} // donnot show marker at the first card
                            pinColor={top == 'green' ? 'green' : 'red'}
                            ref={ref => markers[index] = ref}
                            onPress={() => this.onMarkerPressed(marker, index)}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        >
                            <Callout>
                                <Text>{marker.name}</Text>
                                {/* <Image style={{ height: 100, width: 100 }} source={require('../assets/ecoINDEXES.png')} resizeMode="cover" /> */}
                            </Callout>

                        </Marker>
                    ))
                }
            </MapView>
            <Carousel
                ref={(c) => { this._carousel = c }}
                data={coordinates}
                containerCustomStyle={styles.carousel}
                renderItem={this.renderCarouselItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
                removeClippedSubviews={false}
                onSnapToItem={(index) => this.onCarouselItemChange(index)}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    carousel: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 48
    },
    cardContainer: {
        height: 200,
        width: 300,
        padding: 4,
        borderRadius: 24
    },
    cardImage: {
        height: 142,
        width: 300,
        bottom: 0,
        position: 'absolute',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    cardTitle: {
        flex: 1,
        color: 'white',
        fontSize: 21,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18
    },
    award: {
        position: 'absolute',
        top: 3,
        left: -5,
        zIndex: 1
    },
    IDX: {
        color: 'white',
        fontSize: 17
    }
});