import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';


export default CarouselScreen = ({ top }) => {
    const CITY_IMAGES_URI = 'https://raw.githubusercontent.com/paulonegrao/assets/master/ecoINDEXES/cities/';

    const [markers, setMarkers] = useState([]);
    const [coordinates, setCoordinates] = useState(
        [{
            pos: 1,
            name: 'Vancouver',
            pIDX: '',
            latitude: 0,
            longitude: -40,
            image: require('../assets/ecoINDEXES.png')
        }]);

    let coordMatch = [...coordinates];

    useEffect(() => {
        getIDXandCities()
            .then(([dataIDXs, dataCities]) => {
                // loop to get city NAME & POLLUTION INDEX from Numbeo API
                // and get city LAT & LON from Numbeo API
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < dataCities.cities.length; j++) {
                        if (dataIDXs[i].city_id == dataCities.cities[j].city_id) {
                            let posMatch = i + 1
                            let nameMatch = dataCities.cities[j].city
                            // eliminates the word 'City' from name: avoid formatting/space issues
                            nameMatch = nameMatch.replace('City', '').trim()
                            let latMatch = dataCities.cities[j].latitude
                            let lonMatch = dataCities.cities[j].longitude
                            let pIDXMatch = dataIDXs[i].pollution_index
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

                setCoordinates(coordMatch.slice())
            })

    }, []);

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
            latitudeDelta: 50,
            longitudeDelta: 50
        })

        markers[index].showCallout()
    };

    onMarkerPressed = (location, index) => {
        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 50,
            longitudeDelta: 50
        });

        this._carousel.snapToItem(index);
    };

    renderCarouselItem = ({ item, index }) => {
        return (<View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.pos}: {item.name}: {item.pIDX}</Text>
            <Image style={styles.cardImage} source={item.image} />
        </View>);
    }

    return (
        <View style={styles.container}>

            <MapView
                ref={map => this._map = map}
                style={{ height: '100%' }}
                provider={MapView.PROVIDER_GOOGLE}
                region={{
                    latitude: 0,
                    longitude: -40,
                    latitudeDelta: 150,
                    longitudeDelta: 150
                }}

            >
                {
                    coordinates.map((marker, index) => (

                        <Marker
                            key={marker.name}
                            //ref={ref => setMarkers(markers[index] = ref)}
                            //ref={ref => updateMarkers(ref)}
                            ref={ref => markers[index] = ref}
                            onPress={() => this.onMarkerPressed(marker, index)}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        >
                            <Callout>
                                <Text>{marker.name}</Text>
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
        backgroundColor: 'rgba(150, 0, 0, 0.4)',
        height: 200,
        width: 300,
        padding: 12,
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
        color: 'white',
        fontSize: 21,
        alignSelf: 'center'
    }
});