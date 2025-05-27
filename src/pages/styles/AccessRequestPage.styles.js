import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '5%',
  },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '700',
    marginTop: '5%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.black,
  },
  infoText: {
    marginTop: '1%',
    fontSize: 18,
    textAlign: 'center',
    color: colors.darkGray,
    marginTop: '10%',
  },
});
