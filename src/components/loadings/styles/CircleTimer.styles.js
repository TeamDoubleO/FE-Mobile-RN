import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  container: { alignItems: 'center', justifyContent: 'center' },
  svgWrapper: { justifyContent: 'center', alignItems: 'center' },
  centerText: { position: 'absolute', top: 18, left: 0, right: 0, alignItems: 'center' },
  timeText: { ...fonts.mediumText, fontWeight: 'bold', color: colors.primary },
  refreshBtn: {
    marginLeft: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  refreshText: {
    color: '#fff',
    fontWeight: 'bold',
    ...fonts.smallText,
  },
});
