import React from 'react'
import {Link} from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing'>
        <div className='col-md-12 text-center'>
            <h2 style={{color: 'white', fontSize: '130px'}}>Hotel MAXIMUS</h2>
            <h1 style={{color: 'white', marginTop: '80px'}}>U nas poczujesz się jak w domu.</h1>
            <Link to='/home'>
                <button className='btn landingbtn' style={{color: 'black'}}>Zarezerwuj pokój</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen