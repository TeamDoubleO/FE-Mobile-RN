import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { styles } from './styles/CircleTimer.styles';
import { colors } from '../../constants/colors';

const RADIUS = 50;
const STROKE_WIDTH = 5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ExpiryTimer = ({
  duration = 30, // 유효기간(초)
  onStatusChange, // 상태 변화 콜백
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [status, setStatus] = useState('valid'); // valid | expired
  const animated = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef();

  // 타이머 시작/재시작 함수
  const startTimer = () => {
    setTimeLeft(duration);
    setStatus('valid');
    animated.setValue(1);

    Animated.timing(animated, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();

    // 초 단위로 숫자 감소
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 만료 상태 콜백
  useEffect(() => {
    if (onStatusChange) onStatusChange(status);
  }, [status, onStatusChange]);

  // 마운트 시 타이머 시작, 언마운트 시 정리
  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [duration]);

  // 애니메이션 진행률 계산
  const strokeDashoffset = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, CIRCUMFERENCE],
  });

  return (
    <View style={styles.row}>
      <View style={styles.container}>
        <View style={styles.svgWrapper}>
          <Svg width={120} height={120}>
            {/* 배경 원 */}
            <Circle
              cx="60"
              cy="60"
              r={RADIUS}
              stroke={colors.moreLightGray}
              strokeWidth={STROKE_WIDTH}
              fill={'none'}
            />
            {/* 진행 게이지 */}
            <AnimatedCircle
              cx="60"
              cy="60"
              r={RADIUS}
              stroke={status === 'valid' ? colors.primary : colors.lightGreen}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="60,60"
            />
          </Svg>
          <View style={styles.centerText}>
            <Text style={[styles.timeText, status === 'expired' && { color: colors.lightGreen }]}>
              {status === 'valid' ? `${timeLeft}s` : '만료'}
            </Text>
          </View>
        </View>
      </View>
      {/* 갱신 버튼 */}
      <TouchableOpacity style={styles.refreshBtn} onPress={startTimer}>
        <Text style={styles.refreshText}>갱신</Text>
      </TouchableOpacity>
    </View>
  );
};

// Animated SVG Circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default ExpiryTimer;
