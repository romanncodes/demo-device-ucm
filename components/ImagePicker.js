
import { Button, View, Image, Text, StyleSheet } from "react-native";

import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";

function ImagePicker(){

    const [pickedImage, setPickedImage]=useState()

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();


    async function verifyPermission(){
        if(cameraPermissionInformation.status===PermissionStatus.UNDETERMINED ){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status===PermissionStatus.DENIED){
            alert('Necesitas permisos de la camara')
            return false;
        }
        return true;
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermission()

        if(!hasPermission){
            return
        }
        const image = await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        });
        setPickedImage(image.assets[0].uri)
        console.log(image.assets[0].uri)
    }
    return (
        <View>
            <View style={styles.imageContainer}>
                {pickedImage?
                    <Image style={styles.image} source={{uri: pickedImage}}/>
                    :
                    <Text>Imagen no tomada</Text>
                }
                
            </View>
            <Button title="Take Image" onPress={takeImageHandler}/>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imageContainer:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        backgroundColor:'#ccc'

    },
    image:{
        width:'100%',
        height:'100%'
    }
})