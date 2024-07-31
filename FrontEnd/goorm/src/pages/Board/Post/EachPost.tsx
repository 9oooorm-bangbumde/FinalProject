import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoardDetails } from '../types';
import { fetchPostDetail, deletePost, toggleLike } from '../api/boardAPI';
import styles from './EachPost.module.scss';
import CommentSection from './CommentSection';
import Tabs from '../components/Tabs';

const EachPost: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BoardDetails | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('free');

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const fetchPost = async () => {
      try {
        const data = await fetchPostDetail(id);
        if (data) {
          setPost(data);
          setIsLiked(data.likes); // 수정된 부분
          const currentUserId = localStorage.getItem('userId');
          if (currentUserId && data.writerId.toString() === currentUserId) {
            setIsEditable(true);
          }
          setSelectedTab(data.boardType.toLowerCase());
        } else {
          console.error('게시글을 불러오는 중 오류가 발생했습니다');
          navigate('/');
        }
      } catch (error) {
        console.error('게시글을 불러오는 중 오류가 발생했습니다', error);
        navigate('/');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleLikeToggle = async () => {
    if (!post) return;

    try {
      const newLikeCount = await toggleLike(post.boardId.toString());
      setPost({ ...post, likesCnt: newLikeCount }); // likesCnt 수정
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('좋아요 토글 중 오류가 발생했습니다', error);
    }
  };

  const handleDelete = async () => {
    if (id && window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deletePost(id);
        alert('게시글이 성공적으로 삭제되었습니다.');
        navigate('/');
      } catch (error) {
        console.error('게시글 삭제 중 오류가 발생했습니다', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleEdit = () => {
    if (id) {
      navigate(`/Board/${id}/edit`);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className={styles.DetailContainer}>
        <div className={styles.PostHeader}>
          <h1 className={styles.PostTitle}>{post.boardTitle}</h1>
          <div className={styles.PostMeta}>
            <span>작성자: {post.writer}</span>
            <span>작성일: {post.boardRegDate}</span>
            <span>좋아요: {post.likesCnt}</span> {/* likesCnt 수정 */}
          </div>
        </div>
        <div className={styles.PostContent}>
          {post.boardContent || '내용이 없습니다.'}
        </div>
        <button className={`${styles.LikeButton} ${isLiked ? styles.liked : ''}`} onClick={handleLikeToggle}>
          {isLiked ? '좋아요 취소' : '좋아요'}
        </button>
        <CommentSection postId={post.boardId} />
        <div className={styles.ButtonContainer}>
          {isEditable && (
            <>
              <button className={styles.EditButton} onClick={handleEdit}>게시글 수정</button>
              <button className={styles.DeleteButton} onClick={handleDelete}>게시글 삭제</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EachPost;