import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoardDetails, BoardProps } from '../types';
import { fetchPosts } from '../api/boardAPI'; 

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const TitleCell = styled(TableCell)`
  cursor: pointer;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const FreePostList: React.FC<BoardProps> = ({ boardType, currentPage, postsPerPage }) => {
  const [posts, setPosts] = useState<BoardDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts(boardType, currentPage); 
        setPosts(data.boardItems);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [boardType, currentPage, postsPerPage]);

  return (
    <div>
      <h1>{boardType}</h1>
      <Table>
        <thead>
          <tr>
            <TableHeader>번호</TableHeader>
            <TableHeader>카테고리</TableHeader>
            <TableHeader>제목</TableHeader>
            <TableHeader>작성자</TableHeader>
            <TableHeader>작성일</TableHeader>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <TableRow key={post.boardId}>
              <TableCell>{post.boardId}</TableCell> 
              <TableCell>{post.boardCategory}</TableCell>
              <TitleCell onClick={() => navigate(`/Board/post/${post.boardId}`)}>{post.boardTitle}</TitleCell>
              <TableCell>{post.writer}</TableCell>
              <TableCell>{post.boardRegDate}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FreePostList;