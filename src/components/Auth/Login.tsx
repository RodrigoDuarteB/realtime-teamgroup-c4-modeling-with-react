import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase.config'
import Button from '../Style/Button'
import Card from '../Style/Card'
import Formfield from '../Style/Formfield'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailState = useSelector((state: any) => state.email)

    const login = (e: Event) => {
        e.preventDefault()
        try {
            auth.createUserWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <Card>
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
