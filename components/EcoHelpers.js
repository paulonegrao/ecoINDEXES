import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';

export const FetchPollutionIDXW = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://www.numbeo.com/api/rankings_by_city_current?api_key=9dzoy81on65u1c&section=8`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (data);

};
export const FetchPollutionIDX = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    fetch(`https://www.numbeo.com/api/rankings_by_city_current?api_key=9dzoy81on65u1c&section=8`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    console.log(`pIDX=${data}`);
    return (data);

};


export const setCoordinates = () => {
    console.log(1111111);
    const [isLoading, setLoading] = useState(true);
    const [dataCities, setDataCities] = useState([]);
    const [dataPIDX, setDataPIDX] = useState([]);

    useEffect(() => {
        fetch(`https://www.numbeo.com/api/cities?api_key=9dzoy81on65u1c`)
            .then((response) => response.json())
            .then((json) => setDataCities(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetch(`https://www.numbeo.com/api/rankings_by_city_current?api_key=9dzoy81on65u1c&section=8`)
            .then((response) => response.json())
            .then((json) => setDataPIDX(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    //console.log(`pIDX=${dataPIDX[0].city_id}`);
    //console.log(`cities=${dataCities.cities[0].city_id}`);

    return (dataPIDX, dataCities);

};

export const setCoordinatesW = (pIDX, c) => {
    // console.log(`pIDX=${pIDX[0].city_id}`);
    // console.log(`cities=${c.cities[0].city_id}`);

    for (let i = 0; i < pIDX.length; i++) {
        console.log(`entrou=${pIDX[i].city_id}`)
        console.log(`clength=${c.length}`);
        for (let j = 0; j < c.length; j++) {
            console.log('caraca');
            console.log(`entrouiiii=${c.cities[jsyaml].city_id}`)
            if (pIDX[i].city_id == c.cities[j].city_id) {
                console.log(`pIDX city=${pIDX[i].city_id}... ${c.cities[j].city_id}... ${pIDX[i].city_name}`)
            }
        }
    }

    return (9);
};

/*
<View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <Text>Loading...</Text> :
                (<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>{data.title}</Text>
                    <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10 }}>Articles:</Text>
                    <FlatList
                        data={data.articles}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <Text>{item.id + '. ' + item.title}</Text>
                        )}
                    />
                </View>
                )}
        </View>


return (

        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <Text>Loading...</Text> :
                (<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>{data.title}</Text>
                    <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10 }}>Articles:</Text>
                    <Text>{data.photos[0].image.mobile}</Text>
                    <Image style={{ width: 300, height: 200 }}
                        source={{ uri: data.photos[0].image.mobile }} />
                </View>
                )}
        </View>
    );


*/