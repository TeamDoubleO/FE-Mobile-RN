import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import NoticeItem from './NoticeItem';
import { styles } from './styles/NoticeList.styles';

export default function NoticeList({ data }) {
  // 날짜별로 그룹핑
  const grouped = data.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      {Object.keys(grouped).map((date) => (
        <View key={date}>
          <Text style={styles.dateText}>{date}</Text>
          {grouped[date].map((alert) => (
            <NoticeItem
              key={alert.id}
              type={alert.type}
              time={alert.time}
              message={alert.message}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
