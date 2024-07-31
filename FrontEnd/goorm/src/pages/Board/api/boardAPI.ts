import axiosInstance from '../../../api/axiosInstance';
import { Comment } from '../types';
import axios from 'axios';

// 게시글 목록 조회
export const fetchPosts = async (
  boardType: string,
  page: number,
  searchQuery: string = '',
  categories?: string[]
): Promise<any> => {
  try {
    const params: any = { boardType, searchQuery };

    if (categories && categories.length > 0) {
      params.categories = categories.join(',');
    }

    console.log('Fetching posts with params:', params);

    const response = await axiosInstance.get(`/board/list/${page}`, { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      boardItems: [],
      totalPages: 0,
      pageSize: 0,
      totalCnt: 0,
    };
  }
};

// 이미지 업로드
export const uploadImages = async (formData: FormData): Promise<string[]> => {
  try {
    const response = await axiosInstance.post('/s3/upload/multi', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

// 게시글 추가
export const addPost = async (formData: FormData): Promise<any> => {
  try {
    const response = await axiosInstance.post('/board/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

// 게시글 추가 및 유효성 검사
export const addPostWithValidation = async (
  title: string,
  content: string,
  boardType: string,
  boardCategory: string,
  imageUrls: FileList | null
): Promise<void> => {
  // 필수 입력 필드 확인
  if (!title.trim() || !content.trim() || !boardType.trim() || !boardCategory.trim()) {
    throw new Error('모든 필수 입력 필드를 입력해주세요.');
  }

  const formData = new FormData();
  formData.append('boardTitle', title);
  formData.append('boardContent', content);
  formData.append('boardType', boardType);
  formData.append('boardCategory', boardCategory);

  // 이미지가 있을 경우 추가
  if (imageUrls) {
    Array.from(imageUrls).forEach(file => {
      formData.append('images', file); // 'images' 필드 이름 사용
    });
  }

  await addPost(formData);
};

// 게시글 수정
export const updatePost = async (formData: FormData): Promise<any> => {
  try {
    const response = await axiosInstance.post('/board/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (postId: string): Promise<void> => {
  try {
    await axiosInstance.post(`/board/delete/${postId}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// 게시글 상세 조회
export const fetchPostDetail = async (boardId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/board/detail/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post detail:', error);
    throw error;
  }
};


// 댓글 목록 조회
export const fetchComments = async (boardId: string): Promise<Comment[]> => {
  try {
    const response = await axiosInstance.get(`/comment/list/${boardId}`);

    return Array.isArray(response.data.comments) ? response.data.comments : [];
  } catch (error) {
    console.error('댓글 목록 조회 에러:', error);
    return [];
  }
};

// 댓글 추가
export const addComment = async (postData: { boardId: number; commentContent: string; writer: string }): Promise<any> => {
  try {
    const response = await axiosInstance.post('/comment/save', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await axiosInstance.post(`/comment/delete/${commentId}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (commentData: { commentId: number; commentContent: string }): Promise<any> => {
  try {
    const response = await axiosInstance.post('/comment/update', commentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};



// 좋아요 토글
export const toggleLike = async (postId: string): Promise<number> => {
  try {
    const response = await axiosInstance.post(`/board/toggle/like/${postId}`);
    return response.data.likesCnt;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};
