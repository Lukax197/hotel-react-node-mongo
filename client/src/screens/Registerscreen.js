import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'

function Registerscreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwdconf, setPwdConf] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  async function Register() {
    if(pwd == pwdconf) {
        const user = {
            name,
            email,
            pwd
        }
        
        try {
            setLoading(true)
            const result = await axios.post('http://localhost:3001/api/users/register', user)
            setLoading(false)
            setSuccess(true)

            setName('')
            setEmail('')
            setPwd('')
            setPwdConf('')

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }
    else {
        alert('Hasła nie są takie same!')
    }
  }

  return (
    <div style={{marginBottom: '35.2vh'}}>
        {loading && (<Loader/>)}
        {loading && (<Error message='Coś poszło nie tak, proszę spróbuj jeszcze raz.'/>)}
        <div className='row justify-content-center mt-5'>
            <div className='col-md-5 mt-5'>
            {success && (<Success message='Rejestracja przebiegła pomyślnie!'/>)}
                <div className='bs'>
                    <h2>Rejestracja</h2>
                    <input type="text" className='form-control' placeholder='Nazwa użytkownika' value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <input type="email" className='form-control' placeholder='Adres e-mail' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type="password" className='form-control' placeholder='Hasło' value={pwd} onChange={(e) => {setPwd(e.target.value)}}/>
                    <input type="password" className='form-control' placeholder='Powtórz hasło' value={pwdconf} onChange={(e) => {setPwdConf(e.target.value)}}/>
                    <button className='btn btn-primary mt-3' onClick={Register}>Zarejestruj się</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registerscreen