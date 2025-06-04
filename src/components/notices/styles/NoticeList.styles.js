import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  dateText: {
    ...fonts.mediumText,
    color: colors.white,
    padding: 10,
  },
});
