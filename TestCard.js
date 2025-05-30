import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardFlip from 'react-native-card-flip';

const CardFlipExample = () => {
  // CardFlip 컴포넌트의 ref를 생성
  const cardRef = useRef(null);

  return (
    <View style={styles.container}>
      {/* CardFlip에 ref 연결 */}
      <CardFlip
        style={styles.cardContainer}
        ref={cardRef}
        flipZoom={0.09} // 플립시 확대 효과 (선택)
        flipDirection="y" // y축(위아래) 플립, "x"로 하면 좌우 플립
      >
        {/* 앞면 카드 */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.card, styles.cardFront]}
          onPress={() => cardRef.current.flip()}
        >
          <Text style={styles.text}>앞면</Text>
        </TouchableOpacity>

        {/* 뒷면 카드 */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.card, styles.cardBack]}
          onPress={() => cardRef.current.flip()}
        >
          <Text style={styles.text}>뒷면</Text>
        </TouchableOpacity>
      </CardFlip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cardContainer: {
    width: 220,
    height: 320,
  },
  card: {
    width: 220,
    height: 320,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: '#fff',
  },
  cardFront: {
    backgroundColor: '#fff',
  },
  cardBack: {
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#444',
  },
});

export default CardFlipExample;
