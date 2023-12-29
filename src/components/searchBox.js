import React,{ useState } from 'react'
import Profile from './profile';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function SearchBox({charactersArray}) {

  const [characterData,setCharacterData] = useState({})
  
  const items = [];

  for(let i =0; i<charactersArray.length;i++){
    items.push({id:i,name:charactersArray[i].name,characterData:charactersArray[i]});
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }



  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
              items={items}
              onSelect={(data)=>{setCharacterData(data['characterData']);}}
              autoFocus
              formatResult={formatResult}
          />
          <Profile 
            character={characterData}
            buttonName={"Search"}
          />
        </div>
      </header>
    </div>
  )
}

