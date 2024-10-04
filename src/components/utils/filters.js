//data for the filters are extracted via filters function, by passing the data of evrey character to the function
//it gathers all the necessary into such as location, statuses etc.
// it then filters out the duplicate data, keeping the data set unique
export default function filters(charactersData){

    const locations = getLocations(charactersData);
    const statuses = getStatuses(charactersData);
    const episodes = getEpisodes(charactersData);
    const genders = getGenders(charactersData);
    const species = getSpecies(charactersData);
    const types = getTypes(charactersData);
    return {locations,statuses,episodes,genders,species,types}
}

function getLocations(charactersData){
    let locations = []
    for(let character of charactersData){
        locations.push(character.location.name);
    }
    const filteredLocations = [...new Set(locations)];
    const finalLocations = filteredLocations.map((location)=>{
        return {value:location,label:location,type:"location"}
    })
    return finalLocations;

}


function getStatuses(charactersData){
    let statuses = []
    for(let character of charactersData){
        statuses.push(character.status);
    }
    const filteredStatuses = [...new Set(statuses)];
    const finalStatuses = filteredStatuses.map((status)=>{
        return {value:status,label:status,type:"status"}   
    })

    return finalStatuses;
}


 function getEpisodes(charactersData){
    try{
    let episodes = []
    const regex = /\/episode\/(\d+)$/;
    for(let character of charactersData){
        character.episode.forEach((url)=>{
            episodes.push(url.match(regex)[1])
        })
    }

    const filteredepisodes = [...new Set(episodes)];
    const finalEpisodes = filteredepisodes.map((episode)=>{
        return {value:episode,label:episode,type:"episode"}
    })
    
    return finalEpisodes;
    }catch(err){

    }
}

function getGenders(charactersData){
    let genders = []
    for(let character of charactersData){
        genders.push(character.gender);
    }
    const filteredGenders = [...new Set(genders)];
    const finalGenders = filteredGenders.map((gender)=>{
        return {value:gender,label:gender,type:"gender"}   
    })
    return finalGenders;
}

function getSpecies(charactersData){
    let species = []
    for(let character of charactersData){
        species.push(character.species);
    }
    const filteredSpecies = [...new Set(species)];
    const finalSpecies = filteredSpecies.map((specie)=>{
        return {value:specie,label:specie,type:"species"}   
    })

    return finalSpecies;
}

function getTypes(charactersData){
    let types = []
    for(let character of charactersData){
        types.push(character.type);
    }
    const filteredTypes = [...new Set(types)];
    const finalTypes = filteredTypes.map((type)=>{
        return {value:type,label:type,type:"type"}   
    })
    return finalTypes;
}
