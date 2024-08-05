import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ParentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 20px auto; 
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#007bff' : '#000')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #007bff' : 'none')};

  &:hover {
    color: #0056b3;
  }
`;

const PageTitle = styled.h1`
  width: 100%;
  max-width: 1100px;
  margin: 20px auto; 
  font-family: 'Arial', sans-serif;
  font-weight: 400;
  color: #000;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 55px;
  margin: 10px;
`;

const WriteButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  color: #666;
  background-color: white;
  border: 1px solid #666;
  border-radius: 1px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

interface TabsWithButtonProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const getBoardTitle = (boardType: string): string => {
  switch (boardType) {
    case 'FREE':
      return '자유게시판';
    case 'EXERCISE':
      return '운동 공유';
    case 'DIET':
      return '식단 공유';
    default:
      return '자유게시판';
  }
};

const Tabs: React.FC<TabsWithButtonProps> = ({ selectedTab, setSelectedTab }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    let path = '';
    switch (tab) {
      case '자유게시판':
        path = '/Board/free';
        break;
      case '운동 공유':
        path = '/Board/exercise';
        break;
      case '식단 공유':
        path = '/Board/diet';
        break;
      default:
        path = '/Board/free';
        break;
    }
    navigate(path);
  };

  return (
    <ParentContainer>
      <TabsContainer>
        <Tab isActive={selectedTab === 'FREE'} onClick={() => handleTabClick('FREE')}>
          자유게시판
        </Tab>
        <Tab isActive={selectedTab === 'EXERCISE'} onClick={() => handleTabClick('EXERCISE')}>
          운동 공유
        </Tab>
        <Tab isActive={selectedTab === 'DIET'} onClick={() => handleTabClick('DIET')}>
          식단 공유
        </Tab>
      </TabsContainer>
      <PageTitle>{getBoardTitle(selectedTab)}</PageTitle>
      <ButtonContainer>
        <WriteButton onClick={() => navigate('/Board/free/createpost')}>게시글 작성</WriteButton>
      </ButtonContainer>
    </ParentContainer>
  );
};

export default Tabs;
