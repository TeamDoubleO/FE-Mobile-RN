import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteUser, getMyInfo, logoutUser } from '../apis/MyPageApi';
import { useAuthStore } from '../stores/authStore';
import { useNormalAlertStore } from '../stores/alertStore';
import { styles } from './styles/MyPage.styles';
import WaveHeader from '../components/headers/WaveHeader';
import NormalInput from '../components/textinputs/NormalInput';
import GrayButton from '../components/buttons/GrayButton';

export default function MyPage() {
  const { accessToken, clearAccessToken } = useAuthStore();

  // 회원 정보 관리 상태변수
  const [userInfo, setUserInfo] = useState({
    name: '',
    birth: '',
    contact: '',
    email: '',
  });

  const navigation = useNavigation();
  const showNormalAlert = useNormalAlertStore.getState().showNormalAlert;

  useEffect(() => {
    // 회원 정보 불러오기
    const fetchUserInfo = async () => {
      try {
        if (!accessToken) {
          throw new Error('토큰이 존재하지 않습니다.');
        }
        const data = await getMyInfo();
        setUserInfo({
          name: data.name,
          birth: data.birthDate,
          contact: data.contact,
          email: data.email,
        });
      } catch (error) {
        console.log('내 정보 조회 실패:', error.response.data);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePasswordPage');
  };

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = () => {
    showNormalAlert({
      title: '로그아웃',
      message: '로그아웃 하시겠습니까?',
      showCancel: true,
      onConfirmHandler: handleLogoutConfirm,
    });
  };

  const handleLogoutConfirm = async () => {
    try {
      await logoutUser();
      showNormalAlert({
        title: '로그아웃 성공',
        message: '로그아웃이 완료되었습니다.\n시작 페이지로 이동합니다.',
        onConfirmHandler: () => {
          clearAccessToken();
        },
      });
    } catch (error) {
      showNormalAlert({
        title: '로그아웃 실패',
        message: '로그아웃 중 오류가 발생했습니다.',
        confirmText: '확인',
      });
      console.log('로그아웃 실패:', error);
    }
  };

  // 회원 탈퇴 버튼 클릭 핸들러
  const handleDeleteUser = () => {
    showNormalAlert({
      title: '회원 탈퇴',
      message: '탈퇴 하시겠습니까?',
      showCancel: true,
      onConfirmHandler: handleDeleteUserConfirm,
    });
  };

  const handleDeleteUserConfirm = async () => {
    try {
      await deleteUser();
      showNormalAlert({
        title: '회원 탈퇴 성공',
        message: '회원 탈퇴가 완료되었습니다.\n언제든 다시 찾아주세요:)',
        onConfirmHandler: async () => {
          clearAccessToken();
        },
      });
    } catch (error) {
      showNormalAlert({
        title: '회원 탈퇴 실패',
        message: '회원 탈퇴 중 오류가 발생했습니다.',
        confirmText: '확인',
      });
      console.log('회원 탈퇴 실패:', error);
    }
  };

  return (
    <View>
      <WaveHeader />
      <View style={styles.container}>
        <Text style={styles.title}>마이 페이지</Text>
        <NormalInput
          placeholder={`이름: ${userInfo.name}`}
          isEditable={false}
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalInput
          placeholder={`생년월일: ${userInfo.birth}`}
          isEditable={false}
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalInput
          placeholder={`전화번호: ${userInfo.contact}`}
          isEditable={false}
          inputWrpperWidth={{ width: '80%' }}
        />
        <NormalInput
          placeholder={`이메일: ${userInfo.email}`}
          isEditable={false}
          inputWrpperWidth={{ width: '80%' }}
        />
        <View style={styles.buttonContainer}>
          <GrayButton title="비밀번호 변경" onPressHandler={navigateToChangePassword} />
          <Text style={styles.buttonDivider}>|</Text>
          <GrayButton title="로그아웃" onPressHandler={handleLogout} />
          <Text style={styles.buttonDivider}>|</Text>
          <GrayButton title="회원 탈퇴" onPressHandler={handleDeleteUser} />
        </View>
      </View>
    </View>
  );
}
