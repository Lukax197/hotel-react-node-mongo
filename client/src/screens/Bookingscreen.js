import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import Swal from 'sweetalert2'

function Bookingscreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [room, setRoom] = useState({})
  const totalDays = moment.duration(moment(toDate, 'DD-MM-YYYY').diff(moment(fromDate, 'DD-MM-YYYY'))).asDays()
  const [totalAmount, setTotalAmount] = useState() 

  useEffect(() => {
    if(!localStorage.getItem('currentUser')) {
      window.location.href='/login'
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post('http://localhost:3001/api/rooms/getroombyid', { roomid: roomid })).data
        setTotalAmount(totalDays * data.rentperday)
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [roomid]);

  async function BookRoom() {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays
    }

    try {
      setLoading(true)
      const result = await axios.post('http://localhost:3001/api/bookings/bookroom', bookingDetails)
      setLoading(false)
      Swal.fire("Potwierdzenie", "Twój pokój został zarezerwowany pomyślnie!", 'success').then(result => {
        window.location.href = '/profile'
      })
    } catch (error) {
      setLoading(false)
      Swal.fire("Błąd", "Coś poszło nie tak. Spróbuj ponownie.", 'error')
    }
  }

  return (
    <div className='m-5'>
        {loading ? (<h1><Loader/></h1>) : room ? (<div> 
          <div className='row justify-content-center mt-5 bs' style={{marginBottom: '23.5vh'}}> 
            <div className='col-md-6'> 
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className='bigimg' />
            </div>
            <div className='col-md-6'>
              <div style={{textAlign: 'right'}}>
                <h1>Szczegóły rezerwacji</h1>
                <hr />
                <b>
                  <p>Nazwa użytkownika: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>Od: {fromDate}</p>
                  <p>Do: {toDate}</p>
                  <p>Maks. ilość osób: {room.maxcount}</p>
                </b>
              </div>
              <div style={{textAlign: 'right', marginTop: '40px'}}>
                <b>
                  <h1>Cena</h1>
                  <hr />
                  <p>Ilość dni: {totalDays}</p>
                  <p>Cena za jedną dobę: {room.rentperday} zł</p>
                  <p>Do zapłaty: {totalAmount} zł</p>
                </b>
              </div>
              <div style={{float: 'right'}}>
                <button className='btn btn-primary' onClick={BookRoom}>Zarezerwuj</button>
              </div>
            </div>
          </div>
        </div>) : (<Error message='Coś poszło nie tak, proszę spróbuj jeszcze raz.'/>)}
    </div>
  )
}

export default Bookingscreen