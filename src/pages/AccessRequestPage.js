import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getHospitalList } from '../apis/AccessRequestApi';
import { useAuthStore } from '../stores/authStore';
import { useNormalAlertStore } from '../stores/alertStore';
import { styles } from './styles/AccessRequestPage.styles';
import NormalInput from '../components/textinputs/NormalInput';
import NormalList from '../components/lists/NormalList';

const AccessRequestPage = () => {
  const { setLoading } = useAuthStore();
  const [searchText, setSearchText] = useState('');
  const [hospitalName, setHospitalName] = useState([]);

  const showNormalAlert = useNormalAlertStore.getState().showNormalAlert;

  // 병원 목록 불러오기
  useEffect(() => {
    const getHospitalsName = async () => {
      setLoading(true);
      try {
        const data = await getHospitalList();
        setHospitalName(data);
      } catch (error) {
        showNormalAlert({
          title: '병원 목록 조회 실패',
          message: `병원 목록 조회 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.`,
          showCancel: false,
          confirmText: '확인',
        });
      } finally {
        setLoading(false);
      }
    };
    getHospitalsName();
  }, []);

  // 검색 결과 필터링
  const filteredHospitals = hospitalName.filter((hospital) =>
    hospital.hospitalName.includes(searchText),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>병원 선택</Text>
      <NormalInput
        placeholder="방문할 병원 이름을 입력하세요."
        value={searchText}
        onChangeTextHandler={setSearchText}
      />
      {filteredHospitals.length > 0 ? (
        <NormalList
          items={filteredHospitals}
          nextPage="AccessRequestRolePage"
          renderItem={(item, index, isSelected) => (
            <Text style={styles.itemText}>{item.hospitalName}</Text>
          )}
          navigationParams={(item) => ({
            hospitalId: item.hospitalId,
            hospitalName: item.hospitalName,
          })}
        />
      ) : (
        <Text style={styles.infoText}>검색 결과가 존재하지 않습니다.</Text>
      )}
    </View>
  );
};

export default AccessRequestPage;
