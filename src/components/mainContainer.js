import React,{useState,useEffect} from "react";
import Grid from "./grid";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import './componentStyles.css'


export default function MainContainer(){

    const [data, setData] = useState(null);
    const [nextPrevious, setNextPrevious] = useState({previous:null,next:1,action:''});
    const [loading,setLoading] = useState(false);

    async function makeRequests(urls){
        try {
            const response = await axios.get(urls);
            console.log(response.data); // Do something with the data
          } catch (error) {
            console.error(`Error fetching data from ${urls}:`, error.message);
          }
    }

    useEffect(()=>{
        const reqTimes = 42;
        const urls = [];

        for(let i = 1; i<=42; i++){
            urls.push(`https://rickandmortyapi.com/api/character/?page=${i}`)
        }
        console.log(urls)
    },[])

    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/character/?page=${nextPrevious['next']}`)
        .then((response)=>{
            setData(response.data.results)
            setNextPrevious({...nextPrevious,
                previous:response.data.info.prev,
                next:response.data.info.next
            })
            setLoading(true);
        }).catch((err)=>{
            console.log(err)
        })
    },[])


    async function onClickPreviousNextButton(action){
        if(!nextPrevious[action]){

        }
        else{
            setLoading(false);
            await axios.get(nextPrevious[action])
            .then((response)=>{
                setData(response.data.results)
                setNextPrevious({...nextPrevious,
                    previous:response.data.info.prev,
                    next:response.data.info.next
                })
                setLoading(true);
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    if(loading){
        return(
            <div>
                <div className="previous-next-buttons">
                    <Button  variant="success" onClick={()=>{onClickPreviousNextButton('previous')}}>previous</Button>
                    <Button  variant="success" onClick={()=>{onClickPreviousNextButton('next')}}>next</Button>
                </div>
                <Grid charactersData={data}/>
            </div>
        );
    }

    else{
        return(
            <div>
                <h1>Loading.....</h1>
            </div>
        );
    }
}