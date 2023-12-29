import Card from 'react-bootstrap/Card';
import Profile from './profile';

function CardComponent({character}) {

  return (
    <>
    <Card style={{ width: '18rem', border:'solid', overflow:'hidden'}}>
      <Card.Img variant="top" src={character.image}/>
        <Card.Body style={{ padding:'10px'}}>
        <Card.Title>{character.name}</Card.Title>
      </Card.Body>
    </Card>

    <Profile character={character}/>
    </>
  );
  
}

export default CardComponent;