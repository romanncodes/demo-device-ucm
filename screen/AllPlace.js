
import { View, Text, StyleSheet } from "react-native"
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../components/IconButton";
import { useSQLiteContext } from "expo-sqlite";
function AllPlace(){
    const navigator = useNavigation();
    const route = useRoute()
    const db = useSQLiteContext();
    const [status, setStatus]=useState(route?.params?.status);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync('SELECT * FROM test');
      setTodos(result);
      console.log("Cargando datos")
    }
    setup();
  }, [route]);

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
            {todos.map((item, index)=>(
                //se puede cargar la imagen
                <Text key={index}>{item.title}</Text>
            ))}
        </View>
    )
}

export default AllPlace;


const styles = StyleSheet.create({

})