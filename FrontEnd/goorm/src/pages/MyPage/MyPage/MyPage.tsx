import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { userData, getusereData } from '../../../api/mypageApi';
import { useNavigate } from 'react-router-dom';

const MyPage: React.FC = () => {
  const [user, setUser] = useState<userData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getusereData();
        console.log('Fetched data:', data);
        if (data) {
          setUser(data);
        } else {
          setError("사용자 정보가 없습니다.");
        }
        setLoading(false);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    // 업데이트 후 사용자 정보를 새로 고침
    try {
      const data = await getusereData();
      setUser(data);
    } catch (err) {
      console.error('사용자 정보 새로고침에 실패하였습니다.', err);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이페이지</h1>
      {user ? (
        <div>
          <div className={styles.userInfo}>
            <p><strong>이름:</strong> {user.memberName}</p>
            <p><strong>이메일:</strong> {user.memberEmail}</p>
            <p><strong>닉네임:</strong> {user.username}</p>
            <p><strong>등록일:</strong> {user.memberRegDate}</p>
            <p><strong>키:</strong> {user.memberHeight} cm</p>
            <p><strong>몸무게:</strong> {user.memberWeight} kg</p>
            <p><strong>소개:</strong> {user.comment}</p>
            <p><strong>유형:</strong> {user.memberType}</p>
          </div>

          <button
            className={styles.button}
            onClick={() => navigate('/edit')}
          >
            회원정보 수정
          </button>
        </div>
      ) : (
        <div>사용자 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default MyPage;
