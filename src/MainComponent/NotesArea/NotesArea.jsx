import React from 'react'
import emptyimg from '../../assets/Empty_notes.png'
import Lockimg from '../../assets/lock.svg'
import styles from '../../Styles/NotesArea.module.css'
import TextBox from '../TextBox.jsx'
export default function NotesArea({group,onNoteStore,groupNotes}) {
  return (
    
      <div className={styles.NotesArea}>
      {group ? (
        <TextBox group={group} onNoteStore={onNoteStore} groupNotes={groupNotes} />
      ) : (
        <>
          <img style={{height:"33vh", width:"34vw" }} src={emptyimg} alt="emptyimage"/>
          <h1 style={{letterSpacing:"2px"}}>Pocket Notes</h1>
          <p style={{fontWeight:"lighter", color:"#292929", lineHeight:"3.5vh", maxWidth:"460px"}}>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <h5 style={{display:"flex",alignItems:"end", justifyContent:"flex-end", fontWeight:"lighter", color:"#292929", bottom:"20px", marginBottom:"10px", position: "absolute"}}>
            <img style={{height:"2.4vh", width:"2.4vw"}} src={Lockimg} alt="Lockimage"/>
            end-to-end encrypted
          </h5>
        </>
      )}
    </div> 
      
   
  )
}

