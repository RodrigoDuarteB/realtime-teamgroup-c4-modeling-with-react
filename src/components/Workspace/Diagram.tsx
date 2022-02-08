import { ReactDiagram } from 'gojs-react'
import React, { useEffect, useState } from 'react'
import * as go from 'gojs';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getDiagramLinks, getDiagramNodes, getMeet } from '../../services/MeetService';
import Loading from '../Style/Loading';
import { initDiagram } from './GoJs';
import { auth } from '../../firebase';
import Palette from './Palette';

const Diagram = ({ id }: {id: string}) => {

  const [nodes] = useCollectionData(getMeet(id).collection('nodes'), {
    idField: 'id'
  })
  const [links] = useCollectionData(getMeet(id).collection('links'), {
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
        /* getDiagramNodes(id).add({
          category: modified.category ? modified.category : '',
          text: modified.text,
          color: modified.color ? modified.color : 'lightblue',
          loc: modified.loc,
          created_by: auth.currentUser ? auth.currentUser.uid : 'unknown',
          last_modify_by: auth.currentUser ? auth.currentUser.uid : 'unknown'
        }).then(_ => console.log('node inserted')) */
      }else{
        getDiagramNodes(id).doc(modified.key)
        .update({
          text: modified.text,
          loc: modified.loc,
          width: modified.width,
          height: modified.height,
          last_modify_by: auth.currentUser ? auth.currentUser.uid : 'unknown'
        }).then(_ => console.log('node modified'))
      }
    }

    if(e.removedNodeKeys){
      const removed = e.removedNodeKeys[0]
      getDiagramNodes(id).doc(removed?.toString())
      .delete().then(_ => console.log('node deleted'))
    }

    if(e.insertedLinkKeys){
      insertedLink = true
    }

    if(e.modifiedLinkData){
      const linkModified: go.ObjectData = e.modifiedLinkData[0]
      if(insertedLink){
        /* getDiagramLinks(id).add({
          from: linkModified.from,
          to: linkModified.to,
          text: 'descripción',
          created_by: auth.currentUser ? auth.currentUser.uid : 'unknown',
          last_modify_by: auth.currentUser ? auth.currentUser.uid : 'unknown',
        }).then(_ => console.log('link inserted')) /*/
      }else{
        getDiagramLinks(id).doc(linkModified.key)
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
      getDiagramLinks(id).doc(removed?.toString())
      .delete().then(_ => console.log('link deleted'))
    }
  }
  

  return nodes && links ? (
    <div className="h-screen">
      <Palette />
      <ReactDiagram 
        initDiagram={initDiagram}
        nodeDataArray={nodes ? nodes.map(node => {
          const another: go.ObjectData = {
            category: node.category ? node.category : '',
            key: node.id,
            text: node.text,
            color: node.color,
            loc: node.loc,
            width: node.width,
            height: node.height,
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
