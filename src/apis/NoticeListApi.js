import axios from './AxiosInstance';

// 알림 목록 조회 함수
export const getNoticeList = async () => {
  const response = await axios.get('/passes/notifications');
  return response.data.data;
};

// 알림 목록 전체 삭제 함수
export const deleteAllNotice = async () => {
  const response = await axios.delete('/passes/notifications');
  return response.status;
};
