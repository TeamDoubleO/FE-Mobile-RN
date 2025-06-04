import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  container: { alignItems: 'center', justifyContent: 'center' },
  svgWrapper: { justifyContent: 'center', alignItems: 'center' },
  centerText: { position: 'absolute', top: 40, left: 0, right: 0, alignItems: 'center' },
  timeText: { fontSize: 28, fontWeight: 'bold', color: colors.primary },
  refreshBtn: {
    marginLeft: 18,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  // refreshBtnExpired: {
  //   backgroundColor: colors.lightGreen,
  // },
  refreshText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
