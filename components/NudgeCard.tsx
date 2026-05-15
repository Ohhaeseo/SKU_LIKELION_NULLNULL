import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';

type Props = {
  title?: string;
  message: string;
  reason: string;
  metric: string;
};

export default function NudgeCard({
  title = '길라미 AI 추천',
  message,
  reason,
  metric,
}: Props) {
  const colors = Colors.light;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <FontAwesome name="magic" size={18} color={colors.tint} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.message}>{message}</Text>
      <Text style={styles.reason}>{reason}</Text>

      <View style={styles.badge}>
        <FontAwesome name="arrow-down" size={12} color={colors.safe} />
        <Text style={styles.badgeText}>{metric}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    backgroundColor: '#EFF6FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#DBEAFE',
  },
  title: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '900',
  },
  message: {
    color: '#0B1220',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  reason: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#DBEAFE',
  },
  badgeText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
});
