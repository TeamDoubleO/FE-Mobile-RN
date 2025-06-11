import axios from './AxiosInstance';

// 출입증 목록 조회
export const getAccessList = async () => {
  // 종류별 출입 목 데이터
  // const response = {
  //   data: {
  //     success: true,
  //     status: 200,
  //     data: [
  //       {
  //         passId: 1406,
  //         memberId: 100031,
  //         hospitalId: 1,
  //         accessAreaNames: [
  //           'B관 3층 MRI실',
  //           'B관 3층 가족상담실',
  //           'A관(본관) 1층 재활치료실',
  //           'A관(본관) 3층 환자대기실',
  //         ],
  //         visitCategory: 'GUARDIAN',
  //         patientId: 41,
  //         patientName: '김정호',
  //         issuanceStatus: 'PENDING',
  //         startedAt: '2025-06-11T01:00:00',
  //         expiredAt: '2025-06-13T00:00:00',
  //       },
  //       {
  //         passId: 1407,
  //         memberId: 100031,
  //         hospitalId: 1,
  //         accessAreaNames: [
  //           'A관(본관) 2층 응급실',
  //           'C관(신관) 3층 주사실',
  //           'B관 1층 채혈실',
  //           'B관 3층 가족상담실',
  //         ],
  //         visitCategory: 'GUARDIAN',
  //         patientId: 36,
  //         patientName: '김정식',
  //         issuanceStatus: 'ISSUED',
  //         startedAt: '2025-06-11T02:00:00',
  //         expiredAt: '2025-06-15T00:00:00',
  //       },
  //       {
  //         passId: 1408,
  //         memberId: 100031,
  //         hospitalId: 1,
  //         accessAreaNames: [
  //           'A관(본관) 1층 피부과',
  //           'B관 2층 치료준비실',
  //           'B관 1층 채혈실',
  //           'A관(본관) 1층 수면센터',
  //         ],
  //         visitCategory: 'GUARDIAN',
  //         patientId: 113,
  //         patientName: '강민서',
  //         issuanceStatus: 'REJECTED',
  //         startedAt: '2025-06-11T03:00:00',
  //         expiredAt: '2025-06-14T00:00:00',
  //       },
  //       {
  //         passId: 1406,
  //         memberId: 100031,
  //         hospitalId: 1,
  //         accessAreaNames: [
  //           'B관 3층 MRI실',
  //           'B관 3층 가족상담실',
  //           'A관(본관) 1층 재활치료실',
  //           'A관(본관) 3층 환자대기실',
  //         ],
  //         visitCategory: 'GUARDIAN',
  //         patientId: 41,
  //         patientName: '김정호',
  //         issuanceStatus: 'PENDING',
  //         startedAt: '2025-06-12T04:00:00',
  //         expiredAt: '2025-06-13T00:00:00',
  //       },
  //       {
  //         passId: 1407,
  //         memberId: 100031,
  //         hospitalId: 1,
  //         accessAreaNames: [
  //           'A관(본관) 2층 응급실',
  //           'C관(신관) 3층 주사실',
  //           'B관 1층 채혈실',
  //           'B관 3층 가족상담실',
  //         ],
  //         visitCategory: 'GUARDIAN',
  //         patientId: 36,
  //         patientName: '김정식',
  //         issuanceStatus: 'ISSUED',
  //         startedAt: '2025-06-14T05:00:00',
  //         expiredAt: '2025-06-15T00:00:00',
  //       },
  //       {
  //         passId: 1408,
  //         memberId: 100031,
  //         hospitalId: 1,
  //         accessAreaNames: [
  //           'A관(본관) 1층 피부과',
  //           'B관 2층 치료준비실',
  //           'B관 1층 채혈실',
  //           'A관(본관) 1층 수면센터',
  //         ],
  //         visitCategory: 'GUARDIAN',
  //         patientId: 113,
  //         patientName: '강민서',
  //         issuanceStatus: 'REJECTED',
  //         startedAt: '2025-06-13T06:00:00',
  //         expiredAt: '2025-06-14T00:00:00',
  //       },
  //     ],
  //     timestamp: '2025-06-11T14:55:18.148578907',
  //   },
  // };
  const response = await axios.get('/passes');
  return response.data.data;
};
