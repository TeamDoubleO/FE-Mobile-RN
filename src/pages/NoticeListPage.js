import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getNoticeList } from '../apis/NoticeListApi';
import { useAuthStore } from '../stores/authStore';
import { colors } from '../constants/colors';
import NoticeList from '../components/notices/NoticeList';

const alertData = [
  {
    title: '보호자 신청 승인',
    content: '이정빈 님이 보호자 신청 요청을 하였습니다.',
    createdAt: '2025-05-03T13:44:40',
  },
  {
    title: '보호자 신청 거절',
    content: '이정빈 님의 보호자 신청 요청이 거절되었습니다',
    createdAt: '2025-05-04T13:44:40',
  },
  {
    title: '보호자 신청',
    content: '이정빈 님이 보호자 신청 요청을 하였습니다.',
    createdAt: '2025-05-04T13:44:40',
  },
];

const titleTypeMap = {
  '보호자 신청 승인': 'APPROVE',
  '보호자 신청 거절': 'REJECT',
  '보호자 신청': 'APPLY',
};

function convertToOldFormat(data) {
  return data.map((item, idx) => {
    const [date, time] = item.createdAt.split('T');
    return {
      id: idx + 1,
      type: titleTypeMap[item.title] || 'APPLY',
      date: date.replace(/-/g, '. '), // "2025. 05. 03"
      time: time.slice(0, 5), // "13:44"
      message: item.content,
    };
  });
}

export default function NoticeListPage() {
  const { setLoading } = useAuthStore();
  const [noticeList, setNoticeList] = useState([]);

  // 알림 목록 조회 api 사용시
  // useEffect(() => {
  //   const getNotice = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await getNoticeList();
  //       console.log(data);
  //       setNoticeList(convertToOldFormat(data));
  //     } catch (error) {
  //       console.error('알림 목록 가져오기 실패:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getNotice();
  // }, [setLoading]);

  // 목업 데이터 사용시
  useEffect(() => {
    setNoticeList(convertToOldFormat(alertData));
  }, []);

  return (
    <View style={styles.container}>
      <NoticeList data={noticeList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
