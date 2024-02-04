import React from 'react'
import { Popup } from 'reactjs-popup';
import plus from '../../assets/plus.svg'
import List from '../List/List';
import ColorPicker from '../ColorPicker';
import styles from '../../Styles/NotesList.module.css'
export default function NotesList({ handleSubmit, formData, handleInputChange, handleColorSelect, handleListClick, groups}) {
  return (


<div className={styles.NotesList}>
            <h2 className={styles.pn}>Pocket Notes</h2>
            <Popup trigger={<div className={styles.plus} ><img src = {plus} alt = "plus"/></div>} modal >
              
  {(close) => (
    <div className={styles.popup}>
      <h3 style={{ fontWeight: "lighter", marginBottom: "1vh" }}>Create New Group</h3>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(e) => handleSubmit(e, close)}>
            <label >
            Group Name
            <input
                style={{ marginLeft: '1vw', width: '15vw', height: '4vh', borderRadius: '20px', minWidth: '100px' }}
                type="text"
                name="groupName"
                placeholder="Enter group name"
                value={formData.groupName}
                onChange={handleInputChange}
              />
             </label>
                <br />
                <label style={{ display: 'flex' }}>
                  Choose color <ColorPicker onSelect={handleColorSelect} />
                </label>
            
                <button
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    marginTop:"10px",
                    right: '10px',
                    margin: '10px',
                    width: '6vw',
                    height: '3.5vh',
                    fontSize: '14px',
                    backgroundColor: '#001F8B',
                    borderRadius: '7.5px',
                    color: '#fff',
                    minWidth:"90px"
                  }}
                  type="submit"
                >
                  Create
                </button>
              </form>
            </div>
          )} 
        </Popup> 
        
        <div style={{ maxHeight: 'auto', flex: 1, overflowY: 'auto' }}>
  {groups.map((group, index) => (
    <List key={index}  name={group.name} color={group.color} onClick={() => handleListClick(index)} />
  ))}
</div>


</div>
   
   )
}