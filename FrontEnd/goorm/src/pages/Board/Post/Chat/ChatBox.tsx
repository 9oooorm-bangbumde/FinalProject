import React, { useEffect, useRef } from 'react';
import styles from './ChatBox.module.scss';

interface ChatBoxProps {
  x: number;
  y: number;
  author: string; // 추가된 부분: 작성자 이름 prop
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ x, y, author, onClose }) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChatRequest = () => {
    // 서버로 요청을 보내는 로직 추가
    console.log(`채팅 신청을 보냅니다: ${author}`);
    // 여기에 서버 요청 코드를 추가하세요.
    onClose();
  };

  const handleFriendRequest = () => {
    // 친구 추가 요청을 보내는 로직 추가
    console.log(`친구 추가를 보냅니다: ${author}`);
    // 여기에 서버 요청 코드를 추가하세요.
    onClose();
  };

  return (
    <div className={styles.chatBox} style={{ top: y, left: x }} ref={chatBoxRef}>
      <div className={styles.chatBoxContent}>
        <button className={styles.chatButton} onClick={handleChatRequest}>채팅 신청</button>
        <button className={styles.friendButton} onClick={handleFriendRequest}>친구 추가</button>
      </div>
    </div>
  );
};

export default ChatBox;