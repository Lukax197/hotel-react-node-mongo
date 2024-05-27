import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import { DatePicker, Space } from 'antd'
import { useAsyncError } from 'react-router-dom'
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [duplicateRooms, setDuplicateRooms] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [type, setType] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/rooms/getallrooms');
        setRooms(response.data);
        setDuplicateRooms(response.data)
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    if(dates !== null) {
      setFromDate(moment(dates[0].$d).format('DD-MM-YYYY'))
      setToDate(moment(dates[1].$d).format('DD-MM-YYYY'))

      var tempRooms = []
      var availability = false

      for (const room of duplicateRooms) {
        availability = false
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            var compareDate1 = moment(dates[0].$d, "DD-MM-YYYY");
            var compareDate2 = moment(dates[1].$d, "DD-MM-YYYY");
            var startDate = moment(booking.fromDate, "DD-MM-YYYY").add(1, 'day');
            var endDate = moment(booking.toDate, "DD-MM-YYYY").subtract(1, 'day');
            // console.log(moment(startDate).format("DD-MM-YYYY") + " : " + moment(endDate).format("DD-MM-YYYY"))
            // console.log(compareDate1.isBetween(startDate, endDate))
            // console.log(compareDate2.isBetween(startDate, endDate))
            if (
              !compareDate1.isBetween(startDate, endDate) &&
              !compareDate2.isBetween(startDate, endDate)
            ) {
                availability = true
            }
          }
        }

        if(availability == true || room.currentbookings.length == 0) {
          tempRooms.push(room)
        }
      }
      setRooms(tempRooms)
    }
    else {
      setRooms(duplicateRooms)
    }
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()))
    setRooms(tempRooms)
  }

  function filterByType(e) {
    setType(e)

    if(e !== 'wszystkie') {
      const tempRooms = duplicateRooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setRooms(tempRooms)
    }
    else {
      console.log("wszystkie")
      setRooms(duplicateRooms)
    }
  }

  return (
    <div className='container'>
      <div className='row mt-5 bs'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
        <div className='col-md-5'>
          <input 
            type="text" 
            className='form-control' 
            placeholder='Wyszukaj pokoje' 
            value={searchKey} 
            onChange={(e) => {setSearchKey(e.target.value)}}
            onKeyUp={filterBySearch} 
          />
        </div>
        <div className='col-md-3'>
          <select className='form-control' value={type} onChange={(e) => {filterByType(e.target.value)}}>
            <option value="wszystkie">Wszystkie</option>
            <option value="standard">Standard</option>
            <option value="suite">Suite</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (<Loader />) : (rooms.map(room => {
          return <div className='com-md-9 mt-3'>
            <Room room={room} fromDate={fromDate} toDate={toDate} />
          </div>
        }))}
      </div>
    </div>
  )
}

export default Homescreen