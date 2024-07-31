import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PaginationProps } from '../types'; // 경로 수정

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;

    @media (max-width: 768px) {
        margin: 15px 0;
    }

    @media (max-width: 480px) {
        margin: 10px 0;
    }
`;

const PageButton = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? '#007bff' : '#fff')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#007bff')};
    border: 1px solid #007bff;
    border-radius: 5px;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? '#0056b3' : '#e9ecef')};
    } 

    @media (max-width: 768px) {
        padding: 4px 8px;
        margin: 0 4px;
    }

    @media (max-width: 480px) {
        padding: 3px 6px;
        margin: 0 3px;
    }
`;

const ArrowButton = styled.button`
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 5px;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #e9ecef;
    }

    @media (max-width: 768px) {
        padding: 4px 8px;
        margin: 0 4px;
    }

    @media (max-width: 480px) {
        padding: 3px 6px;
        margin: 0 3px;
    }
`;

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, currentPage, paginate }) => {
    const pageNumbers = Array.from({ length: Math.ceil(totalPosts / postsPerPage) }, (_, i) => i + 1);
  
    return (
      <PaginationContainer>
        <ArrowButton onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowButton>
        {pageNumbers.map(number => (
          <PageButton key={number} isActive={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </PageButton>
        ))}
        <ArrowButton onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowButton>
      </PaginationContainer>
    );
  };
  
  export default Pagination;

