import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { store } from '../../firebase.config'
import Card from '../Style/Card'
import Center from '../Style/Center'
import Meet from './Meet'
import Title from '../Application/Title'
import { auth } from '../../firebase.config'
import NewMeet from './NewMeet'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loading from '../Style/Loading'

const useOwn = () => {
    const [own, setOwn] = useState<any[]>([])
    const params: any = useParams()

    useEffect(() => {
        /* store
        .collection('meets')
        .where('host_id', "==", params.user_id)
        .onSnapshot(snap => {
            const meets = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setOwn(meets)
        }) */
        /* store.collection('meets').where('host_id', "==", params.user_id).get()
        .then(res => {
            setOwn(res.docs.map(item => ({id: item.id, ...item.data()})))
        })
        .catch(e => console.log(e)) */
        
    }, [])

    return own
}

const Meets = () => {
    const params: any = useParams()
    const own = useOwn()
    const [ready, setReady] = useState(false)
    const meetsRef = store.collection('meets')
    const query = meetsRef.where('host_id', '==', params.user_id)
    const [meets] = useCollectionData(query, {idField: 'id'})    
    //const [own, setOwn] = useState<any[]>([])
    const [collaborated, setCollaborated] = useState<any[]>([])

    useEffect(() => {
        if(meets) {
            setReady(true)
            console.log(meets)
        }
        /* const getOwn = async () => {
            const { docs } = await store.collection('meets')
            .where('host_id', "==", params.user_id).get()
            setOwn(docs.map(item => ({ id: item.id, ...item.data() })))
            console.log(own)
        }
        getOwn() */

        /* store.collection('meets').where('host_id', "==", params.user_id).get()
        .then(res => {
            setOwn(res.docs.map(item => (item.data()))
        })
        .catch(e s=> console.log(e)) */
    }, [meets])

    return meets ? (
            <Center>
                <Card classes="h-auto w-96 mt-4">
                    <Title title={`Meets - ${auth.currentUser?.email}`}/>
                    <h2>Mis Diagramas</h2>
                    {
                        meets.map(meet => 
                            <Meet data={meet}/>
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
    ) : <Loading />
}

export default Meets
