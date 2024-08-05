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
    const params: any = { boardType, keyword: searchQuery };

    if (categories && categories.length > 0) {
      params.categories = categories.join(',');
    }

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
    const response = await axiosInstance.post('/s3/ck/upload', formData, {
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

// 게시글 추가 (이미지 없이)
export const addPost = async (postData: { boardTitle: string; boardContent: string; boardType: string; boardCategory: string; imageUrls?: string[] }): Promise<any> => {
  try {
    const response = await axiosInstance.post('/board/save', postData);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

// 게시글 수정
export const updatePost = async (formData: FormData): Promise<any> => {
  try {
    const response = await axiosInstance.post('/board/update', formData, {

    });
    return response.data;
  } catch (error) {
    console.error('Error update post:', error);
    throw error;
  }
};



// 게시글 삭제
export const deletePost = async (boardId: string): Promise<any> => {
  try {
    await axiosInstance.post(`/board/delete/${boardId}`);
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
export const deleteComment = async (commentId: string): Promise<any> => {
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
export const toggleLike = async (boardId: number): Promise<any> => {
  try {
    await axiosInstance.post(`/board/toggle/like/${boardId}`);
  } catch (error) {
    console.error('좋아요 토글 중 오류가 발생했습니다:', error);
    throw error;
  }
};
