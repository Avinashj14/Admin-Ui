//usercontext.js

import React, { createContext ,useState} from 'react';

import useFetch from '../customhook/UseFetch';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { data, loading, error,setData } = useFetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');


  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;


  const handleSearch = (searchTerm, filterBy) => {
    const updatedFilteredData = data.filter((user) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      return (
        user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.role.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }); 
  
    setFilteredData(updatedFilteredData);
  };
  const updateUserContextData = (updatedData) => {
    const  updatedFilteredData= data.map(obj=>{
      if (obj.id===updatedData.id){
        return{...obj,
         name: updatedData.name, email: updatedData.email, role: updatedData.role}
      }
      return obj
    })

    setFilteredData(updatedFilteredData);
    setData(updatedFilteredData);

    console.log("initial",data)
    console.log(updatedData.id)
    console.log("my filtered data",updatedData)
  };



  const deleteUser = (userId) => {
    const updatedData = data.filter((user) => user.id !== userId); 
    setData(updatedData);
  setFilteredData(updatedData);
    console.log('User deleted with ID:', userId);
    setCurrentPage(1);
  };

  const deleteMultipleUsers=(userIds)=>
{
const updatedData=data.filter((user)=>!userIds.includes(user.id));
console.log("delete multiple data",updatedData);
setData(updatedData);
setFilteredData(updatedData);
setCurrentPage(1);
}

  return (
    <UserContext.Provider value={{ data, loading, error, filteredData, handleSearch,currentPage, recordsPerPage, setCurrentPage, updateUserContextData,deleteUser,deleteMultipleUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
