import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';

export default FetchCityImage = (city) => {
    console.log(city);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/images/`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (data.photos[0].image.mobile)
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