import React,{ useState } from 'react'
import Profile from './profile';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function SearchBox({charactersArray}) {

  const [characterData,setCharacterData] = useState({})
  
  const items = [];

  for(let i =0; i<charactersArray.length;i++){
    items.push({id:i,name:charactersArray[i].name,characterData:charactersArray[i]});
  }


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }


  const handleOnFocus = () => {
    console.log('Focused')
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
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={(data)=>{setCharacterData(data['characterData']);}}
              onFocus={handleOnFocus}
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

