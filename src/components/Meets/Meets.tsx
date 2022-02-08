import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../firebase'
import Card from '../Style/Card'
import Center from '../Style/Center'
import Meet from './Meet'
import Title from '../Application/Title'
import { auth } from '../../firebase'
import NewMeet from './NewMeet'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loading from '../Style/Loading'

const Meets = () => {
    const params: any = useParams()
    const [meets] = useCollectionData(store.collection('meets').
    where('host_id', '==', params.user_id), {idField: 'id'})  

    const [collaborated] = useCollectionData(store.collection('meets').
    where('host_id', '==', params.user_id), {idField: 'id'})

    return meets ? (
            <Center>
                <Card classes="h-auto w-96 mt-4">
                    <Title title={`Meets - ${auth.currentUser?.email}`}/>
                    <h2 className="text-center font-semibold text-lg">Mis Diagramas</h2>
                    {
                        meets && meets.map(meet => 
                            <Meet data={meet} key={meet.id} />
                        ) 
                    }
                    <hr className="mt-4"/>
                    <NewMeet />
                </Card>
            </Center> 
    ) : <Loading />
}

export default Meets
