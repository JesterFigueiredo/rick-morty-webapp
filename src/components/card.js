import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Profile from './profile';
import { useState } from 'react';

function CardComponent({character}) {
  

  const [showProfile, setShowProfile] = useState(false);


  return (
    <>
    <Card style={{ width: '18rem', border:'solid', overflow:'hidden'}}>
      <Card.Img variant="top" src={character.image}/>
      <Card.Body style={{ padding:'10px'}}>
        <Card.Title>{character.name}</Card.Title>
        {/* <Button  variant="success" onClick={()=>{setShowProfile(true)}}>View Profile</Button> */}
      </Card.Body>
    </Card>
    <Profile 
    show={showProfile}
    onHide={() => setShowProfile(false)}
    character={character}
    setShowProfile={setShowProfile}
    />
    </>
  );
}

export default CardComponent;