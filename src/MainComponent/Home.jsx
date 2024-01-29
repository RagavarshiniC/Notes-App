import React,{useState,useEffect} from 'react'
import { Popup } from 'reactjs-popup';

import styles from '../Styles/Home.module.css'
import List from './List/List.jsx'
import emptyimg from '../assets/empty_notes.svg'
import Lockimg from '../assets/lock.svg'
import ColorPicker from './ColorPicker.jsx';
import TextBox from './TextBox.jsx';
export default function Home() {
  // const [storedNotes, setStoredNotes] = useState([]);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [groupNotes, setGroupNotes] = useState({});
  const [formData, setFormData] = useState({
    groupName: '',
    selectedColor: '',
  });
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Load data from localStorage on component mount
 // Inside Home component


  const handleNoteStore = (note) => {
    const updatedNotes = {
      ...groupNotes,
      [selectedGroup.name]: [...(groupNotes[selectedGroup.name] || []), note],
    };
    setGroupNotes(updatedNotes);
  };
  const handleColorSelect = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedColor: color,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e, closeModal) => {
    e.preventDefault();
    // You can now access formData.groupName and formData.selectedColor
    const newGroup = {
      name: formData.groupName,
      color: formData.selectedColor,
    };
    console.log('Group Name:', formData.groupName);
    console.log('Selected Color:', formData.selectedColor);
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    // Add logic to handle the form data (e.g., storing in state, making an API call, etc.)
  
    // Close the popup after form submission
    closeModal();
  };
  const handleListClick = (index) => {
    setSelectedGroup(groups[index]);
    localStorage.setItem('selectedGroup', JSON.stringify(selectedGroup));
  };
  const handlePopupClick = () => {
    setIsDarkBackground(!isDarkBackground);
  };

  return (
    <div className={styles.Home}>
        <div className={styles.NotesList}>
            <h2 className={styles.pn}>Pocket Notes</h2>
            <Popup trigger={<button onClick={handlePopupClick}>+ Create Notes group</button>} modal 
            closeOnDocumentClick={!isDarkBackground} // Close only if the background is not dark
            open={isDarkBackground}>
              
  {(close) => (
    <div className={`${styles.popup} ${isDarkBackground ? styles.darkBackground : ''}`}>
      <h3 style={{ fontWeight: "lighter", marginBottom: "1vh" }}>Create New Group</h3>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(e) => handleSubmit(e, close)}>
            <label >
            Group Name
            <input
                style={{ marginLeft: '1vw', width: '15vw', height: '4vh', borderRadius: '20px', minWidth: '160px' }}
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
                    bottom: '5px',
                    right: '10px',
                    margin: '10px',
                    width: '6vw',
                    height: '3.5vh',
                    fontSize: '14px',
                    backgroundColor: '#001F8B',
                    borderRadius: '7.5px',
                    color: '#fff',
                    minWidth:"100px"
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
    <List key={index} id={group.id} name={group.name} color={group.color} onClick={() => handleListClick(index)} />
  ))}
</div>
</div>
       
      <div className={styles.NotesArea}>
      {selectedGroup ? (
          <TextBox group={selectedGroup} onNoteStore={handleNoteStore} groupNotes={groupNotes[selectedGroup.name]} />
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
      
    </div>
  )
}
