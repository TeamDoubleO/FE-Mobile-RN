import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { getAvailableDates } from '../apis/AccessRequestApi';
import { createAccessPass } from '../apis/AccessRequestApi';
import { useAuthStore } from '../stores/authStore';
import { useNormalAlertStore } from '../stores/alertStore';
import { styles } from './styles/AccessRequestRolePage.styles';
import NormalButton from '../components/buttons/NormalButton';
import NormalCheckbox from '../components/checkboxes/NormalCheckbox';
import PatientVerficationForm from '../components/accessRequests/PatientVerficationForm';
import GuardianVerificationForm from '../components/accessRequests/GuardianVerificationForm';

const AccessRequestRolePage = ({ route }) => {
  const { setLoading } = useAuthStore();
  const { hospitalId, hospitalName } = route.params;

  const [role, setRole] = useState('PATIENT');
  const [isVerified, setIsVerified] = useState(false); // 검증 여부
  const [verifiedData, setVerifiedData] = useState(null); // 자식 컴포넌트의 검증 정보
  const [checkedDate, setCheckedDate] = useState([]);
  const [availableDates, setAvailableDates] = useState([]); // 방문 가능 날짜 설정

  const navigation = useNavigation();
  const showNormalAlert = useNormalAlertStore.getState().showNormalAlert;

  // 방문 가능 날짜 불러오기
  useEffect(() => {
    // isVerified가 true일 때만 실행
    if (!isVerified) {
      setAvailableDates([]); // 검증 전엔 날짜 초기화
      return;
    }

    const fetchAvailableDates = async () => {
      setLoading(true);
      try {
        const dates = await getAvailableDates(hospitalId);
        setAvailableDates(dates);
      } catch (error) {
        console.error('방문 가능 날짜 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDates();
  }, [isVerified, hospitalId]);

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainPage' }],
    });
  };

  const handlePatientButton = () => {
    setIsVerified(false);
    setVerifiedData(null);
    setRole('PATIENT');
  };

  const handleGuardianButton = () => {
    setIsVerified(false);
    setVerifiedData(null);
    setRole('GUARDIAN');
  };

  const handleVerified = (data) => {
    setIsVerified(true);
    setVerifiedData(data);
  };

  const handleDateCheckbox = (newCheckedList) => {
    setCheckedDate(newCheckedList);
  };

  // 방문증 신청 버튼 클릭 핸들러
  const handleSubmitButton = () => {
    // 날짜 선택 안 하고, 신청 버튼 클릭 시 alert 출력
    if (!checkedDate.some(Boolean)) {
      showNormalAlert({
        title: '방문증 신청 불가',
        message: `방문 일시 선택 후\n방문증을 신청해주세요.`,
        showCancel: false,
      });
    } else {
      showNormalAlert({
        title: '방문증 신청',
        message: `입력하신 정보로\n방문증을 신청하시겠습니까?`,
        onConfirmHandler: handleConfirmChange,
      });
    }
  };

  // 방문증 신청 확인 버튼 클릭 핸들러
  const handleConfirmChange = async () => {
    try {
      setLoading(true);

      // checkedDate에서 true인 인덱스 찾기
      const selectedIdx = checkedDate.findIndex(Boolean);
      const selectedDate = selectedIdx >= 0 ? availableDates[selectedIdx] : null;

      // 폼 데이터 구성
      const form = {
        hospitalId,
        visitCategory: role,
        patientCode: verifiedData,
        checkedDate: selectedDate,
      };

      await createAccessPass(form);
      showNormalAlert({
        title: '방문증 신청 완료',
        message: `방문증 신청을 완료하였습니다.\n메인 페이지로 이동합니다.`,
        onConfirmHandler: navigateToHome,
      });
    } catch (error) {
      showNormalAlert({
        title: '방문증 신청 실패',
        message: '방문증 신청 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled" //입력 도중 입력창 외 다른 부분을 터치 했을 때 내려감
        extraScrollHeight={40} // 키보드와 입력창 사이 간격
        enableOnAndroid={true} // 안드로이드 자동 스크롤 설정
      >
        <Text style={styles.title}>{hospitalName}</Text>
        <View style={styles.divider} />
        <View style={styles.buttonContainer}>
          <NormalButton
            title="환자"
            length="short"
            onPressHandler={handlePatientButton}
            isDisabled={role === 'GUARDIAN'}
          />
          <NormalButton
            title="보호자"
            length="short"
            onPressHandler={handleGuardianButton}
            isDisabled={role === 'PATIENT'}
          />
        </View>

        {/* 환자 신청 정보 검증 컴포넌트 & 보호자 신청 정보 검증 컴포넌트 분리 */}
        <View style={styles.contentContainer}>
          {role === 'PATIENT' ? (
            <PatientVerficationForm hospitalId={hospitalId} onVerifiedHandler={handleVerified} />
          ) : (
            <GuardianVerificationForm hospitalId={hospitalId} onVerifiedHandler={handleVerified} />
          )}

          {/* 검증 성공 후에만 방문일시 + 신청 버튼 표시 */}
          {isVerified && (
            <>
              <Text style={styles.contentTitle}>방문 일시 선택</Text>
              <NormalCheckbox labels={availableDates} onChangeHandler={handleDateCheckbox} />
              <NormalButton
                title="방문증 신청"
                onPressHandler={handleSubmitButton}
                style={styles.submitButton}
              />
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default AccessRequestRolePage;
