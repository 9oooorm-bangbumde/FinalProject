import React, { useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './CommentSection.module.scss';
import { fetchComments, addComment, deleteComment, updateComment } from '../api/boardAPI';
import { Comment } from '../types';


interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>('');
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  const loadComments = async () => {
    try {
      const fetchedComments = await fetchComments(postId.toString());
      setComments(fetchedComments);
    } catch (error) {
      console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.style.height = 'auto';
      editInputRef.current.style.height = editInputRef.current.scrollHeight + 'px';
    }
  }, [editCommentContent]);

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      console.error('댓글 내용을 입력해주세요.');
      return;
    }

    const newCommentData = {
      boardId: postId,
      commentContent: newComment,
      writer: '익명'
    };

    try {
      await addComment(newCommentData);
      setNewComment('');
      loadComments(); // 댓글 목록 다시 불러오기
    } catch (error) {
      console.error('댓글 작성 중 오류가 발생했습니다.', error);
    }
  };

  const handleCommentUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editCommentId === null || !editCommentContent.trim()) {
      console.error('수정할 댓글 내용을 입력해주세요.');
      return;
    }

    const updatedCommentData = {
      commentId: editCommentId,
      commentContent: editCommentContent,
    };

    try {
      await updateComment(updatedCommentData);
      setEditCommentId(null);
      setEditCommentContent('');
      loadComments(); // 댓글 목록 다시 불러오기
    } catch (error) {
      console.error('댓글 수정 중 오류가 발생했습니다.', error);
    }
  };

  const confirmDeleteComment = async () => {
    if (commentToDelete !== null) {
      try {
        await deleteComment(commentToDelete.toString());
        setComments(comments.filter(comment => comment.commentId !== commentToDelete));
        setCommentToDelete(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('댓글 삭제 중 오류가 발생했습니다.', error);
      }
    }
  };

  const openModal = (commentId: number) => {
    setCommentToDelete(commentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCommentToDelete(null);
    setIsModalOpen(false);
  };

  const startEditingComment = (commentId: number, commentContent: string) => {
    setEditCommentId(commentId);
    setEditCommentContent(commentContent);
  };

  const cancelEditing = () => {
    setEditCommentId(null);
    setEditCommentContent('');
  };

  return (
    <div className={styles.commentSection}>
      <ul className={styles.commentList}>
        {comments.map(comment => (

          <li key={comment.commentId} className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <div className={styles.userIcon}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span className={styles.commentAuthor}>{comment.writer}</span>
              {editCommentId === comment.commentId ? (
                <form onSubmit={handleCommentUpdateSubmit} className={styles.editForm}>
                  <textarea
                    ref={editInputRef}
                    value={editCommentContent}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditCommentContent(e.target.value)}
                    className={styles.editInput}
                  />
                  <div className={styles.editFormButtons}>
                    <button type="submit" className={`${styles.saveButton} ${styles.button}`}>저장</button>
                    <button type="button" onClick={cancelEditing} className={`${styles.cancelButton} ${styles.button}`}>취소</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className={styles.commentContentWrapper}>

                    <span className={styles.commentContent}>{comment.commentContent}</span>
                  </div>
                  <div className={styles.rightAligned}>
                    <span className={styles.commentDate}>{comment.commentRegDate}</span>
                    <div className={styles.buttonGroup}>
                      <button
                        className={`${styles.editButton} ${styles.button}`}
                        onClick={() => startEditingComment(comment.commentId, comment.commentContent)}
                      >
                        수정
                      </button>
                      <button
                        className={`${styles.deleteButton} ${styles.button}`}
                        onClick={() => openModal(comment.commentId)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <div className={styles.inputContainer}>
          <div className={styles.userIcon}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value)}
            className={styles.commentInput}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit" className={styles.submitButton}>
            댓글 작성
          </button>
        </div>
      </form>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>댓글을 삭제하시겠습니까?</p>
            <div className={styles.modalButtons}>
              <button onClick={confirmDeleteComment} className={`${styles.confirmButton} ${styles.button}`}>삭제</button>
              <button onClick={closeModal} className={`${styles.cancelButton} ${styles.button}`}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;