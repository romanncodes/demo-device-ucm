import {  createContext, useState } from "react";


export const PlaceContext = createContext({
    imageUri:'',
    title:'',
    lat:0,
    lng:0,
    modifyImageUri:(image)=>{},
    modifyTitle:(title)=>{},
    modifyLat:(latitude)=>{},
    modifyLng:(longitude)=>{},

})

function PlaceContextProvider({children}){
    const [imageUri, setImageUri] = useState('')
    const [title, setTitle] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    function modifyImageUri(image){
        setImageUri(image)
    }

    function modifyTitle(title){
        setTitle(title)
    }

    function modifyLat(latitude){
        setLat(latitude)
    }

    function modifyLng(longitude){
        setLng(longitude);
    }

const value={
    imageUri:imageUri,
    title:title,
    lat:lat,
    lng:lng,
    modifyImageUri:modifyImageUri,
    modifyLng:modifyLng,
    modifyTitle:modifyTitle,
    modifyLat:modifyLat
}

    return <PlaceContext.Provider value={value}> 
        {children}
    </PlaceContext.Provider>

}

export default PlaceContextProvider;