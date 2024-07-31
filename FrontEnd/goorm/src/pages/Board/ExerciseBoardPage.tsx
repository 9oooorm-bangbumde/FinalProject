import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.
import styled from 'styled-components';
import Board from './Post/FreePostList';
import Pagination from './components/Pagination';
import Searchbar from './components/SearchBar';
import { BoardDetails } from './types';
import { fetchPosts } from './api/boardAPI'; // API 함수 임포트
import Tabs from './components/Tabs';

const Container = styled.div`
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ExerciseBoardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('EXERCISE');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [currentPosts, setCurrentPosts] = useState<BoardDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts(selectedTab, currentPage - 1, );
        const formattedPosts = data.boardItems.map((post: any) => ({
          boardId: post.boardId,
          writer: post.writer,
          boardTitle: post.boardTitle,
          boardContent: post.boardContent,
          boardRegDate: post.boardRegDate,
          viewCnt: post.viewCnt,
          likeCnt: post.likeCnt,
          reportCnt: post.reportsCnt,
          boardType: post.boardType,
          boardCategory: post.boardCategory,
          imageUrls: post.imageUrls,
          likes: post.likes,
        }));
        setCurrentPosts(formattedPosts);
        setTotalPosts(data.totalCnt);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [selectedTab, currentPage, searchQuery, postsPerPage]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchPerformed(false);
    } else {
      setSearchPerformed(true);
      setCurrentPage(1);
    }
  };

  return (
    <Container>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Board boardType={selectedTab} currentPage={currentPage} postsPerPage={postsPerPage} posts={currentPosts} />
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

export default ExerciseBoardPage;
