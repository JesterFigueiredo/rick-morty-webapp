import Container from 'react-bootstrap/Container';
import React from 'react'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardComponent from './card';
import './componentStyles.css'
import axios from 'axios';

function Grid({charactersData}) {


  return (
  <div class="container">
      {charactersData.map((character,index)=>{
        return <div className='flex-item' key={index}>
          <CardComponent character={character}/>
        </div>
      })}
</div>
  );
}

export default Grid;