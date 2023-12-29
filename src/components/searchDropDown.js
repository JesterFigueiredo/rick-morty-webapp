import React,{useState} from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import filters from './utils/filters';
import './componentStyles.css'



export default function SearchDropDown({charactersData,setFilterOptions}){

    const {locations,statuses,episodes,genders,species,types} = filters(charactersData);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    
    const [selectedOption, setSelectedOption] = useState({
        'status':'', 
        'location':'', 
        'episode':'', 
        'gender':'', 
        'species':'', 
        'type':''
    });


    function handleSelectChange(selectedValue){

        setSelectedOption({...selectedOption,[selectedValue.type]:selectedValue.value});
        
    }

    return(
        <div style={{margin:'20px'}}>
            <label>location</label>
            <Select onChange={handleSelectChange}  options={locations}/>
            <br />
            <label>status</label>
            <Select onChange={handleSelectChange} options={statuses}/>
            <br />
            <label>episode</label>
            <Select onChange={handleSelectChange}  options={episodes}/>
            <br />
            <label>gender</label>
            <Select onChange={handleSelectChange}  options={genders}/>
            <br />
            <label>species</label>
            <Select onChange={handleSelectChange} options={species}/>
            <br />
            <label>type</label>
            <Select onChange={handleSelectChange} value={selectedOption.value} options={types}/>
            <Button className='button' onClick={()=>{setFilterOptions(selectedOption)}} variant="primary">Filter</Button>

        </div>
    )    
}


  
