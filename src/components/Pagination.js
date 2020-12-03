import React from 'react';

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  };

  return (
    <nav>
      <ul className="pagination ml-1 mt-1">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination;