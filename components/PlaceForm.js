import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput ,StyleSheet, Button} from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { PlaceContext } from "../store";


function PlaceForm(props){


    const [title,setTitle] = useState('')


    useEffect(()=>{
        props.updateTitle(title)
    },[title])


    function changeTitle(text){
        setTitle(text)
    }


   

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitle}/>
            </View>
            <ImagePicker updateImageUri={props.updateImageUri}/>
            <LocationPicker />

            <Button title="save" onPress={props.saveHandler} />
            
        </ScrollView>
    )
}


export default PlaceForm;

const styles=StyleSheet.create({
    form:{
        //flex:1,
        padding:24
    },
    label:{
        fontWeight:'bold',
        marginBottom:4
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        borderWidth:2,
        borderColor:'#cccccc',

    }

})


