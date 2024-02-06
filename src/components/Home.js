//home.js
// import { UserProvider } from '../context/UserContext';
import React, { useContext } from 'react';  // Import useContext
import UserTable from './UserTable';
import SearchBar from './SearchBar'
import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';
import Pagination from './Pagination'

const Home=()=>{
    const { filteredData, handleSearch, currentPage, recordsPerPage, setCurrentPage } = useContext(UserContext);
    return (
        // <UserProvider>
            // <div style ={{border:'2px solid red ',margin :'5px'}} >
         <div>
                <Navbar/>
                {/* <SearchBar/>
                <UserTable/> */}
                 <SearchBar onSearch={handleSearch} />
                 <UserTable currentPage={currentPage} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} />
      <Pagination currentPage={currentPage} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} />
            </div>
        // </UserProvider>
    )
}
export default Home;



