import axios from "axios";


export default async function getCharacterData(character){
    try{

        const originUrl = character.origin.url
        const locationUrl = character.location.url

        // console.log(character.origin.url,"here");
        // console.log(character.location.url,"here");

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

        return {locationAndOrigin,episodesAppearedIn};

    }catch(err){
        console.log(err)
    }
}

