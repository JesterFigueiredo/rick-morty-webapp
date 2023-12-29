import React,{useState,useEffect} from "react";
import Grid from "./grid";
import axios from "axios";
import SearchBox from "./searchBox";
import SearchDropDown from "./searchDropDown";
import './componentStyles.css'

// The MainContainer component holds the grid of cards and the filters and search bar to perform opertions  on the grid data
// It performs all the network api calls to populate the grid, filters and search components with required data
// It is also reponsible to update the grid data whenever filters are applied
export default function MainContainer(){

    
    const [loading,setLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);
    //initialArrayCopy state is a copy of charactersArray state
    //charactersArray state changes over time to based on filters applied and that's where initialArrayCopy comes in
    // it helps to set the state to the initial mode
    // initialArrayCopy is also passed to search and filter componenet to extract required data for those components
    const [initialArrayCopy,setInitialArrayCopy] = useState([]);
    const [filterOptions, setFilterOptions] = useState(false);

    async function makeRequests(url){
        try {
            const response = await axios.get(url);
            return response.data;
          } catch (error) {
            console.error(`Error fetching data from ${url}:`, error.message);
          }
    }

    //runs on the initial render of the webapp to populate the grid
    useEffect(()=>{
        const reqTimes = 42;
        const urls = [];

        for(let i = 1; i<=42; i++)
        {
            urls.push(`https://rickandmortyapi.com/api/character/?page=${i}`)
        }

        //since api is paginated, all required urls are built and and fetched one after the other, resulting in a array of promises
        //this array is resolved with promise all and the characters' data is stored in the states
        const requests = urls.map((url)=>makeRequests(url))
        Promise.all(requests).then((data)=>{
            let tempCharactersArray = [];

            for(let i of data)
            {
                for(let k of i.results){
                    tempCharactersArray.push(k);
                }
            }

            setCharactersArray(tempCharactersArray);
            setInitialArrayCopy(tempCharactersArray)
            setLoading(true);
        })
         
    },[])

    //this use effect is only triggered when filterOptions state changes
    //It looks after changing grid data based on the filters applied
    useEffect(()=>{
        //when content is only to be filtered based on episode number
        if(filterOptions.episode && filterOptions.location==='' 
        && filterOptions.status==='' && filterOptions.gender==='' 
        && filterOptions.species==='' && filterOptions.type==='')
        {
            
                let filteredArray = initialArrayCopy.filter((characterObj)=>{
                    let flag = false;
                
                    for(let i of characterObj.episode){
                        const regex = /\/episode\/(\d+)$/;
                        const match = i.match(regex)[1];
                        if(match == filterOptions.episode){
                            console.log(filterOptions.episode)
                            flag = true;
                            break;
                        }
                    }
                    return flag;
                })
                console.log(filteredArray)
                setCharactersArray(filteredArray);
        }


        //when content is only to be filtered based on location name
        else if(filterOptions.location && filterOptions.episode==='' 
                && filterOptions.status==='' && filterOptions.gender==='' 
                && filterOptions.species==='' && filterOptions.type==='')
            {
                let filteredArray = initialArrayCopy.filter((characterObj)=>{
                    let flag = false;
                    if(characterObj.location.name == filterOptions.location){
                        flag = true;
                    }
                    return flag;
                })
                console.log(filteredArray)
                setCharactersArray(filteredArray);
            }


        //when content is to be filtered with rest of the parameters, this might include episode number and location name as well
         else if(filterOptions)
        {
            setLoading(false)

            const status = filterOptions.statustus ? encodeURIComponent(filterOptions.status) : "";
            const type = filterOptions.type ? encodeURIComponent(filterOptions.type) : "";
            const gender = filterOptions.gender ? encodeURIComponent(filterOptions.gender) : "";
            const species = filterOptions.species ? encodeURIComponent(filterOptions.species) : "";
            
            const url = `https://rickandmortyapi.com/api/character/?status=${status}&species=${species}&type=${type}&gender=${gender}`;

    
            axios.get(url).then((response)=>{

                let tempCharactersArray = [];

                    for(let k of response.data.results){
                        tempCharactersArray.push(k);
                    }

                if(filterOptions.episode)
                {
                    let filteredArray = tempCharactersArray.filter((characterObj)=>{
                        let flag = false;

                        for(let i of characterObj.episode){
                            const regex = /\/episode\/(\d+)$/;
                            const match = i.match(regex)[1];
                            if(match == filterOptions.episode){
                                flag = true;
                                break;
                            }
                        }
                        return flag;
                    })

                    tempCharactersArray = filteredArray;
                }


                if(filterOptions.location)
                {
                        let filteredArray = tempCharactersArray.filter((characterObj)=>{
                            let flag = false;
                            if(characterObj.location.name == filterOptions.location){
                                flag = true;
                            }
                            return flag;
                        })

                        tempCharactersArray = filteredArray;
                }
    
                setCharactersArray(tempCharactersArray);
                setLoading(true);

            }).catch((err)=>{
                console.log(err);
                setCharactersArray([])
            })
        }
      //set state function for filterOptions is passed to the SearchDropDown Component   
    },[filterOptions])



    return ( loading ? 
    <div>
        <SearchDropDown charactersData={initialArrayCopy} setFilterOptions={setFilterOptions}/>
        <SearchBox charactersArray={initialArrayCopy}/>
        <Grid charactersData={charactersArray}/>
    </div>
     : 
     <div><h1>Loading.....</h1></div>
     )
}