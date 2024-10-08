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
      <ReportCount>조회수: {reportsCnt}</ReportCount>
      <Button onClick={handleLikeToggle}>
        {isLiked ? '좋아요' : '좋아요'} &nbsp;: {likesCnt}
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 6px 10px;
  font-size: 14px;
  color: #699732;
  background: #FFBDBD;
  border: 1px solid #FFBDBD;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #699732;
    color: white;

  }
`;

const ReportCount = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #666;
  padding: 6px 20px;

`;

export default LikeButton;
