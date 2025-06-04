import axios from './AxiosInstance';

// 알림 목록 조회 함수
export const getNoticeList = async () => {
  const response = await axios.get('/passes/notifications');
  return response.data.data;
};
