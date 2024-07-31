import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FreePostList from './Post/FreePostList';
import Pagination from './components/Pagination';
import Searchbar from './components/SearchBar';
import { BoardDetails } from './types';
import { fetchPosts } from './api/boardAPI';
import Tabs from './components/Tabs';

const Container = styled.div`
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  padding-right: 20px;
`;

const WriteButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #BAA085;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FreeBoardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('FREE');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [currentPosts, setCurrentPosts] = useState<BoardDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts(selectedTab, currentPage, searchQuery);
        
        
        setCurrentPosts(data.boardItems);
        setTotalPosts(data.totalCnt);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [selectedTab, currentPage, searchQuery, postsPerPage]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <Container>
      <ButtonContainer>
        <WriteButton onClick={() => navigate('/Board/free/edit')}>작성하기</WriteButton>
      </ButtonContainer>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <FreePostList boardType={selectedTab} currentPage={currentPage} postsPerPage={postsPerPage} posts={currentPosts} />
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
    </Container>
  );
};

export default FreeBoardPage;
