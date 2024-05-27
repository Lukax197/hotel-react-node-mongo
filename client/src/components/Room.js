import React, {useState} from 'react'
import {Button, Modal, Carousel} from 'react-bootstrap';
import {Link} from 'react-router-dom'

function Room({room, fromDate, toDate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='row bs'>
        <div className='col-md-4'>
            <img src={room.imageurls[0]} className='smallimg' />
        </div>
        <div className='col-md-7 text-left'>
            <h1>{room.name}</h1>
            <div className='room-main-desc'>
                <p>Ilość osób (maks): {room.maxcount} </p>
                <p>Numer telefonu: {room.phonenumber}</p>
                <p>Typ: {room.type}</p> 
            </div>
            <div style={{float: 'right'}}>
                {(fromDate && toDate) && (
                    <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                        <button className='btn btn-primary m-2'>Zarezerwuj teraz</button>
                    </Link>
                )}
                <button className='btn btn-primary' onClick={handleShow}>Szczegóły</button>
            </div>
        </div>

        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header>
            <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {room.imageurls.map(url => {
                        return <Carousel.Item>
                            <img className='d block w-100 bigimg' src={url}/>
                        </Carousel.Item>
                    })}
                    
                </Carousel>
                <div className='carousel-description'>
                    <h1>Opis:</h1>
                    <p>{room.description}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Zamknij
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Room