import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 2,
    paddingTop: '5%',
    alignItems: 'flex-end',
    marginHorizontal: '3%',
  },
  text: {
    color: colors.darkGray,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
    alignSelf: 'center',
  },
});
