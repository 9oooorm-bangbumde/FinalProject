import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost, uploadImages } from '../api/boardAPI';
import styles from './EditPost.module.scss';

const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [boardType, setBoardType] = useState<string>('FREE');
  const [boardCategory, setBoardCategory] = useState<string>('NONE');
  const [imageUrls, setImageUrls] = useState<FileList | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleBoardTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBoardType(e.target.value);
  };

  const handleBoardCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBoardCategory(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrls(e.target.files);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !boardType.trim() || !boardCategory.trim()) {
      alert('모든 필수 입력 필드를 입력해주세요.');
      return;
    }

    try {
      let uploadedImageUrls: string[] = [];

      if (imageUrls) {
        const imageFormData = new FormData();
        Array.from(imageUrls).forEach(file => {
          imageFormData.append('image', file); // 'image' 필드 이름 사용
        });

        const uploadResponse = await uploadImages(imageFormData);
        uploadedImageUrls = uploadResponse;
      }

      const postData = {
        boardTitle: title,
        boardContent: content,
        boardType: boardType,
        boardCategory: boardCategory,
        ...(uploadedImageUrls.length > 0 && { imageUrls: uploadedImageUrls }),
      };

      await addPost(postData);
      alert('게시글이 성공적으로 작성되었습니다.');
      navigate(`/Board/${boardType.toLowerCase()}`);
    } catch (error) {
      alert('게시글 작성 중 오류가 발생했습니다.');
      console.error('게시글 작성 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className={styles.postContainer}>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSave} encType="multipart/form-data">
        <select value={boardType} onChange={handleBoardTypeChange}>
          <option value="FREE">자유게시판</option>
          <option value="WORKOUT">운동게시판</option>
          <option value="DIET">식단게시판</option>
        </select>
        <select value={boardCategory} onChange={handleBoardCategoryChange}>
          <option value="NONE">카테고리 없음</option>
          <option value="WORKOUT">운동</option>
          <option value="FOOD">맛집</option>
          <option value="AD">광고</option>
          <option value="CONCERN">상담</option>
          <option value="HOBBY">취미</option>
          <option value="NEIGHBOR">동네</option>
          <option value="ETC">기타</option>
        </select>
        <input 
          type='text' 
          placeholder='제목' 
          value={title} 
          onChange={handleTitleChange} 
          required
        />
        <textarea 
          placeholder='내용' 
          value={content} 
          onChange={handleContentChange}
          required
        ></textarea>
        <input 
          type="file" 
          multiple 
          onChange={handleImageChange} 
        />
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.backButton} onClick={() => navigate(`/Board/${boardType.toLowerCase()}`)}>작성 취소</button>
          <button type="submit" className={styles.submitButton}>작성 완료</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
