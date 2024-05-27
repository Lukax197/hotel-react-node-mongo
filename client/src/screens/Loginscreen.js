import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

function Loginscreen() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function Login() {
    const user = {
        email,
        pwd
    }

    try {
        setLoading(true)
        const result = await axios.post('http://localhost:3001/api/users/login', user)
        setLoading(false)

        localStorage.setItem('currentUser', JSON.stringify(result.data))
        window.location.href='/home'
    } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
    }
  }

  return (
    <div style={{marginBottom: '44.7vh'}}>
        {loading && (<Loader/>)}
        <div className='row justify-content-center mt-5'>
            <div className='col-md-5 mt-5'>
                {error && (<Error message='Podano niepoprawne dane logowania'/>)}
                <div className='bs'>
                    <h2>Logowanie</h2>
                    <input type="email" className='form-control' placeholder='Adres e-mail' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type="password" className='form-control' placeholder='Hasło' value={pwd} onChange={(e) => {setPwd(e.target.value)}}/>
                    <button className='btn btn-primary mt-3' onClick={Login}>Zaloguj się</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loginscreen