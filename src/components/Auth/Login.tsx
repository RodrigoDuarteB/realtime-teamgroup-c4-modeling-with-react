import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { auth } from '../../firebase.config'
import Button from '../Style/Button'
import Card from '../Style/Card'
import Formfield from '../Style/Formfield'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmailMessage, setErrorEmailMessage] = useState<any>(null)
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<any>(null)
    const [errorRegisteredMessage, setErrorRegisteredMessage] = useState<any>(null)
    const history = useHistory()

    const register = (e: any) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, 
            password)
        .then(r => {
            history.push('/')
        })
        .catch(reason => {
            if(reason.code == 'auth/invalid-email'){
                setErrorEmailMessage('El formato de email es incorrecto')
            }
            if(reason.code == 'auth/weak-password'){
                setErrorPasswordMessage('La contraseña debe contener al menos 6 caracteres')
            }
            if(reason.code == 'auth/email-already-in-use'){
                setErrorRegisteredMessage('El email ya esta esta registrado en el sistema')
            }
        })
    }

    const login = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(r => history.push('/'))
        .catch(e => {
            if(e.code == 'auth/wrong-password'){
                setErrorPasswordMessage('La contraseña es incorrecta')
            }
        })
    }

    return (
        <Card>
            <h2 className="flex justify-center text-lg text-gray-800 font-semibold mb-4">Login</h2>
            <form onSubmit={ register }>
                <ul>
                    {
                        errorEmailMessage ? (
                            <li className='text-sm text-red-500'>{ errorEmailMessage }</li>
                        ) : ''
                    }
                    {
                        errorPasswordMessage ? (
                            <li className='text-sm text-red-500'>{ errorPasswordMessage }</li>
                        ) : ''
                    }
                    {
                        errorRegisteredMessage ? (
                            <li className='text-sm text-red-500'>{ errorRegisteredMessage }</li>
                        ) : ''
                    }
                </ul>
                <div className='grid grid-rows-2 mt-2 mb-4'>
                    <label htmlFor='email'>Email o Usuario</label>
                    <div className="border-b border-primary">
                        <input type='text' className="input" 
                        placeholder='Introduce tu email o usuario' id='email' onChange={e => {
                            setEmail(e.target.value)
                            setErrorEmailMessage(null)
                            setErrorRegisteredMessage(null)
                            }}
                          />
                    </div>
                </div>
                <div className='grid grid-rows-2 mt-2 mb-4'>
                    <label htmlFor='password'>Contraseña</label>
                    <div className="border-b border-primary">
                        <input type='password' className="input" 
                        placeholder='Introduce contraseña' id='password' 
                        onChange={e => { 
                            setPassword(e.target.value)
                            setErrorPasswordMessage(null)
                            setErrorRegisteredMessage(null)
                        }}
                        />
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <button className="btn bg-secondary-dark hover:bg-primary" type='submit'>Registrarse</button>
                </div>
            </form>
            <div className="flex justify-center">
                <button className="btn bg-secondary-dark hover:bg-primary" 
                onClick={login}>Acceder</button>
            </div>
        </Card>
    )
}

export default Login
