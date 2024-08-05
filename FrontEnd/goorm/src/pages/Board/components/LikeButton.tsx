import React from 'react';
import styled from 'styled-components';

interface LikeButtonProps {
  boardId: number;
  isLiked: boolean;
  likesCnt: number;
  toggleLike: (boardId: number) => any;
  reportsCnt: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ boardId, isLiked, likesCnt, toggleLike, reportsCnt }) => {
  const handleLikeToggle = () => {
    toggleLike(boardId);
  };

  return (
    <ButtonContainer>
      <Button onClick={handleLikeToggle}>
        {isLiked ? '좋아요 취소' : '좋아요'} &nbsp;: {likesCnt}
      </Button>
      <ReportCount>조회수: {reportsCnt}</ReportCount>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 6px 16px;
  font-size: 14px;
  color: #666;
  background: white;
  border: 1px solid #ddd;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ReportCount = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #666;
`;

export default LikeButton;
