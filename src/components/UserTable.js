//uset table.js

import React, { useContext, useEffect, useState  } from 'react';
import { UserContext } from '../context/UserContext'; 
import  '../styles/UserTable.css'
import { FaEdit } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import Edit from './Edit.js';

const UserTable = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { data: userData, filteredData, currentPage, recordsPerPage ,setCurrentPage,deleteUser,deleteMultipleUsers} = useContext(UserContext);
    const Display = filteredData.length > 0 ? filteredData : userData;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const DisplayedData = Display.slice(firstIndex, lastIndex);
    
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState({});

    const checkAll = () => {
      setSelectAllChecked((prev) => !prev);
      const updatedCheckboxStates = {};
      DisplayedData.forEach((user) => {
        updatedCheckboxStates[user.id] = !selectAllChecked;
      });
      setCheckboxStates(updatedCheckboxStates);
    };
    
    const handleCheckboxChange = (userId) => {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        [userId]: !prevStates[userId],
      }));
    };
  

    
    //   const checkAll = (event) => {
    //     const isChecked=event.target.checked;
    // if(event.target.className === 'userCheckbox'){
    //     const checkboxes = document.querySelectorAll('.user-checkbox');
    //     checkboxes.forEach((checkbox) => {
    //       checkbox.checked = false; 
    //     checkbox.addEventListener('change', checkAll); 
    //       checkbox.checked = isChecked;
    //     });
    //   };
    // };

    const Delete = (userId) => {
     deleteUser(userId);
    };
 




    const deleteAll=()=>{
      const selectedCheckbox=document.querySelectorAll('.user-checkbox:checked');
      const selectedUserIds=Array.from(selectedCheckbox).map((checkbox)=>checkbox.id);
      console.log("selected users=",selectedUserIds)
      deleteMultipleUsers(selectedUserIds);
      
      
    }

const openEditModal = (user) => {
  setSelectedUser(user);
};

const closeEditModal = () => {
  setSelectedUser(null);
};
    
  return (  

   
    <div className="Container">
    <div className="users">
     
          <table className="userTable">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox" onChange={checkAll} className="userCheckbox"  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {DisplayedData.map((user) => (
                <tr
                  key={user.id} className="userTable-row">
                  <td>
                    <input type="checkbox" id={user.id} className="user-checkbox" checked={checkboxStates[user.id] || false}
  onChange={() => handleCheckboxChange(user.id)} />
                   
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="userRole">{user.role}</td>
                  <td>
                    <div className="userAction">
                      <button onClick={() => openEditModal(user)}>
                      <FaEdit />
                      </button>
                      <button id="del"  onClick={() => Delete(user.id)}>
                      <IoTrashBinOutline  />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div><button className='deleteAll'  onClick={deleteAll}>Delete Selected</button></div>
        
        {selectedUser && (
        <Edit user={selectedUser} onClose={closeEditModal} />
      )}
  </div>

  );
};

export default UserTable;
