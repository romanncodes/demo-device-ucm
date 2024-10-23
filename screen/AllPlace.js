
import { View, Text, StyleSheet } from "react-native"
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
function AllPlace(){
    const navigator = useNavigation();

    function addPlaceHandler(){
        navigator.navigate('AddPlace')
    }

    useLayoutEffect(()=>{
        navigator.setOptions({
            headerRight:()=><IconButton 
                                name='add' 
                                color='#000' 
                                onPress={addPlaceHandler}
                                />
        })
    },[navigator])


    return(
        <View>
            <Text>All Place</Text>
        </View>
    )
}

export default AllPlace;


const styles = StyleSheet.create({

})