import axios from "axios";


export default async function getCharacterData(character){
    try{

        let origin,location;
        const originUrl = character.origin.url
        const locationUrl = character.location.url

        originUrl ?   origin = (await axios.get(originUrl)).data : origin=null;
        locationUrl ? location = (await axios.get(locationUrl)).data : location=null;

        const locationAndOrigin = {
            origin:{
                name:origin.name,
                dimension:origin.dimension,
                residents:origin.residents.length,
                type:origin.type
            },

            location:{
                name:location.name,
                dimension:location.dimension,
                residents:location.residents.length,
                type:location.type
            }
        }

        return locationAndOrigin;

    }catch(err){
        console.log(err)
    }
}