import { ReactDiagram } from 'gojs-react'
import React, { useEffect, useState } from 'react'
import * as go from 'gojs';
import Palette from './Palette';
import { useParams } from 'react-router';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { getDiagramLinks, getDiagramNodes, getMeet } from '../../services/MeetService';
import Loading from '../Style/Loading';
import { Meet } from '../models/Meet'
import { initDiagram } from './GoJs';
import { auth } from '../../firebase.config';

const Diagram = () => {

  const params: {id: string} = useParams()
  const [nodes] = useCollectionData(getMeet(params.id).collection('nodes'), {
    idField: 'id'
  })
  const [links] = useCollectionData(getMeet(params.id).collection('links'), {
    idField: 'id'
  })

  const handleChanges = async (e: go.IncrementalData) => {
    console.log(e)

    let insertedNode = false
    let insertedLink = false

    if(e.insertedNodeKeys){
      insertedNode = true
    }

    if(e.modifiedNodeData){
      const modified = e.modifiedNodeData[0]
      if(insertedNode){
        if(auth.currentUser!.uid == modified.created_by){
          /* getDiagramNodes(params.id).add({
            text: modified.text,
            color: modified.color,
            loc: modified.loc,
            created_by: auth.currentUser ? auth.currentUser.uid : 'unknown',
            last_modify_by: auth.currentUser ? auth.currentUser.uid : 'unknown'
          }).then(_ => console.log('node inserted')) */
        }
      }else{
        getDiagramNodes(params.id).doc(modified.key)
        .update({
          text: modified.text,
          color: modified.color,
          loc: modified.loc,
          last_modify_by: auth.currentUser ? auth.currentUser.uid : 'unknown'
        }).then(_ => console.log('node modified'))
      }
    }

    if(e.removedNodeKeys){
      const removed = e.removedNodeKeys[0]
      getDiagramNodes(params.id).doc(removed?.toString())
      .delete().then(_ => console.log('node deleted'))
    }

    if(e.insertedLinkKeys){
      insertedLink = true
    }

    if(e.modifiedLinkData){
      const linkModified = e.modifiedLinkData[0]
      if(insertedLink){
        /* getDiagramLinks(params.id).add({
          from: linkModified.from,
          to: linkModified.to,
          text: 'descripción',
          created_by: auth.currentUser ? auth.currentUser.uid : 'unknown',
          last_modify_by: auth.currentUser ? auth.currentUser.uid : 'unknown',
        }).then(_ => console.log('link inserted')) */
      }else{
        getDiagramLinks(params.id).doc(linkModified.key)
        .update({
          from: linkModified.from,
          to: linkModified.to,
          text: linkModified.text,
          last_modify_by: auth.currentUser ? auth.currentUser.uid : 'unknown'
        }).then(_ => console.log('link modified'))
      }
    }

    if(e.removedLinkKeys){
      const removed = e.removedLinkKeys[0]
      getDiagramLinks(params.id).doc(removed?.toString())
      .delete().then(_ => console.log('link deleted'))
    }
  }
  

  return nodes && links ? (
    <div className="flex h-screen">
      <Palette />
      <ReactDiagram 
        initDiagram={initDiagram}
        nodeDataArray={nodes ? nodes.map(node => {
          const another: go.ObjectData = {
            key: node.id,
            text: node.text,
            color: node.color,
            loc: node.loc,
            created_by: node.created_by,
            last_modify_by: node.last_modify_by,
          }
          return another
        }) : []}
        linkDataArray={links ? links.map(link => {
          const another: go.ObjectData = {
            key: link.id,
            from: link.from,
            to: link.to,
            text: link.text,
            created_by: link.created_by,
            last_modify_by: link.last_modify_by,
          }
          return another
        }): []}
        divClassName="w-full h-full"
        onModelChange={handleChanges}
      />
    </div>
  ) : <Loading />
}

export default Diagram
