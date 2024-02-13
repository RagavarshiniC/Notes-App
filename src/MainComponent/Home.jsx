import React,{useState,useEffect} from 'react'
import NotesArea from './NotesArea/NotesArea.jsx';
import styles from '../Styles/Home.module.css'
import NotesList from './NotesList/NotesList.jsx'
export default function Home() {
 
  const [groupNotes, setGroupNotes] = useState({});
  const [formData, setFormData] = useState({
    groupName: '',
    selectedColor: '',
  });
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isListclicked, setisListclicked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNoteStore = (note) => {
    console.log("selected group name "+selectedGroup.name)
    console.log("...groupnotes[selectedgroup.name] "+(groupNotes[selectedGroup.name]))
    console.log("selected grp id"+selectedGroup.id)
    const updatedNotes = {
      ...groupNotes,
      [selectedGroup.name]: [...(groupNotes[selectedGroup.name] || []), note],
      
    };
    setGroupNotes(updatedNotes);
    localStorage.setItem('groups', JSON.stringify(groups));
    console.log("grpntes"+JSON.stringify(updatedNotes));
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
 
    const newGroup = {
      name: formData.groupName,
      color: formData.selectedColor,
    };
    console.log('Group Name:', formData.groupName);
    console.log('Selected Color:', formData.selectedColor);

setGroups((prevGroups) => [...prevGroups, newGroup]);
console.log("groups "+groups)

localStorage.setItem('groups', JSON.stringify([...groups, newGroup]));
    closeModal();
  };
  const handleListClick = (index) => {
    setSelectedGroup(groups[index]);
    console.log("set selected grp"+setSelectedGroup(groups[index]));
    setisListclicked(true);
  };
  

  return (
    <div className={styles.Home}>
      {windowWidth > 600 ? (
        <NotesList
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          handleColorSelect={handleColorSelect}
          handleListClick={handleListClick}
          groups={groups}
          setGroups={setGroups}
        />
      ) : null}
      {(!(isListclicked) && windowWidth <= 600)  ? (
        <div>
         
          {  (
            <NotesList
              handleSubmit={handleSubmit}
              formData={formData}
              handleInputChange={handleInputChange}
              handleColorSelect={handleColorSelect}
              handleListClick={handleListClick}
              groups={groups}
              setGroups={setGroups}
            />
          ) }
        </div>
      ) : null}        
      {windowWidth > 600 ? (
        <NotesArea
          group={selectedGroup}
          onNoteStore={handleNoteStore}
          groupNotes={groupNotes[selectedGroup?.name]}
        />
        ) : null}
{((isListclicked) && windowWidth <= 600)  ? (
        <NotesArea
          group={selectedGroup}
          onNoteStore={handleNoteStore}
          groupNotes={groupNotes[selectedGroup?.name]}
        />
      
        ) : null} 
    </div>
  )
}
