import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { store } from '../../firebase.config'
import Card from '../Style/Card'
import Center from '../Style/Center'
import Meet from './Meet'
import Title from '../Application/Title'
import { auth } from '../../firebase.config'

const Meets = () => {
    const params: any = useParams()
    const [own, setOwn] = useState<any[]>([])
    const [collaborated, setCollaborated] = useState<any[]>([])

    useEffect(() => {
        const getOwn = async () => {
            const { docs } = await store.collection('meets')
            .where('host_id', "==", params.user_id).get()
            setOwn(docs.map(item => ({ id: item.id, ...item.data() })))
            console.log(own)
        }
        getOwn()

        /* store.collection('meets').where('host_id', "==", params.user_id).get()
        .then(res => {
            setOwn(res.docs.map(item => item.data()))
        })
        .catch(e => console.log(e)) */
    }, [])

    return (
        <Center>
            <Card classes="h-auto w-96 mt-4">
                <Title title={`Meets - ${auth.currentUser?.email}`}/>
                <h2>Mis Diagramas</h2>
                {
                    own.length > 0 ? (
                        own.map((dgrm: any) => {
                            <Meet key={dgrm.id} data={dgrm}/>
                        })
                    ) : (
                        <p>No tienes diagramas propios</p>
                    )
                }
                <hr />
                <h2>Diagramas en los que participas</h2>
                {
                    collaborated.length > 0 ? (
                        collaborated.map((dgrm: any) => {
                            <Meet key={dgrm.id} data={dgrm}/> 
                        })
                    ) : (
                        <p>No tienes diagramas en los que colabores</p>
                    )
                }
                <hr />
                <NewMeet />
            </Card>
        </Center>
    )
}

const NewMeet = () => {
    const params: any = useParams()
    const [title, setTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory()

    const generate = (e: any) => {
        e.preventDefault()
        if(title != ''){
            store.collection('meets').add({
                host_id: params.user_id,
                title,
                created_at: new Date(),
            })
            .then(meet => {
                history.push(`/meets/${meet.id}`)
            })
            .catch(e => console.log(e))
        }else{
            setErrorMessage('El titulo del diagrama es obligatorio')
        }
    }
    
    return (
        <Fragment>
            <form onSubmit={e => generate(e)}>
                <h2>Iniciar nuevo diagrama</h2>
                {
                    errorMessage ? (
                        <li className='text-sm text-red-500 my-2'>{ errorMessage }</li>
                    ) : ''
                }
                <div className='grid grid-rows-2 mt-2 mb-4'>
                    <label htmlFor='title'>Título</label>
                    <div className="border-b border-primary">
                        <input type='text' className="input"
                            placeholder='Introduce el título del diagrama' id='title' onChange={e => {
                                setTitle(e.target.value)
                                setErrorMessage('')
                            }
                        }/>
                    </div>
                </div>
                <Center>
                    <button className="btn bg-primary-dark text-secondary-light hover:bg-primary hover:text-gray-500" type="submit">Nuevo Diagrama</button>
                </Center>
            </form>
        </Fragment>
    )
}

export default Meets
