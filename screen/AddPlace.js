
import { View, Text, StyleSheet } from "react-native"
import PlaceForm from "../components/PlaceForm";
import { PlaceContext } from "../store";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

function AddPlace(){
    const placeCTX = useContext(PlaceContext)
    const navigator = useNavigation();
    const db = useSQLiteContext();


    function updateImageUri(imageUri){
        if(imageUri){
            console.log("#####")
            console.log(imageUri)
            placeCTX.modifyImageUri(imageUri)
            console.log("****")
            console.log(placeCTX.imageUri)
        }else{
            console.log('error');
            console.log(placeCTX.imageUri)
        }
        

    }

    function updateTitle(title){
        placeCTX.modifyTitle(title)
    }

     async function saveHandler(){
        console.log(placeCTX.title)
        console.log(placeCTX.imageUri)
        console.log(placeCTX.lat)
        console.log(placeCTX.lng)
        
       await db.runAsync('INSERT INTO test (title, imageUri, lat, lng) VALUES ( ?, ?, ?,?)',
                            placeCTX.title, 
                            placeCTX.imageUri,
                            placeCTX.lat,
                            placeCTX.lng);



            navigator.navigate('AllPlace',{status:'OK'})


        
    }



    return(
        <View>
            <PlaceForm 
                updateImageUri={updateImageUri}
                updateTitle={updateTitle}
                saveHandler={saveHandler}
             />
        </View>
    )
}

export default AddPlace;


const styles = StyleSheet.create({
    
})