import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Chat from './pages/Chat/components/Chat';
import FloatingButtonWithChat from './pages/Chat/components/FloatingButtonWithChat';
import Exercise from './pages/Exercise/Exercise';
import Map from './pages/FindGym/Map/Map';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import EachPost from './pages/Board/Post/EachPost';
import FreeBoardPage from './pages/Board/FreeBoardPage';
import ExerciseBoardPage from './pages/Board/ExerciseBoardPage';
import DietBoardPage from './pages/Board/DietBoardPage';
import EditPost from './pages/Board/Post/EditPost';


const Layout: React.FC = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <FloatingButtonWithChat />
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/" element={<h1>Welcome to MyWebsite</h1>} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/findgym" element={<Map />} />
          <Route path="/Board/free" element={<FreeBoardPage />} />
          <Route path="/Board/exercise" element={<ExerciseBoardPage />} />
          <Route path="/Board/diet" element={<DietBoardPage />} />
          <Route path="/Board/post/:id" element={<EachPost />} />
          <Route path="/Board/:boardType/edit" element={<EditPost />} />
          <Route path="/Board/:boardType/edit/:id" element={<EditPost />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
