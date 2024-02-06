//Edit.js
import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/Edit.css'

const Edit = ({ user, onClose }) => {
  const { updateUserContextData } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(true);
  const[editedUser,setEditedUser]=useState(user||{});

  // state variable to store data and pass it to context

  useEffect(() => {
  setEditedUser(user||{});
},[user]);

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal();
    }
  };
 

  const handleChange = (e) => {
    setEditedUser({...editedUser,[e.target.name]:e.target.value})
  }

 const onSubmit= (e) =>{
  console.log('submit edited user:',editedUser)
  updateUserContextData(editedUser);
  console.log('userdata')
  closeModal();

  }

  return (
    <div className={`modal ${modalVisible ? 'visible' : ''}`} onClick={handleOutsideClick}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Edit User</h2>
        <form onSubmit={onSubmit}>
          <label>Name:</label>
          <input  type="text"  name="name"  value={editedUser.name || ''}  onChange={handleChange}  />

          <label>Email:</label>
          <input  type="text"  name="email"  value={editedUser.email || ''}  onChange={handleChange}   />

          <label>Role:</label>
          <input  type="text"  name="role"  value={editedUser.role || ''}  onChange={handleChange}  />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;


