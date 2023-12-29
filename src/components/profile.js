import React,{useState,useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import './componentStyles.css';
import getCharacterData from './utils/getCharacterData';



export default function Profile({character,show,onHide,setShowProfile}){

    const [locationAndOrigin, setLocationAndOrigin] = useState({});
    const [loading, setLoading] = useState(false);

    // getCharacterData(character).then((data)=>{
    //     setLocationAndOrigin(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })

    useEffect(()=>{
        getCharacterData(character).then((data)=>{
            setLocationAndOrigin(data)
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
        // console.log(locationAndOrigin?.origin?.name);
        return (
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
                </div>
                <h3>Character Information</h3>
                <p><b>Name:</b> {character.name}</p>
                <p><b>Gender:</b> {character.gender}</p>
                <p><b>Species:</b> {character.species}</p>
                <p><b>Type:</b> {character.type ? character.type : "--"}</p>
                <p><b>Status:</b> {character.status}</p>
                <br />
                <h3>Origin</h3>
                <p><b>Name:</b> {locationAndOrigin?.origin?.name ? locationAndOrigin['origin']['name'] :"Unknown"}</p>
                <p><b>dimension:</b> {locationAndOrigin?.['origin']?.['dimension'] ? locationAndOrigin['origin']['dimension'] :"Unknown"}</p>
                <p><b>Number of residents:</b> {locationAndOrigin?.['origin']?.['residents'] ? locationAndOrigin['origin']['residents'] :"Unknown"}</p>
                <p><b>Type:</b> {locationAndOrigin?.['origin']?.['type'] ? locationAndOrigin['origin']['type'] :"Unknown"}</p>
                <br />
                <h3>Current Location</h3>
                <p><b>Name:</b> {locationAndOrigin?.['origin']?.['name'] ? locationAndOrigin['origin']['name'] :"Unknown"}</p>
                <p><b>dimension:</b> {locationAndOrigin?.['origin']?.['dimension'] ? locationAndOrigin['origin']['dimension'] :"Unknown"}</p>
                <p><b>Number of residents:</b> {locationAndOrigin?.['origin']?.['residents'] ? locationAndOrigin['origin']['residents'] :"Unknown"}</p>
                <p><b>Type:</b> {locationAndOrigin?.['origin']?.['type'] ? locationAndOrigin['origin']['type'] :"Unknown"}</p>
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