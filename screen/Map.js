
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/IconButton";
import { PlaceContext } from "../store";



function  Map(){
    const placeCTX = useContext(PlaceContext)
    const route = useRoute()
    const navigator = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState({lat:route.params.latitude, lng:route.params.longitude})

    function savePickerHandler(){
        placeCTX.modifyLat(selectedLocation?.lat)
        placeCTX.modifyLng(selectedLocation?.lng)
        navigator.navigate('AddPlace')
    }

    useLayoutEffect(()=>{
        navigator.setOptions({
            headerRight:()=><IconButton 
                                name='save' 
                                color='#000' 
                                onPress={savePickerHandler}
                                />
        })
    },[navigator])


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