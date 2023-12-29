import React,{useState,useEffect} from "react";
import Grid from "./grid";
import axios from "axios";
import SearchBox from "./searchBox";
import './componentStyles.css'


export default function MainContainer(){

    const [loading,setLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);

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

        for(let i = 1; i<=42; i++){
            urls.push(`https://rickandmortyapi.com/api/character/?page=${i}`)
        }
        console.log(urls)
        const requests = urls.map((url)=>makeRequests(url))
        Promise.all(requests).then((data)=>{
            const tempCharactersArray = [];

            for(let i of data){
                for(let k of i.results){
                    tempCharactersArray.push(k);
                }
            }

            setCharactersArray(tempCharactersArray);
            setLoading(true);
        })
         
    },[])


    return ( loading ? 
    <div>
        <SearchBox charactersArray={charactersArray}/>
        <Grid charactersData={charactersArray}/>
    </div>
     : 
     <div><h1>Loading.....</h1></div>
     )
}