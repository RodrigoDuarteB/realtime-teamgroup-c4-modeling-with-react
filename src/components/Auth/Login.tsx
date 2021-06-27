import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase.config'
import Button from '../Style/Button'
import Card from '../Style/Card'
import Formfield from '../Style/Formfield'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailState = useSelector((state: any) => {
            console.log(state)
            return state.emailReducer.payload
        }
    )

    const passwordState = useSelector((state: any) => 
        state.emailReducer.payload
    )

    useEffect(() => {
        setEmail(emailState)
    }, [emailState])

    const login = (e: Event) => {
        e.preventDefault()
        try {
            auth.createUserWithEmailAndPassword(email, 
                password)
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <Card>
            <h2 className="flex justify-center text-lg text-gray-800 font-semibold mb-4">Login</h2>
            <Formfield id="email" type="text" label="Email o Usuario"/>
            <Formfield id="password" type="password" label="Contraseña"/>
            <div className="flex justify-center">
                <Button title="Acceder"/>
            </div>
            {email}
            {password}
        </Card>
    )
}

export default Login
