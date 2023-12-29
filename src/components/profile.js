import React,{useState,useEffect} from "react";
import Popup from 'reactjs-popup';
import './componentStyles.css';
import getCharacterData from './utils/getCharacterData';


//Profile componenet is a modal that when called shows detailed information about a character in a popup modal
//this component is currently being used in cards and search box
export default function Profile({character,buttonName}){

    const [locationAndOrigin, setLocationAndOrigin] = useState({});
    const [episodesAppearedIn, setEpisodesAppearedIn] = useState([]);
    const [loading, setLoading] = useState(false);

    //This runs on the initial render to gather all the necessary data which requires a different api call
    //data such as location, origin, episode in which the character appears
    //this happens in the background and till then the user is shown a loading view
    useEffect(()=>{
        getCharacterData(character).then((data)=>{
            setLocationAndOrigin(data.locationAndOrigin)
            setEpisodesAppearedIn(data.episodesAppearedIn)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
      setLoading(true)
    },[locationAndOrigin])

    if(!loading){
        return(
            <Popup
            trigger={<button className="button"> View Profile </button>}
            modal
            nested
            >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header">{character.name} </div>
                <div className="content">
                  <div className="modal-image">
                  <img src={character.image} alt="Aw jeez, it didn't load" />
                  <h2>Loading....</h2>
                  </div>
                <br />
                </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      console.log('modal closed ');
                      close();
                    }}
                  >
                    close modal
                  </button>
                </div>
              </div>
            )}
          </Popup>
        )
    }

    else{
        return (
            <Popup
            trigger={<button className="button"> {buttonName ? buttonName :" View Profile"} </button>}
            modal
            nested
            >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header">{character.name} </div>
                <div className="content">
                <div className="modal-image">
                <img src={character.image} alt="Aw jeez, it didn't load" />
                </div>
                <h3>Character Information</h3>
                  <p><b>Name:</b> {character.name}</p>
                  <p><b>Gender:</b> {character.gender}</p>
                  <p><b>Species:</b> {character.species}</p>
                  <p><b>Type:</b> {character.type ? character.type : "--"}</p>
                  <p><b>Status:</b> {character.status}</p>
                <br />
                <h3>Origin</h3>
                {console.log(locationAndOrigin.origin?.name)}
                  <p><b>Name:</b> {locationAndOrigin?.origin?.name ? locationAndOrigin['origin']['name'] : character.location?.name || "unknown"}</p>
                  <p><b>dimension:</b> {locationAndOrigin?.['origin']?.['dimension'] ? locationAndOrigin['origin']['dimension'] :"Unknown"}</p>
                  <p><b>Number of Known residents:</b> {locationAndOrigin?.['origin']?.['residents'] ? locationAndOrigin['origin']['residents'] :"Unknown"}</p>
                  <p><b>Type:</b> {locationAndOrigin?.['origin']?.['type'] ? locationAndOrigin['origin']['type'] :"Unknown"}</p>
                <br />
                <h3>Current Location</h3>
                  <p><b>Name:</b> {locationAndOrigin?.['origin']?.['name'] ? locationAndOrigin['origin']['name'] :"Unknown"}</p>
                  <p><b>dimension:</b> {locationAndOrigin?.['origin']?.['dimension'] ? locationAndOrigin['origin']['dimension'] :"Unknown"}</p>
                  <p><b>Number of residents:</b> {locationAndOrigin?.['origin']?.['residents'] ? locationAndOrigin['origin']['residents'] :"Unknown"}</p>
                  <p><b>Type:</b> {locationAndOrigin?.['origin']?.['type'] ? locationAndOrigin['origin']['type'] :"Unknown"}</p>
                <br />
                <h3>Episodes they appeared In</h3>
                {
                  episodesAppearedIn.map((episode)=>{
                    return <p><b>episode:</b> {episode.name}</p>
                  })
                }
                <br />
                </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      console.log('modal closed ');
                      close();
                    }}
                  >
                    close modal
                  </button>
                </div>
              </div>
            )}
          </Popup>
          );
    }
}