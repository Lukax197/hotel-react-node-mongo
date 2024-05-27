import React from 'react'
import logo from '../images/logo.png'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    function Logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/home">
                <img src={logo} class="logo-img" />
                Hotel MAXIMUS
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" style={{color: 'white'}}></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto custom-mr">
                    {user ? (
                    <>
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                <i class="fa fa-user" aria-hidden="true" style={{marginRight: '10px'}}></i>
                                {user.name}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-lg-end">
                                <li><a class="dropdown-item" href="/profile">Twoje konto</a></li>
                                <li><a class="dropdown-item" href="/" onClick={Logout}>Wyloguj się</a></li>
                            </ul>
                        </div>
                    </>
                    ) : (
                    <>
                        <li class="nav-item active">
                            <a class="nav-link" href="/register">Rejestracja</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Logowanie</a>
                        </li>
                    </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar