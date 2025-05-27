import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
  shadowWrapper: {
    // 그림자 설정
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7, // Android용
    borderRadius: 15,
    width: '70%',
    height: '90%', //TODO : 기존에는 80이었는데, 추후 카드 높이 변경 필요할듯함
    marginVertical: '10%',
  },
  cardContainer: {
    flex: 1, // 부모(shadowWrapper)의 크기를 꽉 채워 카드와 그림자 모양을 일치시킴
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // 배경 이미지가 카드 안에 잘리게
    position: 'relative', // 자식의 absolute 포지션 기준점
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // 전체 카드 덮게 만듦
    width: '125%',
    zIndex: 0, // 맨 뒤로
    opacity: 0.5,
  },
  cardText: {
    ...fonts.mediumTitle,
    color: colors.black,
    textAlign: 'center',
    marginBottom: '5%',
  },
  cardSubText: {
    ...fonts.mediumText,
    color: colors.darkGray,
    textAlign: 'center',
  },
  qrTitle: {
    ...fonts.mediumTitle,
    color: colors.black,
    marginBottom: '10%',
    zIndex: 1, // QR과 텍스트를 배경 위에
  },
  userName: {
    ...fonts.smallTitle,
    color: colors.black,
    marginVertical: '8%',
  },
  hospitalText: {
    ...fonts.mediumText,
    color: colors.darkGray,
    marginTop: '2%',
    marginBottom: '3%',
  },
  dateText: {
    ...fonts.smallText,
    color: colors.darkGray,
    marginTop: '2%',
  },
});
