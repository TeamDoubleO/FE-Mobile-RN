import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import NoticeList from '../components/notices/NoticeList';

const alertData = [
  {
    id: 1,
    type: 'APPROVE', // 승인
    date: '2025. 06. 04',
    time: '16:30',
    member: '김만두',
    message: '김만두님, 2025-06-05일자 출입증(김철수 보호자)이 신청이 승인되었습니다.',
  },
  {
    id: 2,
    type: 'REJECT', // 거절
    date: '2025. 06. 04',
    time: '15:20',
    member: '손민지',
    message: '손민지님, 2025-06-05일자 출입증(이영희 보호자)이 신청이 거절되었습니다.',
  },
  {
    id: 3,
    type: 'APPLY', // 신청
    date: '2025. 06. 04',
    time: '14:10',
    member: '김만두',
    message: '김만두님, 2025-06-06일자 출입증(박철수 보호자)이 신청되었습니다.',
  },
  {
    id: 4,
    type: 'APPROVE', // 승인
    date: '2025. 06. 03',
    time: '18:00',
    member: '박지은',
    message: '박지은님, 2025-06-04일자 출입증(김철수 보호자)이 신청이 승인되었습니다.',
  },
  {
    id: 5,
    type: 'APPLY', // 신청
    date: '2025. 06. 03',
    time: '17:10',
    member: '손민지',
    message: '손민지님, 2025-06-04일자 출입증(최민수 보호자)이 신청되었습니다.',
  },
];

export default function NoticeListPage() {
  return (
    <View style={styles.container}>
      <NoticeList data={alertData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
