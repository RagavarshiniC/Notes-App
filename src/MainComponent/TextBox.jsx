import React, { useState, useEffect } from 'react';
import enabledsendIcon from '../assets/enabledsaveicon.svg'
import disabledsendIcon from '../assets/disabledsaveicon.svg'
import CircleInitials from './CircleInitials.jsx';
import StoredNotes from './StoredNotes.jsx';
const getGroupInitials = (groupName) => {
  const words = groupName.split(' ');

  if (words.length === 1) {
    // For single-word group names, return only the first letter
    console.log(words[0]?.charAt(0).toUpperCase())
    return words[0]?.charAt(0).toUpperCase() || '';
  } else {
    // For multi-word group names, return the initials of the first and last words
    const firstLetter = words[0]?.charAt(0) || '';
    const lastWord = words[words.length - 1] || '';
    const lastLetter = lastWord.charAt(0);
    return `${firstLetter.toUpperCase()}${lastLetter.toUpperCase()}`;
  }
};

const TextBox = ({ group, onNoteStore, groupNotes }) => {
  const [noteText, setNoteText] = useState('');
  const [isNoteStored, setIsNoteStored] = useState(false);
  const [localGroupNotes, setLocalGroupNotes] = useState(groupNotes || []); // Declare groupNotes state

  useEffect(() => {
    // Retrieve group notes from local storage when the component mounts
    const storedGroupNotes = JSON.parse(localStorage.getItem(group.name)) || [];
    setLocalGroupNotes(storedGroupNotes);
  }, [group.name]);

  const handleSendClick = () => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);

    const newNote = {
      text: noteText,
      date: formattedDate,
      time: formattedTime,
      group: group.name,
      id: Date.now(),
    };

    // Retrieve existing notes for the specific group
    const existingGroupNotes = [...localGroupNotes];

    // Combine existing group notes with the new note
    const updatedGroupNotes = [...existingGroupNotes, newNote];

    // Update the state with the new group notes
    setLocalGroupNotes(updatedGroupNotes);

    // Trigger the onNoteStore callback
    onNoteStore(newNote);

    // Store the updated group notes in local storage
    localStorage.setItem(group.name, JSON.stringify(updatedGroupNotes));

    // Reset the note text
    setNoteText('');
    setIsNoteStored(true);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent the default behavior of the Enter key (new line) when not pressed with Shift
      e.preventDefault();
      // Call the function to handle storing the note
      handleSendClick();
    }
  };


  // ... (rest of the code)

 // console.log(localStorage.getItem(allnotes));
 const sendIcon = noteText ? enabledsendIcon : disabledsendIcon; 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative',  marginTop: 'auto', marginBottom: '1rem'  }}>
      <div style={{ backgroundColor: '#001F8B', color: '#ffff', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '1rem' }}>
      <CircleInitials initials={getGroupInitials(group.name)} color={group.color} />
        <p style={{fontSize:"20px",marginLeft:"20px"}}>{group.name}</p>
      </div>
      {localGroupNotes && localGroupNotes.length > 0 && (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {localGroupNotes.map((note, index) => (
            <StoredNotes key={index} storedNoteText={note} />
          ))}
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"center",alignItems:"center",width: '70vw', height: '25vh',position: "relative", backgroundColor: '#001F8B', marginTop: 'auto', marginBottom: '1rem' }}>

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your notes here......."
          style={{ width: '69vw', height: '20vh', resize: 'none'}}
          onKeyDown={handleKeyDown}
          
        />
        {console.log(noteText)}
        <img
          src={sendIcon}
          alt="Send Icon"
          style={{ width: '20px', height: '20px', position: 'absolute', bottom: '45px', right: '15px', cursor: 'pointer' }}
          onClick={handleSendClick}
        />
      </div>
    </div>
  );
};

export default TextBox;
