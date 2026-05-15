import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const mascotImage = require('../pdf/스크린샷 2026-05-14 101409.png');

export const ui = {
  blue: '#7D9AF3',
  blueDark: '#315CA8',
  blueSoft: '#EAF1FF',
  border: '#7D9AF3',
  text: '#050505',
  muted: '#6E6E77',
  gray: '#B9BBC1',
  danger: '#D45A52',
  warning: '#D99A33',
  safe: '#48B362',
  homeDark: '#777A86',
};

export function PhoneStatus({ time = '2:30' }: { time?: string }) {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.statusTime}>{time}</Text>
      <View style={styles.statusIcons}>
        <FontAwesome name="signal" size={13} color="#111111" />
        <FontAwesome name="wifi" size={13} color="#111111" />
        <FontAwesome name="battery-three-quarters" size={15} color="#111111" />
      </View>
    </View>
  );
}

export function ScreenHeader({ title, time = '2:30' }: { title: string; time?: string }) {
  return (
    <View style={styles.header}>
      <PhoneStatus time={time} />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

export function Mascot({
  size = 78,
  style,
}: {
  size?: number;
  style?: object;
}) {
  return (
    <View style={[styles.mascotRoot, { width: size, height: size * 1.15 }, style]} pointerEvents="none">
      <Image source={mascotImage} style={styles.mascotImage} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: 58,
    paddingHorizontal: 30,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  statusTime: { color: '#050505', fontSize: 16, fontWeight: '900' },
  statusIcons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '900',
    paddingHorizontal: 30,
    paddingBottom: 18,
  },
  mascotRoot: { position: 'relative' },
  mascotImage: { width: '100%', height: '100%' },
});
