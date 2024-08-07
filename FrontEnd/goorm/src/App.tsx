import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Chat from './pages/Chat/components/Chat';
import FloatingButtonWithChat from './pages/Chat/components/FloatingButtonWithChat';
import Exercise from './pages/Exercise/Exercise';
import Map from './pages/FindGym/Map/Map';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';


import FreeBoardPage from './pages/Board/page/FreeBoard/FreeBoardPage';
import DetailPost from './pages/Board/Post/DetailPost';
import UpdatePost from './pages/Board/Post/UpdatePost';
import CreatePost from './pages/Board/Post/CreatePost';
import Food from './pages/Food/Food';
import { AuthProvider } from './pages/Login/auth/AuthContext';
import ProtectedRoute from './pages/Login/auth/ProtectedRoute';
import Main from './pages/MyPage/Main/Main';
import ExerciseRecordPage from './components/ExerciseRecords/ExerciseRecordList/ExerciseRecordPage';
import ExerciseChartPage from './components/ExerciseRecords/ExerciseChart/ExerciseChartPage';

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
    <AuthProvider>
      <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<h1>Welcome to MyWebsite</h1>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/exercise" element={<ProtectedRoute><Exercise /></ProtectedRoute>} />
            <Route path="/food" element={<Food />} />
            <Route path="/findgym" element={<ProtectedRoute><Map /></ProtectedRoute>} />
            <Route path="/main" element={<Main />} />
            <Route path="/exercise/records/:month" element={<ExerciseRecordPage />} />
            <Route path="/exercise/chart/:month" element={<ExerciseChartPage />} />
            <Route path="/Board" element={<Outlet />}>
              <Route path="free" element={<FreeBoardPage />} />
              <Route path="free/post/:id" element={<DetailPost />} />
              <Route path="free/post/edit/:id" element={<UpdatePost />} />
              <Route path="free/createpost" element={<CreatePost />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
