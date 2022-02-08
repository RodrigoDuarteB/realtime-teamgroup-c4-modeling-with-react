import React, { Fragment } from 'react'
import Title from '../Application/Title'
import Auth from '../Auth/Auth'
import Card from '../Style/Card'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import Center from '../Style/Center'
import { Link } from 'react-router-dom'

const Home = () => {
    const [user] = useAuthState(auth)

    return (
        <Fragment>
            <Title title="Home"/>
            <Auth>
                <Center classes="my-3">
                    <Card classes="w-auto h-auto">
                        <h1>Bienvenido {user?.displayName ? user?.displayName : user?.email}!</h1>
                    </Card>
                </Center>
            </Auth>
            <Center classes="my-3">
                <Card classes="w-auto h-auto">
                    <div className="flex relative gradient-images">
                        <img src="files/images/contextC4.png" alt="Image not Found" className="object-cover opacity-50" width="700" height="700"/>
                        <img src="files/images/development-group.jpg" alt="Image not Found" className="object-cover opacity-50" width="700" height="700"/>
                        <div className="center-image-text">
                            <p className="text-4xl text-center font-semibold opacity-100">Modela diagramas C4 en tiempo real con tu equipo de trabajo!</p>
                            <Center classes="mt-6">
                                <Link to={user ? `/meets/me/${user.uid}` : '/login'} className="btn bg-primary-dark text-secondary text-2xl hover:bg-secondary hover:text-gray-500 font-semibold">Empieza Ahora</Link>
                            </Center>
                        </div>
                    </div>
                </Card>
            </Center>
        </Fragment>
    )
}

export default Home
