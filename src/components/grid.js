import React from 'react'; 
import CardComponent from './card';
import './componentStyles.css'


function Grid({charactersData}) {

  if(charactersData.length){
    return(
      <div class="container">
      {charactersData.map((character,index)=>{
        return <div className='flex-item' key={index}>
          <CardComponent character={character}/>
        </div>
      })}
    </div>
    )
  }
  else{
    return(
      <h1>Aw, jeez man, No results for the applied filters</h1>
    )
  }

}

export default Grid;