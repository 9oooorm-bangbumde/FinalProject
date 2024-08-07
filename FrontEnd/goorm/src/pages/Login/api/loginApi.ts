import axios, { AxiosResponse } from 'axios';

export interface LoginData {
    loginId: string;
    loginPw: string;
}

export interface LoginRequest {
    message: string;
    memberId: string;
    info: string;
}

export const postLoginData = async (login: LoginData): Promise<LoginRequest> => {
    const formData = new FormData();
    formData.append('loginId', login.loginId);
    formData.append('loginPw', login.loginPw);

    console.log("FormData 생성 완료:", formData);

    try {
        console.log("로그인 요청 시작:", formData);
        const response: AxiosResponse<LoginRequest> = await axios.post("http://final-project-app-env.eba-xdjqmujd.ap-northeast-2.elasticbeanstalk.com/api/auth/login", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        console.log("서버 응답 수신:", response);

        if (response.status === 200) {
            console.log("로그인 성공:", response.data);
            return response.data;
        } else {
            console.error("로그인 실패: 예상치 못한 상태 코드", response.status);
            throw new Error("로그인 실패: 예상치 못한 상태 코드");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("로그인 실패 - Axios 에러:", error.response?.data);
            throw new Error("로그인 실패: " + (error.response?.data || '알 수 없는 오류'));
        } else {
            console.error("로그인 실패 - 일반 에러:", error);
            throw new Error("로그인 실패: 알 수 없는 오류");
        }
    }
}
