import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import nullImage from '../assets/1.png'


function PaginationBar({ totalPages, currentPage, handlePageChange }) {
  const [visiblePages, setVisiblePages] = useState(5);

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages, start + visiblePages - 1);
    start = Math.max(1, end - visiblePages + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePageNumbers = getVisiblePages();

  return (
    <div className='pagination'>
      <button
        className='pagination-btn'
        id='first-btn'
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        First
      </button>

      {visiblePageNumbers.map((pageNumber, index) => (
        <React.Fragment key={index}>
          {index !== 0 && ", "} {/* add comma if not first item */}
          <button
            className={`pagination-btn ${pageNumber === currentPage ? 'active-page' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </React.Fragment>
      ))}

      <button
        className='pagination-btn'
        id='last-btn'
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
}


function PeopleList() {
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const img = 'https://image.tmdb.org/t/p/original/';
  const apiUrl = `https://api.themoviedb.org/3/person/popular?api_key=(your api key)&language=en-US`;

  const fetchData = async (page) => {
    setLoading(true);
    const response = await axios.get(`${apiUrl}&page=${page}`);
    setPeopleData(response.data.results);
    setTotalPages(response.data.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <div className='ppp'>
            {peopleData.map((peo) => (
              <div className='profileCard' key={peo.id}>
                <img
                  src={peo.profile_path ? `${img}${peo.profile_path}` : nullImage}
                  alt='Profile'
                  id='personImg'
                  onClick={()=> navigate (`/popular/${peo.id}`)}
                />
                <div className='meta'>
                  <h2 className='personName'>{peo.name}</h2>
                </div>
              </div>
            ))}
          </div>
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          {/* Footer */}
        </>
      )}
    </>
  );
}

export default PeopleList;