import React,{useState,useEffect} from "react";
import Grid from "./grid";
import axios from "axios";
import SearchBox from "./searchBox";
import SearchDropDown from "./searchDropDown";
import './componentStyles.css'


export default function MainContainer(){

    const [loading,setLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);
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

    useEffect(()=>{
        const reqTimes = 42;
        const urls = [];

        for(let i = 1; i<=42; i++)
        {
            urls.push(`https://rickandmortyapi.com/api/character/?page=${i}`)
        }

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

    useEffect(()=>{
        
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