import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

interface TabsWithButtonProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

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
    <TabsContainer>
      <Tab isActive={selectedTab === '자유게시판'} onClick={() => handleTabClick('자유게시판')}>
        자유게시판
      </Tab>
      <Tab isActive={selectedTab === '운동 공유'} onClick={() => handleTabClick('운동 공유')}>
        운동공유
      </Tab>
      <Tab isActive={selectedTab === '식단 공유'} onClick={() => handleTabClick('식단 공유')}>
        식단공유
      </Tab>
    </TabsContainer>
  );
};

export default Tabs;
