import { Button, StyleSheet, View } from "react-native"
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { useNavigation } from "@react-navigation/native";

function LocationPicker(){

    const navigator = useNavigation();
    const [locationPermissionInformation, requestPermission]=useForegroundPermissions();
    
    async function verifyPermission(){
        if(locationPermissionInformation.status===PermissionStatus.UNDETERMINED ){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(locationPermissionInformation.status===PermissionStatus.DENIED){
            alert('Necesitas permisos geolocalizacion')
            return false;
        }
        return true;
    }

    async function pickOnMapHandler(){
        const hasPermission = await verifyPermission();

        if(!hasPermission){
            return
        }
        const location = await getCurrentPositionAsync();
        console.log(location)
        
        navigator.navigate('Map',
            {latitude:location.coords.latitude, longitude:location.coords.longitude})
    }

    return (
        <View>
            <View style={styles.actions}>
                <Button title="Pick on Map" onPress={pickOnMapHandler}/>
            </View>
        </View>
    )
}
export default LocationPicker;

const styles=StyleSheet.create({
    mapPreview:{
        marginVertical:8,
        width:'100%',
        height:200,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ccc',
        borderRadius:4
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})