import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, store } from '../../firebase.config'
import Card from '../Style/Card'
import firebase from 'firebase/app'
import Title from '../Application/Title'
import Center from '../Style/Center'
import { useQuery } from '../../Tools/OwnHooks/UseQuery'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmailMessage, setErrorEmailMessage] = useState<any>(null)
    const [errorPasswordMessage, setErrorPasswordMessage] = useState<any>(null)
    const [errorRegisteredMessage, setErrorRegisteredMessage] = useState<any>(null)
    const history = useHistory()
    const query = useQuery()

    const redirect = () => {
        const qs = query.get('redirect_to') || '/'
        history.push(qs)
    }

    const register = (e: any) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, 
            password)
        .then(r => {
            store.collection('log').add({
                user_id: r.user!.uid,
                created_at: new Date(),
                type: 'REGISTER'
            })
            .then(r => {})
            .catch(e => console.log(e))
            redirect()
        })
        .catch(reason => {
            if(reason.code == 'auth/invalid-email'){
                setErrorEmailMessage('El formato de email es incorrecto')
            }
            if(reason.code == 'auth/weak-password'){
                setErrorPasswordMessage('La contraseña debe contener al menos 6 caracteres')
            }
            if(reason.code == 'auth/email-already-in-use'){
                setErrorRegisteredMessage('El email ya esta registrado en el sistema, debe ingresar')
            }
        })
    }

    const login = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(r => { 
            store.collection('log').add({
                user_id: r.user!.uid,
                created_at: new Date(),
                type: 'LOGIN'
            })
            .then(r => console.log(r))
            .catch(e => console.log(e))
            redirect()
        })
        .catch(e => {
            if(e.code == 'auth/wrong-password'){
                setErrorPasswordMessage('La contraseña es incorrecta')
            }
            if(e.code == 'auth/user-not-found'){
                setErrorPasswordMessage('El correo no existe, debe registrarse')
            }
        })
    }

    const loginWithGoogle = () => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(r => { 
            store.collection('log').add({
                user_id: r.user!.uid,
                created_at: new Date(),
                type: 'LOGIN'
            })
            .then(r => console.log('log registered'))
            .catch(e => console.log(e))
            redirect()
        })
    }

    return (
        <Center>
            <Card classes="mt-8 h-auto w-96">
                <Title title="Login"/>
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
                <div className="flex justify-center mb-4">
                    <button className="btn bg-secondary-dark hover:bg-primary" 
                    onClick={login}>Acceder</button>
                </div>
                <div className="flex justify-center">
                    <button className="btn bg-secondary-dark hover:bg-primary" 
                    onClick={loginWithGoogle}>Acceder con Google</button>
                </div>
            </Card>
        </Center>
    )
}

export default Login

