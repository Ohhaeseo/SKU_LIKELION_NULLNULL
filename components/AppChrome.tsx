import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ui = {
  blue: '#6F8FF2',
  blueDark: '#244C9F',
  blueSoft: '#EEF4FF',
  border: '#86A2F7',
  text: '#0B1020',
  muted: '#6C7484',
  gray: '#B9BBC1',
  danger: '#D45A52',
  warning: '#D99A33',
  safe: '#35A853',
  homeDark: '#737987',
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
    borderBottomColor: '#E8EBF1',
  },
  headerTitle: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '900',
    paddingHorizontal: 30,
    paddingBottom: 18,
  },
});
