//pagination.js
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Pagination.css";

const Pagination = () => {
  const { data: Data, currentPage, recordsPerPage, setCurrentPage } = useContext(UserContext);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const totalPages = Math.ceil(Data.length / recordsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
   }

  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  } 

  return (
    <div className="paginationContainer">
      <ul className="pagination">
        <li className="page-item">
          <button className="pagebt" id='bt' onClick={prePage} disabled={currentPage === 1}>
          &laquo;
          </button>
        </li>
        {pages.map((n) => (
          <li key={n} className={`page-item ${currentPage === n ? "active" : ""}`}>
            <button className="page-link" onClick={() => changeCPage(n)}>
              {n}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="pagebt" onClick={nextPage} disabled={currentPage === totalPages}>
          &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;