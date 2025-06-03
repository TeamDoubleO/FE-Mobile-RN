import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AlertListPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>2025. 05. 31</Text>
      <View style={styles.box}>
        <View style={styles.contentHeader}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.primary}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>보호자 출입 신청 승인</Text>
          </View>
          <Text style={styles.text}>15:30</Text>
        </View>
        <Text>손민지님, 2025-06-02일자 출입증(김철수 보호자)이 신청이 승인되었습니다.</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.contentHeader}>
          <View style={styles.titleContainer}>
            <Ionicons name="ban-sharp" size={20} color="darkred" style={styles.iconStyle} />
            <Text style={styles.text}>보호자 출입 신청 거절</Text>
          </View>
          <Text style={styles.text}>15:00</Text>
        </View>
        <Text>손민지님, 2025-06-01일자 출입증(김철수 보호자)이 신청이 거절되었습니다.</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.contentHeader}>
          <View style={styles.titleContainer}>
            <Ionicons name="paper-plane" size={20} color="black" style={styles.iconStyle} />
            <Text style={styles.text}>보호자 출입 신청</Text>
          </View>
          <Text style={styles.text}>14:40</Text>
        </View>
        <Text>손민지님, 2025-06-02일자 출입증(김철수 보호자)이 신청되었습니다.</Text>
      </View>
      <Text style={styles.dateText}>2025. 05. 30</Text>
      <View style={styles.box}>
        <View style={styles.contentHeader}>
          <View style={styles.titleContainer}>
            <Ionicons name="paper-plane" size={20} color="black" style={styles.iconStyle} />
            <Text style={styles.text}>보호자 출입 신청</Text>
          </View>
          <Text style={styles.text}>14:30</Text>
        </View>
        <Text>손민지님, 2025-06-01일자 출입증(김철수 보호자)이 신청되었습니다.</Text>
      </View>
    </View>
  );
}
// 김만두님, 2025-05-31 16:30에 신청하신 2025-06-01 16:30일자 출입증(김철수 보호자)이 신청되었습니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  dateText: {
    ...fonts.smallText,
    color: colors.white,
    padding: 10,
  },
  text: {
    ...fonts.smallText,
    color: colors.black,
  },
  box: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginEnd: 5,
  },
});
