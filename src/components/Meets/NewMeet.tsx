import React, { Fragment, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { store } from '../../firebase'
import Center from '../Style/Center'

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
                <h2 className="text-center font-semibold text-lg">Iniciar nuevo diagrama</h2>
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

export default NewMeet