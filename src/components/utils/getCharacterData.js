import axios from "axios";


export default async function getCharacterData(character){
    try{

        const originUrl = character?.origin?.url || null
        const locationUrl = character?.location?.url || null
        
        let origin = originUrl ? (await axios.get(originUrl)).data : null;
        let location = locationUrl ? (await axios.get(locationUrl)).data : null;

        let url = "https://rickandmortyapi.com/api/episode/";
        for(let i of character.episode){
            const regex = /\/episode\/(\d+)$/;
            const match = i.match(regex)[1];
            url = url+match+','
        }
        let episodesAppearedIn = (await axios.get(url)).data;

        const locationAndOrigin = {
            origin:{
                name:origin ? origin.name : "unknown",
                dimension:origin ? origin.dimension : "unknown",
                residents:origin ? origin.residents.length: "unknown",
                type:origin ? origin.type : "unknown"
            },

            location: {
                name: location && location.name ? location.name : "unknown",
                dimension: location && location.dimension ? location.dimension : "unknown",
                residents: location && location.residents ? location.residents.length : "unknown",
                type: location && location.type ? location.type : "unknown"
            }
        }

        return {locationAndOrigin,episodesAppearedIn};

    }catch(err){
        console.log(err,"error here in getcharacterData")
    }
}

