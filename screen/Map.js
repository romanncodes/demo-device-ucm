
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps";

function  Map(){
    const route = useRoute()
    const [selectedLocation, setSelectedLocation] = useState()

    const region={
        latitude:route.params.latitude,
        longitude:route.params.longitude,
        latitudeDelta:0.00922,
        longitudeDelta:0.00421
    }

    function selectLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat:lat, lng:lng})
    }

    return(
        <View style={styles.container}>
            <MapView 
                onPress={selectLocationHandler}
                initialRegion={region}
                style={styles.map} >
                    <Marker
                        title="Picked Location"
                        coordinate={{
                            latitude:selectedLocation?.lat,
                            longitude:selectedLocation?.lng
                        }}
                    />
            </MapView>
        </View>
    )
}

export default Map;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    map:{
        height:'100%',
        width:'100%'
    }
})