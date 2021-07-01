import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../firebase.config'
import Card from '../Style/Card'
import Center from '../Style/Center'
import Meet from './Meet'
import Title from '../Application/Title'
import { auth } from '../../firebase.config'
import NewMeet from './NewMeet'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loading from '../Style/Loading'

const Meets = () => {
    const params: any = useParams()
    const [meets] = useCollectionData(store.collection('meets').
    where('host_id', '==', params.user_id), {idField: 'id'})  

    const [collaborated] = useCollectionData(store.collection('meets').
    where('host_id', '==', params.user_id), {idField: 'id'})

    useEffect(() => {
        if(meets) {
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
        /* store.collection('meets').doc("5Lj3NHPdBJFnMxpfzl5J")
        .get()
        .then(doc => {
            if(doc.exists){
                console.log("Document data:", doc.data())
            }else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        }); */
    }, [meets])

    return meets ? (
            <Center>
                <Card classes="h-auto w-96 mt-4">
                    <Title title={`Meets - ${auth.currentUser?.email}`}/>
                    <h2 className="text-center font-semibold text-lg">Mis Diagramas</h2>
                    {
                        meets && meets.map(meet => 
                            <Meet data={meet}/>
                        ) 
                    }
                    <hr className="mt-4"/>
                    <NewMeet />
                </Card>
            </Center> 
    ) : <Loading />
}

export default Meets
