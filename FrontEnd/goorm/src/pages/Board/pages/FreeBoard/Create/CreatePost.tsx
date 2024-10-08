import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePost.module.scss';
import { addPost } from '../../../api/boardAPI';
import Category from '../../../components/Category';
import TextEditor from '../../../../../components/TextEditor/TextEditor';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [boardCategory, setBoardCategory] = useState<string>('WORKOUT');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (data: string) => {
    setContent(data);
  };

  const handleBoardCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBoardCategory(e.target.value);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !boardCategory.trim()) {
      alert('모든 필수 입력 필드를 입력해주세요.');
      return;
    }

    try {
      const postData = {
        boardTitle: title,
        boardContent: content,
        boardType: 'FREE', // boardType을 'FREE'로 고정
        boardCategory: boardCategory,
      };

      await addPost(postData);
      alert('게시글이 성공적으로 작성되었습니다.');
      navigate(`/Board/free`);
    } catch (error) {
      alert('게시글 작성 중 오류가 발생했습니다.');
      console.error('게시글 작성 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.postContainer}>
        <h2>게시글 작성</h2>
        <form onSubmit={handleSave}>
          <Category 
            boardCategory={boardCategory} 
            handleBoardCategoryChange={handleBoardCategoryChange}
          />
          <input 
            type='text' 
            placeholder='제목을 입력해주세요.' 
            value={title} 
            onChange={handleTitleChange} 
            required
          />
          <TextEditor defaultValue={content} onChange={handleContentChange} />
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.backButton} onClick={() => navigate(`/Board/free`)}>작성 취소</button>
            <button type="submit" className={styles.submitButton}>작성 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
