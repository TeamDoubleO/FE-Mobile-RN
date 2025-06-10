import axios from './AxiosInstance';

// 알림 목록 조회 함수
export const getNoticeList = async () => {
  // const response = await axios.get('/passes/notifications');
  // return response.data.data;
  return [
    {
      title: '보호자 신청 승인',
      content: '손민지 님의 보호자 신청이 승인되었습니다.',
      createdAt: '2025-06-05T09:42:22.028443',
    },
    {
      title: '보호자 신청 승인',
      content: '손민지 님의 보호자 신청이 승인되었습니다.',
      createdAt: '2025-06-05T09:44:22.028443',
    },
  ];
};

// 최신 알림 1개 조회 함수
export const getMostRecentNotice = async () => {
  // try {
  //   const response = await axios.get('/passes/notifications/recent');
  //   return response.data.data;
  // } catch (e) {
  //   if (e.response?.status === 404) {
  //     return null;
  //   }
  //   throw e;
  // }

  return {
    title: '보호자 신청 승인',
    content: '손민지 님의 보호자 신청이 승인되었습니다.',
    createdAt: '2025-06-05T09:44:22.028443',
  };
};

// 알림 목록 전체 삭제 함수
export const deleteAllNotice = async () => {
  const response = await axios.delete('/passes/notifications');
  return response.status;
};
