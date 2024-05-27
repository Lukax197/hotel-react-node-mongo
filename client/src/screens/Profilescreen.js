import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'
import { Divider, Space, Tag } from 'antd';


function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if(!user) {
            window.location.href='/login'
        }
    })

    const items = [
        {
            key: '1',
            label: 'Profil',
            children: (
                <div  style={{marginBottom: '58.9vh'}}>
                    <h1>Dane konta</h1>
                    <br />
                    <h1>Nazwa użytkownika: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                </div>
              )
        },
        {
            key: '2',
            label: 'Rezerwacje',
            children: (
                <MyBookings />
              ),
        }
    ];

    return (
        <div className='ml-3 mt-3 m-3'>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default Profilescreen


export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const bookings = await axios.post('http://localhost:3001/api/bookings/getbookingsbyuserid/', {userId: user._id})
                setBookings(bookings.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(true)
                console.log(error)
            }
          };
      
          fetchData();
    }, [])

    async function CancelBooking(bookingId, roomId) {
        try {
            setLoading(true)
            const result = await axios.post('http://localhost:3001/api/bookings/cancelbooking/', {bookingId, roomId})
            setLoading(false)
            Swal.fire('Potwierdzenie', 'Twoja rezerwacja została pomyślnie anulowana.', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            setLoading(false)
            setError(true)
            Swal.fire("Błąd", "Coś poszło nie tak. Spróbuj ponownie.", 'error')
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'> 
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>ID rezerwacji:</b> {booking._id}</p>
                            <p><b>Data zameldowania:</b> {booking.fromDate}</p>
                            <p><b>Data wymeldowania:</b> {booking.toDate}</p>
                            <p><b>Koszt pobytu:</b> {booking.totalAmount} zł</p>
                            <p><b>Status:</b> {booking.status == 'Zarezerwowane' ? (<Tag color="green">Zarezerwowane</Tag>) : (<Tag color="red">Zamknięta</Tag>)}</p>
                            {booking.status !== 'Zamknięte' && (<div style={{textAlign: 'right'}}>
                                <button className='btn btn-danger' onClick={() => {CancelBooking(booking._id, booking.roomId)}}>Anuluj rezerwację</button>
                            </div>)}
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}